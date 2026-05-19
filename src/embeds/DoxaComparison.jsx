import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, CartesianGrid, XAxis, YAxis, Scatter,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
} from 'recharts';
import EmbedFrame from './EmbedFrame.jsx';

const PALETTE = ['#d68b54', '#5fb68f', '#a98ec4', '#6b9bd1', '#c87070', '#d4a056'];

// Comparison overlay for 2+ Doxa charts within one project. Radar
// layouts align every chart on the FIRST chart's subject order so the
// axes line up cleanly. Scatter (2 traits) renders one Scatter series
// per chart against shared X/Y axes.
export default function DoxaComparison({ title, charts }) {
  const first = charts?.[0];
  const firstTraits = Array.isArray(first?.traits) ? first.traits : [];

  if (firstTraits.length >= 3) {
    const data = firstTraits.map((t, i) => {
      const row = { subject: String(t.name ?? '') };
      charts.forEach((c, ci) => {
        row[`s${ci}`] = numberOr(c?.traits?.[i]?.value, 0);
      });
      return row;
    });
    return (
      <EmbedFrame title={`${title || 'Doxa'} — comparison`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="68%">
            <PolarGrid stroke="var(--stroke-idle, rgba(255,255,255,0.1))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <PolarRadiusAxis tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 8 }} />
            <Legend wrapperStyle={{ fontSize: 9, color: 'var(--text-dim, #aaa)' }} />
            {charts.map((c, ci) => (
              <Radar
                key={c.id ?? ci}
                name={c.title || `Chart ${ci + 1}`}
                dataKey={`s${ci}`}
                stroke={PALETTE[ci % PALETTE.length]}
                fill={PALETTE[ci % PALETTE.length]}
                fillOpacity={0.22}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </EmbedFrame>
    );
  }

  if (firstTraits.length === 2) {
    return (
      <EmbedFrame title={`${title || 'Doxa'} — comparison`}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 6, right: 8, bottom: 4, left: 0 }}>
            <CartesianGrid stroke="var(--stroke-idle, rgba(255,255,255,0.1))" />
            <XAxis type="number" name={firstTraits[0].name}
                   tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <YAxis type="number" name={firstTraits[1].name}
                   tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <RechartsTooltip cursor={{ stroke: 'var(--primary-2, #d68b54)' }} />
            <Legend wrapperStyle={{ fontSize: 9, color: 'var(--text-dim, #aaa)' }} />
            {charts.map((c, ci) => {
              const t = Array.isArray(c?.traits) ? c.traits : [];
              return (
                <Scatter
                  key={c.id ?? ci}
                  name={c.title || `Chart ${ci + 1}`}
                  data={[{ x: numberOr(t[0]?.value, 0), y: numberOr(t[1]?.value, 0) }]}
                  fill={PALETTE[ci % PALETTE.length]}
                />
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </EmbedFrame>
    );
  }

  return <EmbedFrame title={title || 'Doxa'} error="Inconsistent or missing traits" />;
}

function numberOr(v, fallback) {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}
