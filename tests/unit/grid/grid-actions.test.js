import { describe, expect, it } from 'vitest';
import { gridActions } from '../../../src/grid/actions/grid-actions.js';
import { project2x2WithTopMerge } from '../../helpers/fixtures.js';

// gridActions wraps each mutation as a setProject(updater) call so it
// matches React's `setState` shape. In a test we just emulate that with
// a captured-state object.
function makeProjectHolder(initial) {
  let state = initial;
  const setProject = (updater) => { state = typeof updater === 'function' ? updater(state) : updater; };
  return {
    get state() { return state; },
    setProject,
  };
}

describe('gridActions.unmerge — color preservation', () => {
  it('copies the merged group color onto every new singleton id', () => {
    const initial = project2x2WithTopMerge({ color: '#d68b54' });
    const oldId   = initial.grid.groups[0][0];
    expect(initial.pieceColors[oldId]).toBe('#d68b54');

    const holder = makeProjectHolder(initial);
    gridActions(holder.setProject).unmerge([[0, 0], [0, 1]]);

    const next = holder.state;
    const newIdA = next.grid.groups[0][0];
    const newIdB = next.grid.groups[0][1];

    // Each new singleton should carry the original color.
    expect(next.pieceColors[newIdA]).toBe('#d68b54');
    expect(next.pieceColors[newIdB]).toBe('#d68b54');

    // And the old group id should be dropped to avoid orphaned keys.
    expect(next.pieceColors[oldId]).toBeUndefined();
  });

  it('also reassigns + preserves color when unmerging a single-cell group', () => {
    // Regression guard: even a "no-op" unmerge on a singleton reissues
    // the group id (see grid.js#unmergeCells). The action must still
    // carry the color forward to the new id.
    const initial = {
      ...project2x2WithTopMerge({ color: '#aa00aa' }),
    };
    // Force a single-cell unmerge: pick a cell that's its own singleton (row 1, col 0).
    const oldId = initial.grid.groups[1][0];
    const initialWithSingletonColor = {
      ...initial,
      pieceColors: { ...initial.pieceColors, [oldId]: '#aa00aa' },
    };

    const holder = makeProjectHolder(initialWithSingletonColor);
    gridActions(holder.setProject).unmerge([[1, 0]]);

    const next = holder.state;
    const newId = next.grid.groups[1][0];
    expect(newId).not.toBe(oldId);
    expect(next.pieceColors[newId]).toBe('#aa00aa');
    expect(next.pieceColors[oldId]).toBeUndefined();
  });
});
