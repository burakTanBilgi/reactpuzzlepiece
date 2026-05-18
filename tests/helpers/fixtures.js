// Test fixtures: small, deterministic project + grid builders.
// Reused by the unit and component test suites so each test starts
// from a predictable shape and doesn't reach into the live storage.

import { newProject } from '../../src/grid/project.js';
import { mergeCells } from '../../src/grid/grid.js';

// Reset the id factories' counters so generated ids are stable across
// the test (no leakage from a previous test that bumped them up).
// `ids.js` exposes a module-scoped counter — we can't reset it from
// outside, so tests should treat ids as opaque and avoid asserting on
// specific values like `g-7`. The fixture helpers here favour structure
// over id literals.

// 2×2 fresh grid project.
export function project2x2() {
  return newProject('test-2x2');
}

// 3×3 fresh grid project.
export function project3x3() {
  const p = newProject('test-3x3');
  // resize from 2×2 to 3×3 by directly mutating (acceptable in a fixture).
  // In real flow, callers would use `setGrid`. We avoid importing the
  // hook here so fixtures stay pure / synchronous.
  return {
    ...p,
    grid: {
      rows: 3,
      cols: 3,
      cellSize: p.grid.cellSize,
      groups: Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 3 }, (_, c) => `r${r}c${c}-fix-${r}-${c}`)),
    },
  };
}

// A 2×2 project with the top-left 1×2 cells merged into one piece, with
// a colour applied.
export function project2x2WithTopMerge({ color = '#abcdef' } = {}) {
  const p = project2x2();
  const grid = mergeCells(p.grid, [[0, 0], [0, 1]]);
  const mergedId = grid.groups[0][0];
  return {
    ...p,
    grid,
    pieceColors: { [mergedId]: color },
  };
}

// Build a project with arbitrary cell-effects on the default tier so
// resolve-effects tests have something to assert on.
export function projectWithCellEffect(effectId, trigger = 'hover') {
  const p = project2x2();
  return {
    ...p,
    cells: {
      default: {
        effects: {
          [`${effectId}:${trigger}`]: { id: effectId, trigger, config: {} },
        },
      },
      byPiece: {},
    },
  };
}
