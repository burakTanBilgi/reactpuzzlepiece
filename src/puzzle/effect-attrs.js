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
  if (!effects) return { className: '', style: undefined };
  const classes = [];
  const style = {};
  for (const entry of Object.values(effects)) {
    if (!entry || !entry.id || !entry.trigger) continue;
    classes.push(`${scopeClass}--anim-${entry.id}--${entry.trigger}`);
    const def = catalogue[entry.id];
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
  };
}

export function cellEffectAttrs(effects) {
  return computeAttrs(effects, CELL_EFFECTS, 'piece');
}

export function edgeEffectAttrs(effects) {
  return computeAttrs(effects, EDGE_EFFECTS, 'piece__edge');
}
