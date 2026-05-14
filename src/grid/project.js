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
      default: {
        effect: 'puzzle',
        // v2 effects map: { 'highlight:hover': { id, trigger, config } }
        // Higher tiers (inner/outer/byPiece/byEdge) merge on top; null at a
        // key removes an inherited entry. See compile.js#mergeEffects.
        effects: { 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } },
      },
      inner:   null,
      outer:   null,
      byPiece: {},
      byEdge:  {},
    },
    cells: {
      default: {
        // v2 effects map (same shape as edges' effects). Seeded with
        // `highlight` on hover so the editor's familiar "fill shifts on
        // hover" behaviour persists for new projects.
        effects: { 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } },
      },
      byPiece: {},
    },
    pieceColors: {},
    pieceContent: {},
    backgrounds: [],
  };
}
