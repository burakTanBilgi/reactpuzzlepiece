// Public API for the puzzle module.
// Everything consumers need can be imported from `./puzzle`.

export { default as PuzzleBoard } from './PuzzleBoard.jsx';
export { default as PuzzlePiece } from './PuzzlePiece.jsx';

export { usePuzzleBoard } from './usePuzzleBoard.js';

export {
  computePiecePath,
  computePieceBbox,
  evenlySpaced,
  normalizeSide,
  KNOB_R,
  KNOB_D,
  FLAT,
  TAB,
  SOCKET,
} from './geometry.js';

export {
  BIG,
  MIN_DIM,
  EPS,
  SIDES,
  OPPOSITE,
  oppositeType,
  makeId,
  initialFourPieces,
  sideFor,
  findNeighbors,
  coversNeighbors,
  edgesMatch,
  piecesInRegion,
  maxKnobsForSide,
  resolveType,
  splitNeighborsOnSide,
  updatePiece,
  setPieceSide,
  changeSide,
} from './board.js';
