import { useMemo, useState } from 'react';
import PuzzleBoard from './PuzzleBoard.jsx';
import './App.css';

const BIG_W = 400;
const BIG_H = 400;
const KNOB_D = 60;

const maxKnobs = (edgeLength) => Math.max(1, Math.floor(edgeLength / KNOB_D));

function buildPieces({ cols, rows, hTabs, vTabs }) {
  const subW = BIG_W / cols;
  const subH = BIG_H / rows;

  const pieces = [
    {
      id: 'big-tl',
      x: 0,
      y: 0,
      w: BIG_W,
      h: BIG_H,
      label: 'Big TL',
      sides: {
        right: { count: hTabs, type: 'tab' },
        bottom: { count: cols, type: 'tab' },
      },
    },
    {
      id: 'big-tr',
      x: BIG_W,
      y: 0,
      w: BIG_W,
      h: BIG_H,
      label: 'Big TR',
      sides: {
        left: { count: hTabs, type: 'socket' },
        bottom: { count: vTabs, type: 'tab' },
      },
    },
    {
      id: 'big-br',
      x: BIG_W,
      y: BIG_H,
      w: BIG_W,
      h: BIG_H,
      label: 'Big BR',
      sides: {
        top: { count: vTabs, type: 'socket' },
        left: { count: rows, type: 'socket' },
      },
    },
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sides = { top: 'socket', right: 'tab' };
      if (row < rows - 1) sides.bottom = 'tab';
      if (col > 0) sides.left = 'socket';

      pieces.push({
        id: `s-${row}-${col}`,
        x: col * subW,
        y: BIG_H + row * subH,
        w: subW,
        h: subH,
        label: `S${row}${col}`,
        sides,
      });
    }
  }

  return pieces;
}

function getSideControls(selectedId, edges, setters) {
  const { cols, rows, hTabs, vTabs } = edges;
  const { setCols, setRows, setHTabs, setVTabs } = setters;

  if (selectedId === 'big-tl') {
    return [
      {
        key: 'right',
        label: 'Right — tabs (shared with Big TR)',
        value: hTabs,
        max: maxKnobs(BIG_H),
        onChange: setHTabs,
      },
      {
        key: 'bottom',
        label: 'Bottom — tabs (shared with sub-cluster)',
        value: cols,
        max: maxKnobs(BIG_W),
        onChange: setCols,
      },
    ];
  }
  if (selectedId === 'big-tr') {
    return [
      {
        key: 'left',
        label: 'Left — sockets (shared with Big TL)',
        value: hTabs,
        max: maxKnobs(BIG_H),
        onChange: setHTabs,
      },
      {
        key: 'bottom',
        label: 'Bottom — tabs (shared with Big BR)',
        value: vTabs,
        max: maxKnobs(BIG_W),
        onChange: setVTabs,
      },
    ];
  }
  if (selectedId === 'big-br') {
    return [
      {
        key: 'top',
        label: 'Top — sockets (shared with Big TR)',
        value: vTabs,
        max: maxKnobs(BIG_W),
        onChange: setVTabs,
      },
      {
        key: 'left',
        label: 'Left — sockets (shared with sub-cluster)',
        value: rows,
        max: maxKnobs(BIG_H),
        onChange: setRows,
      },
    ];
  }
  return [];
}

export default function App() {
  const [cols, setCols] = useState(2);
  const [rows, setRows] = useState(2);
  const [hTabs, setHTabs] = useState(1);
  const [vTabs, setVTabs] = useState(1);
  const [selectedId, setSelectedId] = useState('big-tl');

  const pieces = useMemo(
    () => buildPieces({ cols, rows, hTabs, vTabs }),
    [cols, rows, hTabs, vTabs]
  );

  const selected = pieces.find((p) => p.id === selectedId);

  const sideControls = getSideControls(
    selectedId,
    { cols, rows, hTabs, vTabs },
    { setCols, setRows, setHTabs, setVTabs }
  );

  const isSubSelected = selectedId?.startsWith('s-');

  return (
    <main className="stage">
      <h1 className="stage__title">Puzzle Piece Prototype</h1>

      <div className="stage__layout">
        <aside className="controls">
          <h2 className="controls__title">Selected Piece</h2>

          {selected ? (
            <div className="controls__selected">
              <span className="controls__selected-label">{selected.label}</span>
              <span className="controls__selected-meta">
                {Math.round(selected.w)} × {Math.round(selected.h)}
              </span>
            </div>
          ) : (
            <p className="controls__hint">Click a piece to select it.</p>
          )}

          {sideControls.map((ctrl) => (
            <label key={ctrl.key} className="controls__field">
              <span className="controls__label">{ctrl.label}</span>
              <div className="controls__row">
                <input
                  type="range"
                  min={1}
                  max={ctrl.max}
                  value={ctrl.value}
                  onChange={(e) => ctrl.onChange(Number(e.target.value))}
                />
                <output className="controls__value">{ctrl.value}</output>
              </div>
            </label>
          ))}

          {isSubSelected && (
            <p className="controls__hint">
              Sub-pieces are shaped by the big pieces' tab counts. Select a big piece to adjust its
              sides.
            </p>
          )}

          <hr className="controls__divider" />
          <p className="controls__hint">
            Big pieces stay {BIG_W} × {BIG_H}. Adding tabs re-spaces them within the same edge length
            — the sub-pieces below shrink to match.
          </p>
        </aside>

        <div className="board-wrap">
          <PuzzleBoard pieces={pieces} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </main>
  );
}
