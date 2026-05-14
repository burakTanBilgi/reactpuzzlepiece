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
      mutateGrid((g) => unmergeCells(g, cellRefs));
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
