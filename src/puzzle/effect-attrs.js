// Shared helper: turn an effects map (e.g. piece.cellEffects or seg.style.effects)
// into the className + style attrs the renderer needs:
//
//   className — one space-separated `<scope>--anim-<id>--<trigger>` per entry
//   style     — CSS custom properties from each entry's config bag
//
// Used by both `PuzzlePiece` (live studio) and `export.js` (single-file
// JSX export) so the deployed puzzle gets identical classes + vars.
import { CELL_EFFECTS, EDGE_EFFECTS } from './effects-catalog.js';

function computeAttrs(effects, catalogue, scopeClass) {
  if (!effects) return { className: '', style: undefined, hasEdgeScope: false };
  const classes = [];
  const style = {};
  let hasEdgeScope = false;
  for (const entry of Object.values(effects)) {
    if (!entry || !entry.id || !entry.trigger) continue;
    const def = catalogue[entry.id];
    // Edges grow a `--{trigger}-on-{scope}` suffix; cells stay scope-free.
    // Legacy entries without `scope` are treated as 'piece' (current default).
    const scope = def?.scopes ? (entry.scope ?? def.defaultScope ?? 'piece') : null;
    if (scope === 'edge') hasEdgeScope = true;
    const triggerSuffix = scope ? `${entry.trigger}-on-${scope}` : entry.trigger;
    classes.push(`${scopeClass}--anim-${entry.id}--${triggerSuffix}`);
    if (!def) continue;
    for (const [field, schema] of Object.entries(def.config || {})) {
      if (!schema?.cssVar) continue;
      const raw = entry.config?.[field] ?? schema.default;
      style[schema.cssVar] = `${raw}${schema.unit || ''}`;
    }
  }
  return {
    className: classes.join(' '),
    style: Object.keys(style).length ? style : undefined,
    hasEdgeScope,
  };
}

export function cellEffectAttrs(effects) {
  return computeAttrs(effects, CELL_EFFECTS, 'piece');
}

export function edgeEffectAttrs(effects) {
  return computeAttrs(effects, EDGE_EFFECTS, 'piece__edge');
}
