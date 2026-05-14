// Sticky horizontal cascade visualization at the top of the Inspector.
// Renders one pill per tier in priority order (left → right is *low → high*
// because we read the chain bottom-up: a `Default` floor first, then layered
// overrides, then per-piece, then per-edge — each pill to the right "wins"
// when set). The active selection's tier glows; clicking another pill asks
// the inspector to expand an inline editor for that tier.
//
// Props:
//   states      — output of computeTierStates({ default, inner, outer, piece, edge })
//   currentTier — 'default' | 'inner' | 'outer' | 'piece' | 'edge' — the tier
//                 the inspector currently has focus on (for the highlight)
//   onSelectTier(tier) — user clicked a pill; parent shows that tier's editor
export default function CascadeStrip({ states, currentTier, onSelectTier }) {
  const order = [
    { id: 'default', label: 'Default' },
    { id: 'inner',   label: 'Inner'   },
    { id: 'outer',   label: 'Outer'   },
    { id: 'piece',   label: 'Piece'   },
    { id: 'edge',    label: 'Edge'    },
  ];

  const visible = order.filter((t) => {
    // Always show default. Hide an inapplicable Inner/Outer/Piece/Edge pill
    // so the strip stays tight, but keep at least one of inner/outer for the
    // no-selection case (computeTierStates returns both applicable then).
    if (t.id === 'default') return true;
    return states?.[t.id]?.applicable;
  });

  return (
    <nav className="cascade-strip" aria-label="Override cascade">
      {visible.map((t, i) => {
        const st = states?.[t.id] || { applicable: false, hasOverride: false };
        const isCurrent = currentTier === t.id;
        const classes = [
          'cascade-strip__pill',
          st.applicable ? '' : 'cascade-strip__pill--na',
          st.hasOverride && st.applicable ? 'cascade-strip__pill--has' : '',
          isCurrent ? 'cascade-strip__pill--current' : '',
        ].filter(Boolean).join(' ');
        return (
          <span key={t.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <span className="cascade-strip__arrow" aria-hidden>›</span>}
            <button
              type="button"
              className={classes}
              disabled={!st.applicable}
              onClick={() => st.applicable && onSelectTier?.(t.id)}
              title={
                !st.applicable
                  ? `${t.label}: not applicable for this selection`
                  : st.hasOverride
                    ? `${t.label}: override set`
                    : `${t.label}: inheriting`
              }
            >
              <span className="cascade-strip__dot" aria-hidden />
              {t.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
}
