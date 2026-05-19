import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, CartesianGrid, XAxis, YAxis, Scatter,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import EmbedFrame from './EmbedFrame.jsx';

// Single Doxa chart. Mirrors Doxa's chart-type rule:
//   * exactly 2 traits → scatter (one point at (t0, t1))
//   * 3+ traits        → radar
// Falls back to an error frame for anything else.
export default function DoxaSingleChart({ title, chart }) {
  const traits = Array.isArray(chart?.traits) ? chart.traits : [];

  if (traits.length >= 3) {
    const data = traits.map((t) => ({
      subject: String(t.name ?? ''),
      value: numberOr(t.value, 0),
    }));
    return (
      <EmbedFrame title={chart.title || title}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--stroke-idle, rgba(255,255,255,0.1))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <PolarRadiusAxis tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 8 }} />
            <Radar
              name={chart.title || 'Chart'}
              dataKey="value"
              stroke="var(--primary-2, #d68b54)"
              fill="var(--primary-2, #d68b54)"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </EmbedFrame>
    );
  }

  if (traits.length === 2) {
    const data = [{
      x: numberOr(traits[0].value, 0),
      y: numberOr(traits[1].value, 0),
    }];
    return (
      <EmbedFrame title={chart.title || title}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 6, right: 8, bottom: 4, left: 0 }}>
            <CartesianGrid stroke="var(--stroke-idle, rgba(255,255,255,0.1))" />
            <XAxis type="number" dataKey="x" name={traits[0].name}
                   tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <YAxis type="number" dataKey="y" name={traits[1].name}
                   tick={{ fill: 'var(--text-dim, #aaa)', fontSize: 9 }} />
            <RechartsTooltip cursor={{ stroke: 'var(--primary-2, #d68b54)' }} />
            <Scatter data={data} fill="var(--primary-2, #d68b54)" />
          </ScatterChart>
        </ResponsiveContainer>
      </EmbedFrame>
    );
  }

  return <EmbedFrame title={chart.title || title} error="Need at least 2 traits" />;
}

function numberOr(v, fallback) {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}
