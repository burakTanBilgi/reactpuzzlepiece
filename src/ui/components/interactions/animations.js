// Catalogue of per-piece (cell) and per-edge interaction effects.
// Single source of truth — both the side-panel chips and the rendered
// CSS classes index into these lists. Adding an effect = one entry here
// + one CSS rule in puzzle/PuzzleBoard.css (under the same id).

export const CELL_ANIMATIONS = [
  { id: 'none',       label: 'None',       hint: 'No effect.' },
  { id: 'lift',       label: 'Lift',       hint: 'Floats up on hover.' },
  { id: 'scale-up',   label: 'Scale up',   hint: 'Grows on hover.' },
  { id: 'scale-down', label: 'Scale down', hint: 'Shrinks on hover.' },
  { id: 'glow',       label: 'Glow',       hint: 'Soft amber halo on hover.' },
  { id: 'pulse',      label: 'Pulse',      hint: 'Slow ambient breathing (always on).' },
];

export const EDGE_ANIMATIONS = [
  { id: 'none',     label: 'None',     hint: 'No effect.' },
  { id: 'glow',     label: 'Glow',     hint: 'Stroke glows when piece is hovered.' },
  { id: 'wiggle',   label: 'Wiggle',   hint: 'Tiny shake when piece is hovered.' },
  { id: 'thicken',  label: 'Thicken',  hint: 'Stroke widens when piece is hovered.' },
  { id: 'flash',    label: 'Flash',    hint: 'Amber pulse when piece is hovered.' },
];

// Stable order of cell ids — used when iterating chip rows.
export const CELL_ANIMATION_IDS = CELL_ANIMATIONS.map((a) => a.id);
export const EDGE_ANIMATION_IDS = EDGE_ANIMATIONS.map((a) => a.id);
