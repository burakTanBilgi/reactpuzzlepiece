import { useEffect, useMemo, useRef, useState } from 'react';
import { MAX_GRID, MIN_GRID, isRectangular } from '../../grid/grid.js';
import { importTableText } from '../../grid/import.js';
import GridCanvas from '../components/GridCanvas.jsx';
import BackgroundsPanel from '../components/BackgroundsPanel.jsx';
import ImportDialog from '../components/ImportDialog.jsx';
import SliderRow from '../components/SliderRow.jsx';
import ViewPanel from '../components/ViewPanel.jsx';

// Curated palette — warm, sophisticated, mode-agnostic.
const PALETTE = [
  '#d68b54', '#e6a378', '#c87070', '#d4a056', '#a98ec4',
  '#5fb68f', '#7fc9a6', '#5b8c85', '#6b9bd1', '#a3a3a3',
];

export default function GridEditorPage({ project }) {
  const {
    project: p, setGrid, merge, unmerge, setPieceColor, replaceGrid,
    removeRows, removeCols,
    addBackground, updateBackground, removeBackground,
  } = project;
  const [selection, setSelection] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const fileRef = useRef(null);

  // Bounding rect of the current selection in cell coordinates, or null.
  const selectionRect = useMemo(() => {
    if (selection.length === 0) return null;
    let rMin = Infinity, rMax = -Infinity, cMin = Infinity, cMax = -Infinity;
    for (const [r, c] of selection) {
      if (r < rMin) rMin = r; if (r > rMax) rMax = r;
      if (c < cMin) cMin = c; if (c > cMax) cMax = c;
    }
    return { rMin, rMax, cMin, cMax };
  }, [selection]);

  // Read an image file (or blob) as a data URL, then add a background covering
  // either the current selection or the whole grid as a fallback.
  const addImageFromFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rect = selectionRect ?? {
        rMin: 0, rMax: (p?.grid.rows ?? 1) - 1,
        cMin: 0, cMax: (p?.grid.cols ?? 1) - 1,
      };
      addBackground({ src: ev.target.result, rect, fit: 'cover' });
    };
    reader.readAsDataURL(file);
  };

  // Listen for paste events globally — if an image is in the clipboard,
  // turn it into a background covering the current selection (or full grid).
  useEffect(() => {
    const handler = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type && item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) addImageFromFile(file);
          return;
        }
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionRect, p?.grid.rows, p?.grid.cols]);

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

        <BackgroundsPanel
          backgrounds={p.backgrounds || []}
          selectionRect={selectionRect}
          onAddImage={addImageFromFile}
          onUpdate={updateBackground}
          onRemove={removeBackground}
        />

        <section className="card">
          <h3 className="card__title">Tips</h3>
          <ul className="tip-list">
            <li>Drag from any cell to box-select.</li>
            <li>Shift-click to add or remove individual cells.</li>
            <li><strong>Click a row/column number</strong> to delete it. Drag across multiple to delete in bulk.</li>
            <li>Merged groups show their dimensions.</li>
            <li>Click any number value to type it directly.</li>
            <li><strong>Scroll</strong> to zoom; middle-drag or Ctrl+drag to pan.</li>
            <li>Select cells, then <strong>paste an image</strong> (Ctrl+V) to span it across them.</li>
          </ul>
        </section>
      </aside>

      <ViewPanel>
        <GridCanvas
          grid={p.grid}
          selection={selection}
          onSelectionChange={setSelection}
          pieceColors={p.pieceColors}
          backgrounds={p.backgrounds}
          onDeleteRows={(idxs) => { removeRows(idxs); setSelection([]); }}
          onDeleteCols={(idxs) => { removeCols(idxs); setSelection([]); }}
        />
      </ViewPanel>

      {showImport && (
        <ImportDialog
          onClose={() => setShowImport(false)}
          onImport={handleImportText}
        />
      )}
    </div>
  );
}

