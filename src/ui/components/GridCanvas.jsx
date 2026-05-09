import { useEffect, useRef, useState } from 'react';
import { groupBoundsMap, rectFill } from '../../grid/grid.js';

const CELL_PX = 64;        // visual cell size in the grid editor
const PADDING = 16;

// Renders the grid as squares. Tracks selection internally and reports it via
// `onSelectionChange`. Supports:
//   - Drag-select (mouse down on an empty cell, drag to expand a rectangle)
//   - Shift/Ctrl+click to add or remove a single cell from the selection
//   - Plain click clears the selection and selects just that cell
export default function GridCanvas({ grid, selection, onSelectionChange }) {
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null); // { startCell:[r,c], curCell:[r,c], baseSelection: Set }

  const w = grid.cols * CELL_PX + PADDING * 2;
  const h = grid.rows * CELL_PX + PADDING * 2;

  const bounds = groupBoundsMap(grid);

  // --- Selection helpers as Sets of "r,c" strings ---
  const selSet = new Set(selection.map(([r, c]) => `${r},${c}`));

  const cellAt = (clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) - PADDING;
    const y = (clientY - rect.top) - PADDING;
    const c = Math.floor(x / CELL_PX);
    const r = Math.floor(y / CELL_PX);
    if (r < 0 || r >= grid.rows || c < 0 || c >= grid.cols) return null;
    return [r, c];
  };

  const onCellPointerDown = (e, r, c) => {
    if (e.button !== 0) return;
    e.preventDefault();

    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      // Toggle this cell in the selection.
      const key = `${r},${c}`;
      const next = new Set(selSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      onSelectionChange([...next].map((s) => s.split(',').map(Number)));
      return;
    }

    // Start a drag-select beginning at this cell.
    setDrag({ startCell: [r, c], curCell: [r, c] });
    onSelectionChange([[r, c]]);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      const cell = cellAt(e.clientX, e.clientY);
      if (!cell) return;
      if (cell[0] === drag.curCell[0] && cell[1] === drag.curCell[1]) return;
      setDrag((d) => (d ? { ...d, curCell: cell } : d));
      onSelectionChange(rectFill([drag.startCell, cell]));
    };
    const up = () => setDrag(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag?.startCell?.[0], drag?.startCell?.[1], drag?.curCell?.[0], drag?.curCell?.[1]]);

  // --- Group outlines ---
  // Render one rectangle per merged group instead of per cell.
  const groupRects = [];
  for (const [id, b] of bounds) {
    groupRects.push({
      id,
      x: PADDING + b.cMin * CELL_PX,
      y: PADDING + b.rMin * CELL_PX,
      w: (b.cMax - b.cMin + 1) * CELL_PX,
      h: (b.rMax - b.rMin + 1) * CELL_PX,
      isMerged: (b.cMax > b.cMin) || (b.rMax > b.rMin),
      label: b.cMax > b.cMin || b.rMax > b.rMin ? `${b.cMax - b.cMin + 1}×${b.rMax - b.rMin + 1}` : '',
    });
  }

  // --- Selection overlay (shown above cells) ---
  const selRects = selection.map(([r, c]) => ({
    key: `${r},${c}`,
    x: PADDING + c * CELL_PX,
    y: PADDING + r * CELL_PX,
  }));

  // --- Cell pointer-down hit grid (one per cell) ---
  const cells = [];
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      cells.push({ r, c });
    }
  }

  return (
    <div className="grid-canvas-wrap">
      <svg
        ref={svgRef}
        className="grid-canvas"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
      >
        {/* Group fills */}
        {groupRects.map((g) => (
          <rect
            key={g.id}
            x={g.x} y={g.y} width={g.w} height={g.h}
            className={`grid-canvas__group ${g.isMerged ? 'grid-canvas__group--merged' : ''}`}
            rx="6" ry="6"
          />
        ))}

        {/* Selection overlay */}
        {selRects.map((s) => (
          <rect
            key={s.key}
            x={s.x + 2} y={s.y + 2} width={CELL_PX - 4} height={CELL_PX - 4}
            className="grid-canvas__selected"
            rx="4" ry="4"
            pointerEvents="none"
          />
        ))}

        {/* Group labels */}
        {groupRects.filter((g) => g.label).map((g) => (
          <text
            key={`l-${g.id}`}
            x={g.x + g.w / 2} y={g.y + g.h / 2}
            className="grid-canvas__label"
            textAnchor="middle"
            dominantBaseline="central"
            pointerEvents="none"
          >
            {g.label}
          </text>
        ))}

        {/* Cell hit areas (transparent) */}
        {cells.map(({ r, c }) => (
          <rect
            key={`hit-${r}-${c}`}
            x={PADDING + c * CELL_PX}
            y={PADDING + r * CELL_PX}
            width={CELL_PX}
            height={CELL_PX}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onPointerDown={(e) => onCellPointerDown(e, r, c)}
          />
        ))}
      </svg>
    </div>
  );
}
