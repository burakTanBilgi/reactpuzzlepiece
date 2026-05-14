import { tierLabel } from './cascade-source.js';

// Inline badge that shows where a single property's value comes from in the
// cascade. Clicking it asks the inspector to expand that tier so the user can
// edit it directly.
//
// Props:
//   source   — { tier, pieceId?, kind? } from resolveEdgePropSource
//   current  — whether this property is currently "owned" by the active tier
//              (purely visual cue; same behaviour either way)
//   onJump   — (tier) => void; tells the inspector which tier to expand
export default function SourcePill({ source, current = false, onJump }) {
  if (!source || source.tier === 'none') return null;
  const label = tierLabel(source.tier, source.kind);
  return (
    <button
      type="button"
      className={`source-pill ${current ? 'source-pill--current' : ''}`}
      onClick={() => onJump?.(source.tier === 'layer' ? source.kind : source.tier)}
      title={`Edit at: ${label}`}
    >
      from {label}
    </button>
  );
}
