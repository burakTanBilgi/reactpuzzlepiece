// Pure action factory for grid-shape mutations. No React imports — call from
// any state owner that exposes a `setProject(updater)` signature.
import { deleteCols, deleteRows, mergeCells, resizeGrid, unmergeCells } from '../grid.js';

export function gridActions(setProject) {
  const mutateGrid = (updater) =>
    setProject((p) => (p ? { ...p, grid: updater(p.grid) } : p));

  return {
    setGrid({ rows, cols }) {
      mutateGrid((g) => resizeGrid(g, rows ?? g.rows, cols ?? g.cols));
    },

    merge(cellRefs) {
      mutateGrid((g) => mergeCells(g, cellRefs));
    },

    unmerge(cellRefs) {
      setProject((p) => {
        if (!p) return p;
        const oldGrid = p.grid;
        const affectedOldIds = new Set();
        for (const [r, c] of cellRefs) affectedOldIds.add(oldGrid.groups[r][c]);
        const nextGrid = unmergeCells(oldGrid, cellRefs);

        // Carry the old group's color over to each new singleton id so an
        // unmerge doesn't visually wipe the user's color choice.
        const oldColors = p.pieceColors || {};
        const pieceColors = { ...oldColors };
        for (let r = 0; r < oldGrid.rows; r++) {
          for (let c = 0; c < oldGrid.cols; c++) {
            const oldId = oldGrid.groups[r][c];
            if (!affectedOldIds.has(oldId)) continue;
            const newId = nextGrid.groups[r][c];
            if (newId === oldId) continue;
            if (oldColors[oldId] != null && pieceColors[newId] == null) {
              pieceColors[newId] = oldColors[oldId];
            }
          }
        }
        for (const oldId of affectedOldIds) delete pieceColors[oldId];

        return { ...p, grid: nextGrid, pieceColors };
      });
    },

    removeRows(rowIdxs) {
      if (!rowIdxs?.length) return;
      setProject((p) => {
        if (!p) return p;
        const next = deleteRows(p.grid, rowIdxs);
        return next ? { ...p, grid: next } : p;
      });
    },

    removeCols(colIdxs) {
      if (!colIdxs?.length) return;
      setProject((p) => {
        if (!p) return p;
        const next = deleteCols(p.grid, colIdxs);
        return next ? { ...p, grid: next } : p;
      });
    },

    // Replace the entire grid (used by CSV/TSV import). Resets edges + colors
    // + content because every piece id is brand new.
    replaceGrid(grid, content) {
      setProject((p) => (p ? {
        ...p,
        grid,
        edges: { default: p.edges?.default ?? { effect: 'puzzle' }, byEdge: {} },
        pieceColors: {},
        pieceContent: content || {},
      } : p));
    },
  };
}
