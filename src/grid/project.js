// Pure project shape. No DOM, no storage — safe to import from Node / Workers
// / a future API server. The constructor lives here (instead of inside the
// browser-storage module) so headless callers can mint projects without
// pulling localStorage into module scope.
import { makeFreshGrid } from './grid.js';
import { nextProjectId } from './ids.js';

export function newProject(name = 'Untitled') {
  const now = Date.now();
  return {
    id: nextProjectId(),
    name,
    createdAt: now,
    updatedAt: now,
    grid: makeFreshGrid(2, 2),
    edges: {
      default: { effect: 'puzzle' },
      inner:   null,            // override for shared edges (between two pieces)
      outer:   null,            // override for outer edges (no neighbor)
      byEdge:  {},              // per-edge overrides — highest priority
    },
    pieceColors: {},
    pieceContent: {},
    backgrounds: [],
  };
}
