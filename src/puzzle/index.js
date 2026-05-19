// Public API for the puzzle rendering module.
// State + project management lives in `src/grid/`.

export { default as PuzzleBoard } from './PuzzleBoard.jsx';
export { default as PuzzlePiece } from './PuzzlePiece.jsx';

export {
  computePiecePath,
  computeSidePath,
  computeSideSegments,
  computePieceBbox,
  computeKnobs,
  computeActiveKnobs,
  knobHitCenter,
  evenlySpaced,
  normalizeSide,
  buildSidePath,
  KNOB_R,
  KNOB_D,
  FLAT,
  TAB,
  SOCKET,
  EFFECTS,
  EFFECT_NAMES,
} from './geometry.js';

// Interaction-effect catalogue + render helpers. Lives inside the puzzle
// module so the rendering pipeline stays self-contained / portable.
export {
  CELL_EFFECTS, EDGE_EFFECTS,
  CELL_EFFECT_IDS, EDGE_EFFECT_IDS,
  TRIGGERS, TRIGGER_LABELS,
  EDGE_SCOPE_LABELS,
  makeEffectEntry, effectKey,
} from './effects-catalog.js';

export { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';

export { EmbedContext } from './EmbedContext.js';
