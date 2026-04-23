import { useMemo, useState } from 'react';
import PuzzleBoard from './PuzzleBoard.jsx';
import './App.css';

const BIG = 400;
const KNOB_D = 60;

const maxKnobs = (edgeLength) => Math.max(1, Math.floor(edgeLength / KNOB_D));

function buildPieces({ cols, rows, hTabs, vTabs }) {
  const pieces = [];

  pieces.push({
    id: 'tl',
    x: 0,
    y: 0,
    w: BIG,
    h: BIG,
    label: 'TL',
    sides: {
      right: { count: hTabs, type: 'tab' },
      bottom: { count: cols, type: 'tab' },
    },
  });

  const trH = BIG / hTabs;
  for (let i = 0; i < hTabs; i++) {
    const sides = { left: 'socket' };
    if (i > 0) sides.top = 'socket';
    if (i === hTabs - 1) {
      sides.bottom = { count: vTabs, type: 'tab' };
    } else {
      sides.bottom = 'tab';
    }
    pieces.push({
      id: `tr-${i}`,
      x: BIG,
      y: i * trH,
      w: BIG,
      h: trH,
      label: `T${i}`,
      sides,
    });
  }

  const brW = BIG / vTabs;
  const brH = BIG / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < vTabs; c++) {
      const parity = (r + c) % 2;
      const sides = {};
      sides.top = r === 0 ? 'socket' : parity === 1 ? 'tab' : 'socket';
      sides.left = c === 0 ? 'socket' : parity === 1 ? 'socket' : 'tab';
      if (c < vTabs - 1) sides.right = parity === 0 ? 'tab' : 'socket';
      if (r < rows - 1) sides.bottom = parity === 0 ? 'socket' : 'tab';

      pieces.push({
        id: `br-${r}-${c}`,
        x: BIG + c * brW,
        y: BIG + r * brH,
        w: brW,
        h: brH,
        label: `R${r}${c}`,
        sides,
      });
    }
  }

  const blW = BIG / cols;
  const blH = BIG / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sides = { top: 'socket', right: 'tab' };
      if (r < rows - 1) sides.bottom = 'tab';
      if (c > 0) sides.left = 'socket';

      pieces.push({
        id: `bl-${r}-${c}`,
        x: c * blW,
        y: BIG + r * blH,
        w: blW,
        h: blH,
        label: `L${r}${c}`,
        sides,
      });
    }
  }

  return pieces;
}

function regionOf(id) {
  if (id === 'tl') return 'tl';
  if (id?.startsWith('tr-')) return 'tr';
  if (id?.startsWith('br-')) return 'br';
  if (id?.startsWith('bl-')) return 'bl';
  return null;
}

const REGION_LABEL = {
  tl: 'Top-Left region',
  tr: 'Top-Right region',
  br: 'Bottom-Right region',
  bl: 'Bottom-Left region',
};

function getSideControls(region, edges, setters) {
  const { cols, rows, hTabs, vTabs } = edges;
  const { setCols, setRows, setHTabs, setVTabs } = setters;

  if (region === 'tl') {
    return [
      { key: 'right', label: 'Right — tabs (→ TR splits)', value: hTabs, max: maxKnobs(BIG), onChange: setHTabs },
      { key: 'bottom', label: 'Bottom — tabs (→ BL splits)', value: cols, max: maxKnobs(BIG), onChange: setCols },
    ];
  }
  if (region === 'tr') {
    return [
      { key: 'left', label: 'Left — sockets from TL (TR splits)', value: hTabs, max: maxKnobs(BIG), onChange: setHTabs },
      { key: 'bottom', label: 'Bottom — tabs (→ BR splits)', value: vTabs, max: maxKnobs(BIG), onChange: setVTabs },
    ];
  }
  if (region === 'br') {
    return [
      { key: 'top', label: 'Top — sockets from TR (BR cols)', value: vTabs, max: maxKnobs(BIG), onChange: setVTabs },
      { key: 'left', label: 'Left — sockets from BL (BR rows)', value: rows, max: maxKnobs(BIG), onChange: setRows },
    ];
  }
  if (region === 'bl') {
    return [
      { key: 'top', label: 'Top — sockets from TL (BL cols)', value: cols, max: maxKnobs(BIG), onChange: setCols },
      { key: 'right', label: 'Right — tabs (→ BR rows)', value: rows, max: maxKnobs(BIG), onChange: setRows },
    ];
  }
  return [];
}

export default function App() {
  const [cols, setCols] = useState(2);
  const [rows, setRows] = useState(2);
  const [hTabs, setHTabs] = useState(1);
  const [vTabs, setVTabs] = useState(1);
  const [selectedId, setSelectedId] = useState('tl');

  const pieces = useMemo(
    () => buildPieces({ cols, rows, hTabs, vTabs }),
    [cols, rows, hTabs, vTabs]
  );

  const selected = pieces.find((p) => p.id === selectedId);
  const region = regionOf(selectedId);

  const sideControls = getSideControls(
    region,
    { cols, rows, hTabs, vTabs },
    { setCols, setRows, setHTabs, setVTabs }
  );

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

          {region && <div className="controls__region">{REGION_LABEL[region]}</div>}

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

          <hr className="controls__divider" />
          <p className="controls__hint">
            Adding a tab to a side splits the receiving neighbor into that many sub-pieces.
            Each region stays {BIG} × {BIG}; sub-pieces shrink to fit.
          </p>
        </aside>

        <div className="board-wrap">
          <PuzzleBoard pieces={pieces} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </main>
  );
}
