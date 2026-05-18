import { describe, expect, it } from 'vitest';
import {
  isRectangular,
  makeFreshGrid,
  mergeCells,
  unmergeCells,
} from '../../../src/grid/grid.js';

describe('isRectangular', () => {
  it('is true for a single cell', () => {
    expect(isRectangular([[0, 0]])).toBe(true);
  });

  it('is true for a full 2×2 block', () => {
    expect(isRectangular([[0, 0], [0, 1], [1, 0], [1, 1]])).toBe(true);
  });

  it('is false for an L-shaped selection', () => {
    expect(isRectangular([[0, 0], [0, 1], [1, 0]])).toBe(false);
  });

  it('is false for an empty selection', () => {
    expect(isRectangular([])).toBe(false);
  });

  it('is false when a duplicate cell makes the count match but coverage is incomplete', () => {
    // The bounding rect is 2×2 = 4 cells, but the selection only covers 3 distinct cells.
    expect(isRectangular([[0, 0], [0, 1], [1, 0], [0, 0]])).toBe(false);
  });
});

describe('mergeCells', () => {
  it('assigns the same groupId to every selected cell of a rectangular selection', () => {
    const grid = makeFreshGrid(2, 2);
    const next = mergeCells(grid, [[0, 0], [0, 1]]);

    expect(next.groups[0][0]).toBe(next.groups[0][1]);
    // The other row should be untouched.
    expect(next.groups[1][0]).not.toBe(next.groups[0][0]);
  });

  it('returns the unchanged grid when the selection is non-rectangular', () => {
    const grid = makeFreshGrid(2, 2);
    const next = mergeCells(grid, [[0, 0], [0, 1], [1, 0]]); // L-shape
    expect(next).toBe(grid);
  });
});

describe('unmergeCells', () => {
  it('splits every cell of the affected group into its own singleton', () => {
    const grid = makeFreshGrid(2, 2);
    const merged = mergeCells(grid, [[0, 0], [0, 1]]);
    const sharedId = merged.groups[0][0];

    const split = unmergeCells(merged, [[0, 0]]);

    expect(split.groups[0][0]).not.toBe(sharedId);
    expect(split.groups[0][1]).not.toBe(sharedId);
    expect(split.groups[0][0]).not.toBe(split.groups[0][1]);
  });

  it('reassigns the id even on a single-cell "unmerge" (no group merged)', () => {
    // Behaviour invariant relied on by grid-actions#unmerge: even when
    // unmerging an already-singleton cell, its id changes, and the action
    // takes care of carrying any colour forward to the new id.
    const grid = makeFreshGrid(2, 2);
    const originalId = grid.groups[0][0];

    const next = unmergeCells(grid, [[0, 0]]);
    expect(next.groups[0][0]).not.toBe(originalId);
  });
});
