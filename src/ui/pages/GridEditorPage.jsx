import { useMemo, useRef, useState } from 'react';
import { MAX_GRID, MIN_GRID, isRectangular } from '../../grid/grid.js';
import { importTableText } from '../../grid/import.js';
import GridCanvas from '../components/GridCanvas.jsx';
import ImportDialog from '../components/ImportDialog.jsx';

// Curated palette — warm, sophisticated, mode-agnostic.
const PALETTE = [
  '#d68b54', '#e6a378', '#c87070', '#d4a056', '#a98ec4',
  '#5fb68f', '#7fc9a6', '#5b8c85', '#6b9bd1', '#a3a3a3',
];

export default function GridEditorPage({ project }) {
  const { project: p, setGrid, merge, unmerge, setPieceColor, replaceGrid } = project;
  const [selection, setSelection] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const fileRef = useRef(null);

  const handleImportText = (text, opts) => {
    try {
      const { grid, pieceContent } = importTableText(text, opts);
      replaceGrid(grid, pieceContent);
      setShowImport(false);
      setSelection([]);
    } catch (err) {
      alert('Import failed: ' + err.message);
    }
  };

  const handleImportFile = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      handleImportText(text, { autoMerge: true });
    } catch (err) {
      alert('Could not read file: ' + err.message);
    }
  };

  if (!p) return null;

  const canMerge = selection.length >= 2 && isRectangular(selection);
  const canUnmerge = selection.length >= 1;

  // Unique groupIds for the selected cells.
  const selectedGroupIds = useMemo(() => {
    const ids = new Set();
    for (const [r, c] of selection) {
      const id = p.grid.groups[r]?.[c];
      if (id) ids.add(id);
    }
    return [...ids];
  }, [selection, p.grid.groups]);

  // Current shared color (or null if mixed/unset).
  const currentColor = useMemo(() => {
    if (selectedGroupIds.length === 0) return null;
    const first = p.pieceColors?.[selectedGroupIds[0]] ?? null;
    return selectedGroupIds.every((id) => (p.pieceColors?.[id] ?? null) === first) ? first : null;
  }, [selectedGroupIds, p.pieceColors]);

  const applyColor = (color) => {
    for (const id of selectedGroupIds) setPieceColor(id, color);
  };

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
          <h3 className="card__title">Import</h3>
          <p className="hint">Paste a spreadsheet, or import a CSV file.</p>
          <div className="action-stack">
            <button type="button" className="action-btn" onClick={() => setShowImport(true)}>
              ⎘ Paste data
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.tsv,.txt,text/csv"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = '';
                if (f) handleImportFile(f);
              }}
            />
            <button type="button" className="action-btn action-btn--ghost" onClick={() => fileRef.current?.click()}>
              ↑ Import CSV/TSV file
            </button>
          </div>
          <p className="hint hint--warn">Importing replaces the current grid.</p>
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

        {selectedGroupIds.length > 0 && (
          <section className="card">
            <h3 className="card__title">
              Color {selectedGroupIds.length > 1 ? `(${selectedGroupIds.length} pieces)` : ''}
            </h3>
            <div className="color-grid">
              <button
                type="button"
                className={`color-swatch color-swatch--clear ${currentColor == null ? 'color-swatch--active' : ''}`}
                onClick={() => applyColor(null)}
                title="Clear color"
                aria-label="Clear color"
              />
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${currentColor === c ? 'color-swatch--active' : ''}`}
                  style={{ background: c }}
                  onClick={() => applyColor(c)}
                  title={c}
                  aria-label={`Color ${c}`}
                />
              ))}
              <label className="color-swatch color-swatch--custom" title="Custom color">
                <input
                  type="color"
                  value={currentColor || '#888888'}
                  onChange={(e) => applyColor(e.target.value)}
                />
              </label>
            </div>
          </section>
        )}

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
          pieceColors={p.pieceColors}
        />
      </div>

      {showImport && (
        <ImportDialog
          onClose={() => setShowImport(false)}
          onImport={handleImportText}
        />
      )}
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
