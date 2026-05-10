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
