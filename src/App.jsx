import { useMemo, useState } from 'react';
import PuzzleBoard from './PuzzleBoard.jsx';
import './App.css';
import BigLogo from '/BigLogo.svg';
import SmallLogo from '/SmallLogo.svg';

const BIG = 400;
const KNOB_D = 60;
const MIN_DIM = 80;
const EPS = 0.01;

const SIDES = ['top', 'right', 'bottom', 'left'];
const OPPOSITE = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

const oppositeType = (t) => (t === 'tab' ? 'socket' : t === 'socket' ? 'tab' : 'flat');

let _idCounter = 0;
const makeId = (prefix) => `${prefix}-${_idCounter++}`;

function initialPieces() {
  return [
    {
      id: 'tl',
      x: 0, y: 0, w: BIG, h: BIG,
      label: 'TL',
      sides: {
        right: { count: 1, type: 'tab' },
        bottom: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'tr',
      x: BIG, y: 0, w: BIG, h: BIG,
      label: 'TR',
      sides: {
        left: { count: 1, type: 'socket' },
        bottom: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'bl',
      x: 0, y: BIG, w: BIG, h: BIG,
      label: 'BL',
      sides: {
        top: { count: 1, type: 'socket' },
        right: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'br',
      x: BIG, y: BIG, w: BIG, h: BIG,
      label: 'BR',
      sides: {
        top: { count: 1, type: 'socket' },
        left: { count: 1, type: 'socket' },
      },
    },
  ];
}

function findNeighbors(pieces, piece, side) {
  const pid = piece.id;
  if (side === 'right') {
    const x = piece.x + piece.w;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.x - x) < EPS &&
        p.y < piece.y + piece.h - EPS &&
        p.y + p.h > piece.y + EPS
    );
  }
  if (side === 'left') {
    const x = piece.x;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.x + p.w - x) < EPS &&
        p.y < piece.y + piece.h - EPS &&
        p.y + p.h > piece.y + EPS
    );
  }
  if (side === 'bottom') {
    const y = piece.y + piece.h;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.y - y) < EPS &&
        p.x < piece.x + piece.w - EPS &&
        p.x + p.w > piece.x + EPS
    );
  }
  if (side === 'top') {
    const y = piece.y;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.y + p.h - y) < EPS &&
        p.x < piece.x + piece.w - EPS &&
        p.x + p.w > piece.x + EPS
    );
  }
  return [];
}

function sideFor(piece, side) {
  return piece?.sides?.[side] ?? { count: 0, type: 'flat' };
}

function resolveType(piece, side, neighbors, newCount) {
  const current = sideFor(piece, side);
  if (newCount === 0) return 'flat';
  if (current.type !== 'flat') return current.type;
  if (neighbors.length > 0) {
    const nb = neighbors[0];
    const nbSide = sideFor(nb, OPPOSITE[side]);
    if (nbSide.type !== 'flat') return oppositeType(nbSide.type);
  }
  return 'tab';
}

function maxKnobsForSide(piece, side) {
  const edge = side === 'left' || side === 'right' ? piece.h : piece.w;
  return Math.max(1, Math.floor(edge / KNOB_D));
}

function coversNeighbors(piece, side, neighbors) {
  if (neighbors.length === 0) return true;
  if (side === 'left' || side === 'right') {
    const nMin = Math.min(...neighbors.map((n) => n.y));
    const nMax = Math.max(...neighbors.map((n) => n.y + n.h));
    return piece.y <= nMin + EPS && piece.y + piece.h >= nMax - EPS;
  }
  const nMin = Math.min(...neighbors.map((n) => n.x));
  const nMax = Math.max(...neighbors.map((n) => n.x + n.w));
  return piece.x <= nMin + EPS && piece.x + piece.w >= nMax - EPS;
}

function edgesMatch(piece, neighbor, side) {
  if (side === 'left' || side === 'right') {
    return Math.abs(piece.y - neighbor.y) < EPS && Math.abs(piece.h - neighbor.h) < EPS;
  }
  return Math.abs(piece.x - neighbor.x) < EPS && Math.abs(piece.w - neighbor.w) < EPS;
}

function piecesInRegion(pieces, region, excludeId) {
  const { xMin, yMin, xMax, yMax } = region;
  return pieces.filter(
    (p) =>
      p.id !== excludeId &&
      p.x >= xMin - EPS &&
      p.y >= yMin - EPS &&
      p.x + p.w <= xMax + EPS &&
      p.y + p.h <= yMax + EPS
  );
}

function splitNeighborsOnSide(pieces, pieceId, side, newCount, knobType) {
  const piece = pieces.find((p) => p.id === pieceId);
  if (!piece) return pieces;
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return pieces;

  const xMin = Math.min(...neighbors.map((n) => n.x));
  const xMax = Math.max(...neighbors.map((n) => n.x + n.w));
  const yMin = Math.min(...neighbors.map((n) => n.y));
  const yMax = Math.max(...neighbors.map((n) => n.y + n.h));

  const region = { xMin, yMin, xMax, yMax };
  const toRemove = piecesInRegion(pieces, region, pieceId);

  const topN = neighbors.find((n) => Math.abs(n.y - yMin) < EPS);
  const bottomN = neighbors.find((n) => Math.abs(n.y + n.h - yMax) < EPS);
  const leftN = neighbors.find((n) => Math.abs(n.x - xMin) < EPS);
  const rightN = neighbors.find((n) => Math.abs(n.x + n.w - xMax) < EPS);

  const mateSide = OPPOSITE[side];
  const oppType = oppositeType(knobType);

  const baseLabel = topN?.label || bottomN?.label || leftN?.label || rightN?.label || 'S';

  let rest = pieces.filter((p) => !toRemove.some((n) => n.id === p.id));
  const subs = [];

  const isVerticalSplit = side === 'right' || side === 'left';

  const farSide = side;
  const farN = isVerticalSplit
    ? side === 'right'
      ? rightN
      : leftN
    : side === 'bottom'
      ? bottomN
      : topN;
  const farOrig = sideFor(farN, farSide);
  const farHasKnobs = farOrig.type !== 'flat' && farOrig.count > 0;

  if (isVerticalSplit) {
    const h = (yMax - yMin) / newCount;
    const w = xMax - xMin;
    if (h < MIN_DIM) return pieces;

    for (let i = 0; i < newCount; i++) {
      const sides = {
        [mateSide]: { count: 1, type: oppType },
      };
      if (i === 0) {
        const topSide = sideFor(topN, 'top');
        if (topSide.type !== 'flat') sides.top = topSide;
      } else {
        sides.top = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const botSide = sideFor(bottomN, 'bottom');
        if (botSide.type !== 'flat') sides.bottom = botSide;
      } else {
        sides.bottom = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrig.type };
      }

      subs.push({
        id: makeId('p'),
        x: xMin,
        y: yMin + i * h,
        w,
        h,
        label: newCount === 1 ? baseLabel : `${baseLabel}${i}`,
        sides,
      });
    }
  } else {
    const w = (xMax - xMin) / newCount;
    const h = yMax - yMin;
    if (w < MIN_DIM) return pieces;

    for (let i = 0; i < newCount; i++) {
      const sides = {
        [mateSide]: { count: 1, type: oppType },
      };
      if (i === 0) {
        const leftSide = sideFor(leftN, 'left');
        if (leftSide.type !== 'flat') sides.left = leftSide;
      } else {
        sides.left = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const rightSide = sideFor(rightN, 'right');
        if (rightSide.type !== 'flat') sides.right = rightSide;
      } else {
        sides.right = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrig.type };
      }

      subs.push({
        id: makeId('p'),
        x: xMin + i * w,
        y: yMin,
        w,
        h,
        label: newCount === 1 ? baseLabel : `${baseLabel}${i}`,
        sides,
      });
    }
  }

  // Propagate far-side knob count to the "far-far" piece if it's a single piece
  // whose near-edge matches the split region's far edge exactly.
  if (farHasKnobs) {
    let farFarPiece = null;
    let nearSideOnFarFar = null;

    if (isVerticalSplit) {
      nearSideOnFarFar = OPPOSITE[farSide];
      if (side === 'right') {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.x - xMax) < EPS &&
            Math.abs(p.y - yMin) < EPS &&
            Math.abs(p.y + p.h - yMax) < EPS
        );
      } else {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.x + p.w - xMin) < EPS &&
            Math.abs(p.y - yMin) < EPS &&
            Math.abs(p.y + p.h - yMax) < EPS
        );
      }
    } else {
      nearSideOnFarFar = OPPOSITE[farSide];
      if (side === 'bottom') {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.y - yMax) < EPS &&
            Math.abs(p.x - xMin) < EPS &&
            Math.abs(p.x + p.w - xMax) < EPS
        );
      } else {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.y + p.h - yMin) < EPS &&
            Math.abs(p.x - xMin) < EPS &&
            Math.abs(p.x + p.w - xMax) < EPS
        );
      }
    }

    if (farFarPiece) {
      rest = rest.map((p) =>
        p.id === farFarPiece.id
          ? {
              ...p,
              sides: {
                ...p.sides,
                [nearSideOnFarFar]: {
                  count: newCount,
                  type: oppositeType(farOrig.type),
                },
              },
            }
          : p
      );
    }
  }

  return [...rest, ...subs];
}

function updatePiece(pieces, pieceId, updater) {
  return pieces.map((p) => (p.id === pieceId ? updater(p) : p));
}

function setPieceSide(piece, side, newSide) {
  return { ...piece, sides: { ...piece.sides, [side]: newSide } };
}

export default function App() {
  const [pieces, setPieces] = useState(() => initialPieces());
  const [cascade, setCascade] = useState(true);
  const [selectedId, setSelectedId] = useState('tl');
  const [bigLogoHovered, setBigLogoHovered] = useState(false);
  const [smallLogoHovered, setSmallLogoHovered] = useState(false);

  const selected = useMemo(
    () => pieces.find((p) => p.id === selectedId) ?? null,
    [pieces, selectedId]
  );

  const sideInfo = useMemo(() => {
    if (!selected) return {};
    const info = {};
    for (const side of SIDES) {
      const neighbors = findNeighbors(pieces, selected, side);
      const data = sideFor(selected, side);
      const covers = coversNeighbors(selected, side, neighbors);
      info[side] = {
        data,
        neighbors,
        maxCount: maxKnobsForSide(selected, side),
        canCascade: neighbors.length > 0 && covers,
        partial: neighbors.length > 0 && !covers,
      };
    }
    return info;
  }, [pieces, selected]);

  const handleSideChange = (side, newCount) => {
    if (!selected) return;
    const piece = pieces.find((p) => p.id === selectedId);
    if (!piece) return;

    const current = sideFor(piece, side);
    if (current.count === newCount) return;

    const neighbors = findNeighbors(pieces, piece, side);
    const covers = coversNeighbors(piece, side, neighbors);
    const newType = resolveType(piece, side, neighbors, newCount);
    const newSide = { count: newCount, type: newType };

    if (cascade && newCount > 0 && neighbors.length > 0 && covers) {
      let next = splitNeighborsOnSide(pieces, selectedId, side, newCount, newType);
      next = updatePiece(next, selectedId, (p) => setPieceSide(p, side, newSide));
      setPieces(next);
      return;
    }

    let next = updatePiece(pieces, selectedId, (p) => setPieceSide(p, side, newSide));
    if (neighbors.length === 1 && edgesMatch(piece, neighbors[0], side)) {
      const nb = neighbors[0];
      next = updatePiece(next, nb.id, (p) =>
        setPieceSide(p, OPPOSITE[side], {
          count: newCount,
          type: oppositeType(newType),
        })
      );
    }
    setPieces(next);
  };

  const resetBoard = () => {
    setPieces(initialPieces());
    setSelectedId('tl');
  };

  return (
    <main className="stage">
      <header className="stage__head">
        <div
          className={`logo-big ${smallLogoHovered ? 'luminate' : ''}`}
          onMouseEnter={() => setBigLogoHovered(true)}
          onMouseLeave={() => setBigLogoHovered(false)}
        >
          <img src={BigLogo} alt="Big Logo" />
        </div>
        <p className="stage__eyebrow">Prototype</p>
        <h1 className="stage__title">Puzzle Piece Playground</h1>
        <p className="stage__subtitle">
          Click a piece, tweak its sides. Toggle splitting to grow clusters or to keep counts in sync.
        </p>
        <div
          className={`logo-small ${bigLogoHovered ? 'luminate' : ''}`}
          onMouseEnter={() => setSmallLogoHovered(true)}
          onMouseLeave={() => setSmallLogoHovered(false)}
        >
          <img src={SmallLogo} alt="Small Logo" />
        </div>
      </header>

      <div className="stage__layout">
        <aside className="controls">
          <section className="controls__section">
            <h2 className="controls__title">Selected</h2>
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

            <label className="controls__toggle">
              <input
                type="checkbox"
                checked={cascade}
                onChange={(e) => setCascade(e.target.checked)}
              />
              <span>Split neighbor(s)</span>
            </label>
          </section>

          {selected && (
            <section className="controls__section">
              <h2 className="controls__title">Sides</h2>
              {SIDES.map((side) => {
                const info = sideInfo[side];
                if (!info) return null;
                const { data, neighbors, maxCount, canCascade, partial } = info;
                const typeLabel = data.type === 'flat' ? 'flat' : data.type;
                let kind;
                if (neighbors.length === 0) kind = 'outer';
                else if (partial) kind = 'partial edge';
                else kind = `${neighbors.length} neighbor${neighbors.length > 1 ? 's' : ''}`;
                const willSplit = cascade && canCascade && data.count !== undefined;
                return (
                  <div key={side} className="controls__field">
                    <div className="controls__label">
                      <span className="controls__label-side">
                        {side[0].toUpperCase() + side.slice(1)}
                      </span>
                      <span className="controls__label-meta">
                        {typeLabel} · {kind}
                      </span>
                    </div>
                    <div className="controls__row">
                      <input
                        type="range"
                        min={0}
                        max={maxCount}
                        value={data.count}
                        onChange={(e) => handleSideChange(side, Number(e.target.value))}
                      />
                      <output className="controls__value">{data.count}</output>
                    </div>
                    {partial && cascade && (
                      <p className="controls__warn">
                        Can't split — this piece only covers part of the shared edge.
                      </p>
                    )}
                    {!partial && willSplit && neighbors.length > 0 && (
                      <p className="controls__note">
                        Changing this count will split the neighbor.
                      </p>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          <section className="controls__section controls__section--foot">
            <button type="button" className="controls__reset" onClick={resetBoard}>
              Reset board
            </button>
            <p className="controls__hint">
              With <em>Split neighbor(s)</em> on, changing a side rebuilds the
              piece across it into that many sub‑pieces. Off, the count just
              updates in place. Pieces can only split neighbors across edges
              they fully cover.
            </p>
          </section>
        </aside>

        <div className="board-wrap">
          <PuzzleBoard pieces={pieces} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </main>
  );
}
