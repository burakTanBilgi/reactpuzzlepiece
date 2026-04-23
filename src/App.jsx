import { useMemo, useState } from 'react';
import PuzzleBoard from './PuzzleBoard.jsx';
import './App.css';

const SMALL_W = 200;
const SMALL_H = 200;
const BIG_W = 400;
const BIG_H = 400;

function buildPieces(cols, rows) {
  const clusterW = cols * SMALL_W;
  const clusterH = rows * SMALL_H;

  const pieces = [
    {
      id: 'big-tl',
      x: 0,
      y: 0,
      w: clusterW,
      h: BIG_H,
      label: 'Big TL',
      sides: {
        right: 'tab',
        bottom: { count: cols, type: 'tab' },
      },
    },
    {
      id: 'big-tr',
      x: clusterW,
      y: 0,
      w: BIG_W,
      h: BIG_H,
      label: 'Big TR',
      sides: {
        left: 'socket',
        bottom: 'tab',
      },
    },
    {
      id: 'big-br',
      x: clusterW,
      y: BIG_H,
      w: BIG_W,
      h: clusterH,
      label: 'Big BR',
      sides: {
        top: 'socket',
        left: { count: rows, type: 'socket' },
      },
    },
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sides = {
        top: 'socket',
        right: 'tab',
      };
      if (row < rows - 1) sides.bottom = 'tab';
      if (col > 0) sides.left = 'socket';

      pieces.push({
        id: `s-${row}-${col}`,
        x: col * SMALL_W,
        y: BIG_H + row * SMALL_H,
        w: SMALL_W,
        h: SMALL_H,
        label: `S${row}${col}`,
        sides,
      });
    }
  }

  return pieces;
}

export default function App() {
  const [cols, setCols] = useState(2);
  const [rows, setRows] = useState(2);

  const pieces = useMemo(() => buildPieces(cols, rows), [cols, rows]);

  return (
    <main className="stage">
      <h1 className="stage__title">Puzzle Piece Prototype</h1>

      <div className="stage__layout">
        <aside className="controls">
          <h2 className="controls__title">Controls</h2>

          <label className="controls__field">
            <span className="controls__label">Tabs on Big TL bottom</span>
            <div className="controls__row">
              <input
                type="range"
                min={1}
                max={5}
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
              />
              <output className="controls__value">{cols}</output>
            </div>
          </label>

          <label className="controls__field">
            <span className="controls__label">Sockets on Big BR left</span>
            <div className="controls__row">
              <input
                type="range"
                min={1}
                max={5}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
              />
              <output className="controls__value">{rows}</output>
            </div>
          </label>

          <p className="controls__hint">
            Sub-cluster auto-sizes to {cols}×{rows}. Tabs reflow to the center of each sub-piece.
          </p>
        </aside>

        <div className="board-wrap">
          <PuzzleBoard pieces={pieces} />
        </div>
      </div>
    </main>
  );
}
