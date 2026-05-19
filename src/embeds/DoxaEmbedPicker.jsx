import { useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '../auth/supabaseClient.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import './DoxaEmbedPicker.css';

// Two-step modal for picking a Doxa view to embed.
//   Step 1 → list of the signed-in user's Doxa projects (id/title/updated)
//   Step 2 → list of charts in the picked project + a Comparison row
//            when `payload.compareSelection.length >= 2`.
// On pick, calls `onPick({ projectId, view })` and closes itself.
export default function DoxaEmbedPicker({ open, onClose, onPick }) {
  const { user } = useAuth();
  const [step, setStep]             = useState('projects'); // 'projects' | 'charts'
  const [projects, setProjects]     = useState([]);
  const [pickedProject, setPicked]  = useState(null);
  const [doc, setDoc]               = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  // Reset when the modal closes so reopening starts fresh.
  useEffect(() => {
    if (open) return;
    setStep('projects');
    setPicked(null);
    setDoc(null);
    setError(null);
  }, [open]);

  // Step 1: load the user's Doxa projects.
  useEffect(() => {
    if (!open || step !== 'projects' || !user || !supabaseConfigured) return;
    let cancelled = false;
    setLoading(true); setError(null);
    (async () => {
      const { data, error: err } = await supabase
        .from('doxa_charts')
        .select('id, title, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      if (cancelled) return;
      setLoading(false);
      if (err) { setError(err.message || 'Failed to load Doxa projects'); return; }
      setProjects(data || []);
    })();
    return () => { cancelled = true; };
  }, [open, step, user]);

  // Step 2: load the picked project's full payload.
  useEffect(() => {
    if (!open || step !== 'charts' || !pickedProject || !supabaseConfigured) return;
    let cancelled = false;
    setLoading(true); setError(null);
    (async () => {
      const { data, error: err } = await supabase
        .from('doxa_charts')
        .select('id, title, payload, updated_at')
        .eq('id', pickedProject.id)
        .maybeSingle();
      if (cancelled) return;
      setLoading(false);
      if (err) { setError(err.message || 'Failed to load project'); return; }
      setDoc(data);
    })();
    return () => { cancelled = true; };
  }, [open, step, pickedProject]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal modal--narrow doxa-picker">
        <div className="modal__head">
          <h2 className="modal__title">
            {step === 'projects' ? 'Pick a Doxa chart' : (pickedProject?.title || 'Pick a view')}
          </h2>
          <button type="button" className="modal__close" onClick={() => onClose?.()} aria-label="Close">×</button>
        </div>

        <div className="modal__body">
          {!supabaseConfigured && (
            <p className="hint">Doxa charts require Supabase to be configured.</p>
          )}
          {error && <p className="hint hint--warn">{error}</p>}
          {loading && <p className="hint">Loading…</p>}

          {!loading && step === 'projects' && supabaseConfigured && (
            <div className="doxa-picker__list">
              {projects.length === 0 && !error && (
                <p className="hint">No Doxa projects on this account yet.</p>
              )}
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="doxa-picker__row"
                  onClick={() => { setPicked(p); setStep('charts'); }}
                >
                  <span className="doxa-picker__row-title">{p.title || 'Untitled'}</span>
                  <span className="doxa-picker__row-meta">{formatTime(p.updated_at)}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && step === 'charts' && doc && (
            <ChartList
              doc={doc}
              onPick={(view) => {
                onPick?.({ projectId: doc.id, view });
                onClose?.();
              }}
            />
          )}
        </div>

        {step === 'charts' && (
          <div className="modal__foot">
            <button
              type="button"
              className="action-btn action-btn--ghost"
              onClick={() => { setStep('projects'); setPicked(null); setDoc(null); }}
            >
              ← Back to projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ChartList({ doc, onPick }) {
  const payload = doc.payload || {};
  const charts  = Array.isArray(payload.charts) ? payload.charts : [];
  const compare = Array.isArray(payload.compareSelection) ? payload.compareSelection : [];
  const hasComparison = compare.length >= 2;

  if (charts.length === 0) {
    return <p className="hint">This project has no charts yet.</p>;
  }

  return (
    <div className="doxa-picker__list">
      {charts.map((c) => (
        <button
          key={c.id}
          type="button"
          className="doxa-picker__row"
          onClick={() => onPick({ kind: 'chart', chartId: c.id })}
        >
          <span className="doxa-picker__row-title">{c.title || `Chart ${c.id}`}</span>
          <span className="doxa-picker__row-meta">
            {(Array.isArray(c.traits) ? c.traits.length : 0)} traits
          </span>
        </button>
      ))}
      {hasComparison && (
        <button
          type="button"
          className="doxa-picker__row doxa-picker__row--comparison"
          onClick={() => onPick({ kind: 'comparison', chartIds: [...compare] })}
        >
          <span className="doxa-picker__row-title">Comparison</span>
          <span className="doxa-picker__row-meta">{compare.length} charts overlaid</span>
        </button>
      )}
    </div>
  );
}

function formatTime(ts) {
  if (!ts) return '';
  try { return new Date(ts).toLocaleDateString(); }
  catch { return ''; }
}
