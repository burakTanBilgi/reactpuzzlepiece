import { useMemo } from 'react';
import { compileProject } from '../../../grid/compile.js';
import { PuzzleBoard } from '../../../puzzle';

// Tiny Hakoniwa project rendered as the brand mark on every page header —
// 1×2 cells joined by the wave effect, content "箱" + "庭". Proves that the
// studio is built with its own output.
//
// Sized via CSS (`.wave-brand-mark .puzzle-board`); the SVG itself uses
// preserveAspectRatio so it scales cleanly inside any sidebar or hero.
const META_PROJECT = {
  grid: {
    rows: 1, cols: 2, cellSize: 100,
    groups: [['meta-hako', 'meta-niwa']],
  },
  edges: {
    default: { effect: 'wave', config: { frequency: 0.04, amplitude: 14 } },
    inner: null, outer: null, byPiece: {}, byEdge: {},
  },
  pieceColors: {},
  pieceContent: {
    'meta-hako': { type: 'text', text: '箱', fontSize: 56 },
    'meta-niwa': { type: 'text', text: '庭', fontSize: 56 },
  },
  backgrounds: [],
};

export default function WaveBrandMark({ size = 'md' }) {
  const pieces = useMemo(() => compileProject(META_PROJECT), []);
  return (
    <div
      className={`wave-brand-mark wave-brand-mark--${size}`}
      aria-hidden="true"
    >
      <PuzzleBoard
        pieces={pieces}
        effect="wave"
        effectConfig={META_PROJECT.edges.default.config}
      />
    </div>
  );
}
