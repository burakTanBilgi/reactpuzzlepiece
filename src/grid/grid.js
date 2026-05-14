// Pure cell-grid model. A grid is rows × cols of cells; every cell carries
// a `groupId`. Cells with the same groupId are merged into one piece.
// All functions are immutable — they return new grids/maps.

import { nextGroupId } from './ids.js';

export const MIN_GRID = 1;
export const MAX_GRID = 50;
export const DEFAULT_CELL_SIZE = 200;

export const clampGridSize = (n) =>
  Math.max(MIN_GRID, Math.min(MAX_GRID, Number.isFinite(n) ? Math.floor(n) : MIN_GRID));

// --- Grid construction -------------------------------------------------------

export function makeFreshGrid(rows = 2, cols = 2, cellSize = DEFAULT_CELL_SIZE) {
  const r = clampGridSize(rows);
  const c = clampGridSize(cols);
  const groups = Array.from({ length: r }, (_, ri) =>
    Array.from({ length: c }, (_, ci) => `r${ri}c${ci}-${nextGroupId()}`)
  );
  return { rows: r, cols: c, cellSize, groups };
}

// Resize a grid. Cells in the overlap area keep their groups (clipped if a
// merged group would extend past the new bounds — those become single cells).
export function resizeGrid(grid, newRows, newCols) {
  const r = clampGridSize(newRows);
  const c = clampGridSize(newCols);
  if (r === grid.rows && c === grid.cols) return grid;

  const groups = Array.from({ length: r }, (_, ri) =>
    Array.from({ length: c }, (_, ci) => {
      if (ri < grid.rows && ci < grid.cols) return grid.groups[ri][ci];
      return `r${ri}c${ci}-${nextGroupId()}`;
    })
  );

  // Heal: any group whose anchor (top-left cell) is now outside the bounds, or
  // whose cells become non-rectangular after clipping, should be split into
  // single-cell groups so we don't end up with broken merges.
  const counts = new Map();
  for (const row of groups) for (const id of row) counts.set(id, (counts.get(id) || 0) + 1);

  for (let ri = 0; ri < r; ri++) {
    for (let ci = 0; ci < c; ci++) {
      const id = groups[ri][ci];
      if (counts.get(id) === 1) continue;
      // Verify the group still forms a rectangle within the new grid.
      const cells = [];
      for (let r2 = 0; r2 < r; r2++)
        for (let c2 = 0; c2 < c; c2++)
          if (groups[r2][c2] === id) cells.push([r2, c2]);
      if (!isRectangular(cells)) {
        for (const [r2, c2] of cells) groups[r2][c2] = `r${r2}c${c2}-${nextGroupId()}`;
      }
    }
  }

  return { ...grid, rows: r, cols: c, groups };
}

// --- Selection helpers -------------------------------------------------------

// A "selection" is an array of [r, c] tuples. Order doesn't matter.
export function isRectangular(cellRefs) {
  if (cellRefs.length === 0) return false;
  let rMin = Infinity, rMax = -Infinity, cMin = Infinity, cMax = -Infinity;
  for (const [r, c] of cellRefs) {
    if (r < rMin) rMin = r; if (r > rMax) rMax = r;
    if (c < cMin) cMin = c; if (c > cMax) cMax = c;
  }
  const expected = (rMax - rMin + 1) * (cMax - cMin + 1);
  if (cellRefs.length !== expected) return false;
  // Also confirm no duplicates and every cell within the rect is present.
  const seen = new Set(cellRefs.map(([r, c]) => `${r},${c}`));
  for (let r = rMin; r <= rMax; r++)
    for (let c = cMin; c <= cMax; c++)
      if (!seen.has(`${r},${c}`)) return false;
  return true;
}

// Expand a selection to the full bounding rect (snap to a rectangle).
export function rectFill(cellRefs) {
  if (cellRefs.length === 0) return [];
  let rMin = Infinity, rMax = -Infinity, cMin = Infinity, cMax = -Infinity;
  for (const [r, c] of cellRefs) {
    if (r < rMin) rMin = r; if (r > rMax) rMax = r;
    if (c < cMin) cMin = c; if (c > cMax) cMax = c;
  }
  const out = [];
  for (let r = rMin; r <= rMax; r++)
    for (let c = cMin; c <= cMax; c++) out.push([r, c]);
  return out;
}

// --- Mutations ---------------------------------------------------------------

// Merge a rectangular selection into one group. Returns the unchanged grid if
// the selection isn't a complete rectangle.
export function mergeCells(grid, cellRefs) {
  if (!isRectangular(cellRefs)) return grid;
  // Also ensure the selection doesn't bisect any existing merged group —
  // if cells inside the selection belong to groups whose other cells are
  // outside the selection, those outside cells must become singletons.
  const insideKey = new Set(cellRefs.map(([r, c]) => `${r},${c}`));
  const affectedGroups = new Set();
  for (const [r, c] of cellRefs) affectedGroups.add(grid.groups[r][c]);

  const groups = grid.groups.map((row) => row.slice());
  const newId = nextGroupId();

  // Split-out: any cell not in the selection but sharing a group with it
  // becomes its own singleton.
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      if (insideKey.has(`${r},${c}`)) continue;
      if (affectedGroups.has(groups[r][c])) {
        groups[r][c] = `r${r}c${c}-${nextGroupId()}`;
      }
    }
  }
  // Apply the merge.
  for (const [r, c] of cellRefs) groups[r][c] = newId;
  return { ...grid, groups };
}

// Restore each cell in the selection (and any cell sharing a group with a
// selected cell) to its own singleton group.
export function unmergeCells(grid, cellRefs) {
  const affected = new Set();
  for (const [r, c] of cellRefs) affected.add(grid.groups[r][c]);
  const groups = grid.groups.map((row) => row.slice());
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      if (affected.has(groups[r][c])) {
        groups[r][c] = `r${r}c${c}-${nextGroupId()}`;
      }
    }
  }
  return { ...grid, groups };
}

// --- Group queries -----------------------------------------------------------

export function groupBoundsMap(grid) {
  const map = new Map(); // groupId → { rMin, rMax, cMin, cMax }
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const id = grid.groups[r][c];
      const b = map.get(id);
      if (!b) map.set(id, { rMin: r, rMax: r, cMin: c, cMax: c });
      else {
        if (r < b.rMin) b.rMin = r; if (r > b.rMax) b.rMax = r;
        if (c < b.cMin) b.cMin = c; if (c > b.cMax) b.cMax = c;
      }
    }
  }
  return map;
}

// True if cell [r,c] is the top-left anchor of its group.
export function isAnchor(grid, r, c) {
  const id = grid.groups[r][c];
  return (r === 0 || grid.groups[r - 1][c] !== id) &&
         (c === 0 || grid.groups[r][c - 1] !== id);
}

// --- Row/column deletion ---------------------------------------------------

// Delete the rows whose indexes are listed in `rowIdxs` (0-based).
// Any merged group whose remaining cells become non-rectangular is split into
// singletons. Returns null if the deletion would leave fewer than MIN_GRID rows.
export function deleteRows(grid, rowIdxs) {
  const drop = new Set(rowIdxs);
  const remaining = grid.groups.filter((_, r) => !drop.has(r));
  if (remaining.length < MIN_GRID) return null;
  const next = { ...grid, rows: remaining.length, groups: remaining.map((r) => r.slice()) };
  return healMergedGroups(next);
}

// Delete the columns whose indexes are listed in `colIdxs` (0-based).
export function deleteCols(grid, colIdxs) {
  const drop = new Set(colIdxs);
  const cols = grid.cols - drop.size;
  if (cols < MIN_GRID) return null;
  const groups = grid.groups.map((row) => row.filter((_, c) => !drop.has(c)));
  return healMergedGroups({ ...grid, cols, groups });
}

// After mutation, re-check every multi-cell group: if the remaining cells no
// longer form a rectangle, break the group into singletons.
function healMergedGroups(grid) {
  const counts = new Map();
  for (const row of grid.groups) for (const id of row) counts.set(id, (counts.get(id) || 0) + 1);
  const groups = grid.groups.map((row) => row.slice());
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const id = groups[r][c];
      if (counts.get(id) === 1) continue;
      const cells = [];
      for (let r2 = 0; r2 < grid.rows; r2++)
        for (let c2 = 0; c2 < grid.cols; c2++)
          if (groups[r2][c2] === id) cells.push([r2, c2]);
      if (!isRectangular(cells)) {
        for (const [r2, c2] of cells) groups[r2][c2] = `r${r2}c${c2}-${nextGroupId()}`;
        // Recompute counts touched here only matters for the not-equal check above;
        // the singleton ids are unique so subsequent checks on this loop position
        // will just see count = 1.
      }
    }
  }
  return { ...grid, groups };
}
