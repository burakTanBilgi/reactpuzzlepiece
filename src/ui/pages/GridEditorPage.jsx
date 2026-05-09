import { useState } from 'react';
import { MAX_GRID, MIN_GRID, isRectangular } from '../../grid/grid.js';
import GridCanvas from '../components/GridCanvas.jsx';

export default function GridEditorPage({ project }) {
  const { project: p, setGrid, merge, unmerge } = project;
  const [selection, setSelection] = useState([]);

  if (!p) return null;

  const canMerge = selection.length >= 2 && isRectangular(selection);
  const canUnmerge = selection.length >= 1;

  const doMerge = () => {
    if (!canMerge) return;
    merge(selection);
    setSelection([]);
  };

  const doUnmerge = () => {
    if (!canUnmerge) return;
    unmerge(selection);
    setSelection([]);
  };

  const clearSel = () => setSelection([]);

  return (
    <div className="page-grid">
      <aside className="side-tools">
        <section className="card">
          <h3 className="card__title">Dimensions</h3>
          <SliderRow
            label="Rows" min={MIN_GRID} max={MAX_GRID}
            value={p.grid.rows}
            onChange={(v) => setGrid({ rows: v })}
          />
          <SliderRow
            label="Cols" min={MIN_GRID} max={MAX_GRID}
            value={p.grid.cols}
            onChange={(v) => setGrid({ cols: v })}
          />
          <p className="hint">{p.grid.rows} × {p.grid.cols} cells (max {MAX_GRID}×{MAX_GRID}).</p>
        </section>

        <section className="card">
          <h3 className="card__title">Selection</h3>
          <p className="hint">
            {selection.length === 0
              ? 'Drag across cells, or click + Shift to add cells.'
              : `${selection.length} cell${selection.length === 1 ? '' : 's'} selected.`}
          </p>
          <div className="action-stack">
            <button
              type="button"
              className="action-btn action-btn--primary"
              disabled={!canMerge}
              onClick={doMerge}
              title={canMerge ? 'Merge selected cells' : 'Selection must form a complete rectangle'}
            >
              ⊞ Merge
            </button>
            <button
              type="button"
              className="action-btn"
              disabled={!canUnmerge}
              onClick={doUnmerge}
            >
              ⊟ Unmerge
            </button>
            <button
              type="button"
              className="action-btn action-btn--ghost"
              disabled={selection.length === 0}
              onClick={clearSel}
            >
              Clear selection
            </button>
          </div>
          {selection.length >= 2 && !canMerge && (
            <p className="hint hint--warn">
              Selection isn't rectangular — merge requires every cell in a complete rectangle.
            </p>
          )}
        </section>

        <section className="card">
          <h3 className="card__title">Tips</h3>
          <ul className="tip-list">
            <li>Drag from any cell to box-select.</li>
            <li>Shift-click to add or remove individual cells.</li>
            <li>Merged groups show their dimensions in the canvas.</li>
            <li>Use the Edges page to style connectors.</li>
          </ul>
        </section>
      </aside>

      <div className="page-grid__canvas">
        <GridCanvas
          grid={p.grid}
          selection={selection}
          onSelectionChange={setSelection}
        />
      </div>
    </div>
  );
}

function SliderRow({ label, min, max, value, onChange }) {
  return (
    <label className="slider-control">
      <span className="slider-control__label">{label}</span>
      <input
        type="range" min={min} max={max} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output className="slider-control__value">{value}</output>
    </label>
  );
}
