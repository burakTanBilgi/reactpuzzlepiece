import { useEffect, useRef, useState } from 'react';
import { isRectangular, mergeCells, makeFreshGrid, unmergeCells, rectFill } from '../../../../grid/grid.js';

const CELL = 56;
const PAD = 12;
const ROWS = 3;
const COLS = 4;

// Tiny self-contained grid: drag-select, merge (rectangular), unmerge, reset.
// Demonstrates the Grid editor's primary interaction without needing a project.
export default function GridDemo() {
  const [grid, setGrid] = useState(() => makeFreshGrid(ROWS, COLS, CELL));
  const [selection, setSelection] = useState([]);
  const svgRef = useRef(null);
  const drag = useRef(null);

  const cellAt = (x, y) => {
    const r = Math.floor((y - PAD) / CELL);
    const c = Math.floor((x - PAD) / CELL);
    if (r < 0 || r >= grid.rows || c < 0 || c >= grid.cols) return null;
    return [r, c];
  };

  const onDown = (e, r, c) => {
    if (e.button !== 0) return;
    e.preventDefault();
    if (e.shiftKey) {
      const key = `${r},${c}`;
      const set = new Set(selection.map(([rr, cc]) => `${rr},${cc}`));
      if (set.has(key)) set.delete(key); else set.add(key);
      setSelection([...set].map((s) => s.split(',').map(Number)));
      return;
    }
    drag.current = { start: [r, c], cur: [r, c] };
    setSelection([[r, c]]);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cell = cellAt(e.clientX - rect.left, e.clientY - rect.top);
      if (!cell) return;
      if (cell[0] === drag.current.cur[0] && cell[1] === drag.current.cur[1]) return;
      drag.current.cur = cell;
      setSelection(rectFill([drag.current.start, cell]));
    };
    const up = () => { drag.current = null; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  });

  const canMerge = selection.length >= 2 && isRectangular(selection);
  const canUnmerge = selection.length >= 1;

  const doMerge = () => {
    if (!canMerge) return;
    setGrid((g) => mergeCells(g, selection));
    setSelection([]);
  };
  const doUnmerge = () => {
    if (!canUnmerge) return;
    setGrid((g) => unmergeCells(g, selection));
    setSelection([]);
  };
  const reset = () => {
    setGrid(makeFreshGrid(ROWS, COLS, CELL));
    setSelection([]);
  };

  // Compute group rectangles.
  const groupBounds = new Map();
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const id = grid.groups[r][c];
      const b = groupBounds.get(id);
      if (!b) groupBounds.set(id, { rMin: r, rMax: r, cMin: c, cMax: c });
      else {
        if (r > b.rMax) b.rMax = r;
        if (c > b.cMax) b.cMax = c;
      }
    }
  }

  const w = COLS * CELL + PAD * 2;
  const h = ROWS * CELL + PAD * 2;
  const selSet = new Set(selection.map(([r, c]) => `${r},${c}`));

  return (
    <div className="grid-demo">
      <svg ref={svgRef} className="grid-demo__svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {[...groupBounds.entries()].map(([id, b]) => {
          const isMerged = b.cMax > b.cMin || b.rMax > b.rMin;
          return (
            <rect key={id}
              x={PAD + b.cMin * CELL} y={PAD + b.rMin * CELL}
              width={(b.cMax - b.cMin + 1) * CELL}
              height={(b.rMax - b.rMin + 1) * CELL}
              rx="4"
              fill={isMerged ? 'rgba(214, 139, 84, 0.18)' : 'var(--surface-2)'}
              stroke={isMerged ? 'var(--primary-2)' : 'var(--stroke-idle)'}
              strokeWidth="1.5"
            />
          );
        })}
        {selection.map(([r, c]) => (
          <rect key={`s-${r}-${c}`}
            x={PAD + c * CELL + 2} y={PAD + r * CELL + 2}
            width={CELL - 4} height={CELL - 4} rx="3"
            fill="rgba(214, 139, 84, 0.28)"
            stroke="var(--primary-2)" strokeWidth="2"
            pointerEvents="none"
          />
        ))}
        {Array.from({ length: ROWS }).flatMap((_, r) =>
          Array.from({ length: COLS }, (_, c) => (
            <rect key={`hit-${r}-${c}`}
              x={PAD + c * CELL} y={PAD + r * CELL}
              width={CELL} height={CELL}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onPointerDown={(e) => onDown(e, r, c)}
            />
          ))
        )}
      </svg>

      <div className="grid-demo__controls">
        <button type="button" className="action-btn action-btn--primary" onClick={doMerge} disabled={!canMerge}>
          ⊞ Merge
        </button>
        <button type="button" className="action-btn" onClick={doUnmerge} disabled={!canUnmerge}>
          ⊟ Unmerge
        </button>
        <button type="button" className="action-btn action-btn--ghost" onClick={reset}>
          Reset
        </button>
        <span className="hint">
          {selection.length === 0
            ? 'Drag across cells.'
            : canMerge ? `${selection.length} cells — ready to merge.`
            : `${selection.length} cell${selection.length === 1 ? '' : 's'} selected.`}
        </span>
      </div>
    </div>
  );
}
