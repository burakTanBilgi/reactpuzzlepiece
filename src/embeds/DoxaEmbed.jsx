import { useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '../auth/supabaseClient.js';
import EmbedFrame from './EmbedFrame.jsx';
import DoxaSingleChart from './DoxaSingleChart.jsx';
import DoxaComparison from './DoxaComparison.jsx';

// Top-level Doxa embed dispatcher. Does exactly one fetch per
// projectId + subscribes to Supabase Realtime so charts update live
// when Doxa pushes changes — no polling. The `view.kind` switch is
// the extensibility hinge: new "kinds" (e.g. a grid of every chart)
// slot in as additional cases without touching the rest of the
// pipeline.
export default function DoxaEmbed({ content }) {
  const { projectId, view } = content || {};
  const [doc, setDoc]     = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabaseConfigured || !projectId) return;
    let cancelled = false;
    setDoc(null);
    setError(null);

    (async () => {
      const { data, error: err } = await supabase
        .from('doxa_charts')
        .select('id, title, payload, updated_at')
        .eq('id', projectId)
        .maybeSingle();
      if (cancelled) return;
      if (err) { setError(err.message || 'Failed to load'); return; }
      if (!data) { setError('Chart project not found'); return; }
      setDoc(data);
    })();

    // Live updates: any UPDATE on the same row pushes a partial payload
    // through the postgres_changes channel. We merge it into the local
    // doc so the chart re-renders without a refetch.
    const channel = supabase
      .channel(`doxa-embed-${projectId}`)
      .on(
        'postgres_changes',
        {
          event:  'UPDATE',
          schema: 'public',
          table:  'doxa_charts',
          filter: `id=eq.${projectId}`,
        },
        (payload) => {
          if (cancelled) return;
          setDoc((prev) => (prev ? { ...prev, ...payload.new } : payload.new));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      try { supabase.removeChannel(channel); } catch { /* ignore */ }
    };
  }, [projectId]);

  if (!supabaseConfigured) return <EmbedFrame title="Doxa" error="Sign-in required" />;
  if (error)             return <EmbedFrame title="Doxa" error={error} />;
  if (!doc)              return <EmbedFrame title="Doxa" busy />;

  const payload = doc.payload || {};
  const charts  = Array.isArray(payload.charts) ? payload.charts : [];
  const title   = doc.title || payload.title || 'Doxa';

  if (view?.kind === 'chart') {
    const chart = charts.find((c) => c.id === view.chartId);
    if (!chart) return <EmbedFrame title={title} error="Chart not found" />;
    return <DoxaSingleChart title={title} chart={chart} />;
  }

  if (view?.kind === 'comparison') {
    const ids = Array.isArray(view.chartIds) ? view.chartIds : [];
    const selected = charts.filter((c) => ids.includes(c.id));
    if (selected.length < 2) {
      return <EmbedFrame title={title} error="Need at least 2 charts to compare" />;
    }
    return <DoxaComparison title={title} charts={selected} />;
  }

  return <EmbedFrame title={title} error={`Unknown view "${view?.kind || ''}"`} />;
}
