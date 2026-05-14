// Compile a Project (grid + edges) into the pieces array consumed by
// `PuzzleBoard`. Each piece's side is assembled from its neighbor segments so
// knobs land at the midpoint of each shared sub-edge.

import { groupBoundsMap } from './grid.js';

export function edgeKey(idA, idB) {
  return idA < idB ? `${idA}||${idB}` : `${idB}||${idA}`;
}

// Reverse of edgeKey + outer-edge naming: pull the piece IDs back out of a
// pairKey. Returns [pieceId] for outer edges, [idA, idB] (lex-sorted) for
// shared edges. Lets `resolveEdge` consult the cell tier (`byPiece[id]`)
// from any caller that only has the pairKey.
export function piecesOfEdge(pairKey) {
  if (pairKey.includes('||outer-')) {
    return [pairKey.slice(0, pairKey.indexOf('||outer-'))];
  }
  return pairKey.split('||');
}

// For a piece with cell-bounds `b`, return the backgrounds that overlap it,
// in pixel-space {x,y,w,h} so the renderer can position the same image across
// all overlapped pieces (each piece's clipPath handles the slicing).
function collectBackgrounds(backgrounds, b, cellSize) {
  if (!backgrounds?.length) return undefined;
  const out = [];
  for (const bg of backgrounds) {
    const r = bg.rect;
    if (!r) continue;
    if (r.rMax < b.rMin || r.rMin > b.rMax) continue;
    if (r.cMax < b.cMin || r.cMin > b.cMax) continue;
    out.push({
      id: bg.id,
      src: bg.src,
      fit: bg.fit || 'cover',
      x: r.cMin * cellSize,
      y: r.rMin * cellSize,
      w: (r.cMax - r.cMin + 1) * cellSize,
      h: (r.rMax - r.rMin + 1) * cellSize,
    });
  }
  return out.length ? out : undefined;
}

// --- Effect resolution -------------------------------------------------------

// Chain (highest priority first):
//   per-edge (byEdge[pairKey])  >  cell (byPiece[id])  >  inner/outer layer  >  default
//
// `kind` is 'inner' for shared-edge segments and 'outer' for outer edges.
// `edgePieceIds` lists the piece IDs that touch this edge (one for outer edges,
// two for shared); used to consult the cell (byPiece) tier. When two pieces
// of a shared edge both have a byPiece entry, the lex-smaller id wins (matches
// the edgeKey ordering — predictable, no hidden recency).
export function resolveEdge(edges, pairKey, kind, edgePieceIds = []) {
  const ov = edges?.byEdge?.[pairKey];

  let cell = null;
  for (const pid of edgePieceIds) {
    if (edges?.byPiece?.[pid]) { cell = edges.byPiece[pid]; break; }
  }

  const layer = kind === 'inner' ? edges?.inner : edges?.outer;
  const def = edges?.default;
  return {
    effect: ov?.effect ?? cell?.effect ?? layer?.effect ?? def?.effect ?? 'puzzle',
    config: ov?.config ?? cell?.config ?? layer?.config ?? def?.config,
  };
}

// --- Compile -----------------------------------------------------------------

export function compileProject(project) {
  const { grid, edges, pieceColors, pieceContent, backgrounds } = project;
  const cellSize = grid.cellSize;
  const bounds = groupBoundsMap(grid);

  // 1. Build pieces (one per group).
  const pieces = [];
  const piecesById = new Map();
  for (const [id, b] of bounds) {
    const piece = {
      id,
      x: b.cMin * cellSize,
      y: b.rMin * cellSize,
      w: (b.cMax - b.cMin + 1) * cellSize,
      h: (b.rMax - b.rMin + 1) * cellSize,
      label: prettyLabel(id),
      fill: pieceColors?.[id],
      content: pieceContent?.[id],
      backgrounds: collectBackgrounds(backgrounds, b, cellSize),
      sides: {},
      sideEffects: {},
      sideEffectConfigs: {},
      edgeEffects: {},
      edgeEffectConfigs: {},
    };
    pieces.push(piece);
    piecesById.set(id, piece);
  }

  // 2. For each piece, compute each side from its neighbor segments.
  for (const piece of pieces) {
    const b = bounds.get(piece.id);

    for (const side of ALL_SIDES) {
      const segs = collectSegments(grid, piece.id, b, side);
      if (segs.length === 0) {
        // No neighbors on this side → outer edge. Apply effect with single knob or flat.
        const outerKey = `${piece.id}||outer-${side}`;
        const { effect, config } = resolveEdge(edges, outerKey, 'outer', [piece.id]);

        // For outer edges, apply the effect (puzzle/wave/straight)
        // Puzzle: single centered tab or socket depending on side convention
        if (effect === 'puzzle') {
          let knobType = (side === 'right' || side === 'bottom') ? 'tab' : 'socket';
          if (config?.inverted) {
            knobType = knobType === 'tab' ? 'socket' : 'tab';
          }
          piece.sides[side] = { count: 1, type: knobType };
        } else {
          // Wave or straight: treat as full-width effect
          piece.sides[side] = effect === 'flat' ? 'flat' : { count: 1, type: 'tab' };
        }

        piece.edgeEffects[side] = piece.edgeEffects[side] || {};
        piece.edgeEffectConfigs[side] = piece.edgeEffectConfigs[side] || {};
        piece.edgeEffects[side]['__outer'] = effect;
        if (config) piece.edgeEffectConfigs[side]['__outer'] = config;
        continue;
      }
      assignSide(piece, side, segs, edges);
    }
  }

  return pieces;
}

// --- Segment discovery -------------------------------------------------------

// Per-side axis descriptor: how to walk a piece's bounding rect along one
// side, where the neighbor cells live, and when the side is on the grid edge
// (no neighbors). Drives collectSegments and listSharedEdges so the four
// directions share one loop instead of four near-identical copies.
//
//   start/end  — the inclusive index range to walk along the side
//   atEdge     — true when this side faces the grid boundary (no neighbors)
//   peek       — read the neighbor groupId at the given walk index
const SIDE_AXIS = {
  right:  { start: (b)       => b.rMin,
            end:   (b)       => b.rMax,
            atEdge:(b, grid) => b.cMax + 1 >= grid.cols,
            peek:  (i, b, grid) => grid.groups[i][b.cMax + 1] },
  left:   { start: (b)       => b.rMin,
            end:   (b)       => b.rMax,
            atEdge:(b)       => b.cMin === 0,
            peek:  (i, b, grid) => grid.groups[i][b.cMin - 1] },
  bottom: { start: (b)       => b.cMin,
            end:   (b)       => b.cMax,
            atEdge:(b, grid) => b.rMax + 1 >= grid.rows,
            peek:  (i, b, grid) => grid.groups[b.rMax + 1][i] },
  top:    { start: (b)       => b.cMin,
            end:   (b)       => b.cMax,
            atEdge:(b)       => b.rMin === 0,
            peek:  (i, b, grid) => grid.groups[b.rMin - 1][i] },
};

// Walk the cells along one side of a group's bounding rect, grouping
// consecutive cells that share the same neighbor groupId. Returns ordered
// segments with normalized positions in [0,1] along that side.
//
//   { neighborId, startPos, endPos, midPos }
function collectSegments(grid, pieceId, b, side) {
  const ax = SIDE_AXIS[side];
  if (ax.atEdge(b, grid)) return [];

  const start = ax.start(b);
  const end   = ax.end(b);
  const sideLen = end - start + 1;

  const segs = [];
  let i = start;
  while (i <= end) {
    const nbId = ax.peek(i, b, grid);
    if (nbId === pieceId) { i++; continue; } // safety: same-group should never appear here
    let endI = i;
    while (endI + 1 <= end && ax.peek(endI + 1, b, grid) === nbId) endI++;
    const startPos = (i - start) / sideLen;
    const endPos   = (endI - start + 1) / sideLen;
    segs.push({ neighborId: nbId, startPos, endPos, midPos: (startPos + endPos) / 2 });
    i = endI + 1;
  }
  return segs;
}

// --- Side assembly -----------------------------------------------------------

// Convention: right & bottom sides emit tabs, left & top emit sockets. This
// guarantees the matching pieces interlock (a piece's right tab ↔ neighbor's
// left socket, piece's bottom tab ↔ neighbor's top socket).
function knobTypeForSide(side) {
  return (side === 'right' || side === 'bottom') ? 'tab' : 'socket';
}

function assignSide(piece, side, segs, edges) {
  const baseKnobType = knobTypeForSide(side);

  // One knob per segment, centered on that segment. Honor the inverted flag
  // following the same chain as effect/config: per-edge > cell > inner > default.
  const knobs = segs.map((s) => {
    const pairKey = edgeKey(piece.id, s.neighborId);
    const { config } = resolveEdge(edges, pairKey, 'inner', [piece.id, s.neighborId]);
    let knobType = baseKnobType;
    if (config?.inverted) {
      knobType = knobType === 'tab' ? 'socket' : 'tab';
    }
    return { pos: s.midPos, type: knobType };
  });

  // Simplify single-segment full-side cases to the compact { count, type } form
  // (only when the lone knob lands exactly at the midpoint).
  if (knobs.length === 1 && Math.abs(knobs[0].pos - 0.5) < 1e-6) {
    piece.sides[side] = { count: 1, type: knobs[0].type };
  } else {
    piece.sides[side] = knobs;
  }

  // Per-segment effect + config maps.
  piece.edgeEffects[side] = piece.edgeEffects[side] || {};
  piece.edgeEffectConfigs[side] = piece.edgeEffectConfigs[side] || {};

  for (const s of segs) {
    const pairKey = edgeKey(piece.id, s.neighborId);
    const { effect, config } = resolveEdge(edges, pairKey, 'inner', [piece.id, s.neighborId]);
    piece.edgeEffects[side][s.neighborId] = effect;
    if (config) piece.edgeEffectConfigs[side][s.neighborId] = config;
  }
}

// --- Labels ------------------------------------------------------------------

function prettyLabel(id) {
  // Singleton ids look like 'r0c1-g-N' — show the row/col bit.
  // Merged ids look like 'g-N' — show '#N'.
  if (id.startsWith('g-')) return `#${id.slice(2)}`;
  return id.split('-')[0];
}

// --- Edge enumeration (for the Edge Editor's edge picker) -------------------

// Each shared edge is enumerated once via the side that's lex-smaller in the
// pair (right & bottom). The opposite side is the neighbor's incoming side.
const SHARED_ENUM_SIDES = [
  { side: 'right',  opposite: 'left' },
  { side: 'bottom', opposite: 'top'  },
];

export function listSharedEdges(project) {
  const { grid } = project;
  const bounds = groupBoundsMap(grid);
  const seen = new Set();
  const out = [];
  for (const [id, b] of bounds) {
    for (const { side, opposite } of SHARED_ENUM_SIDES) {
      const ax = SIDE_AXIS[side];
      if (ax.atEdge(b, grid)) continue;
      const start = ax.start(b);
      const end   = ax.end(b);
      let i = start;
      while (i <= end) {
        const nbId = ax.peek(i, b, grid);
        if (nbId === id) { i++; continue; }
        let endI = i;
        while (endI + 1 <= end && ax.peek(endI + 1, b, grid) === nbId) endI++;
        const k = edgeKey(id, nbId);
        if (!seen.has(k)) {
          seen.add(k);
          out.push({ pairKey: k, pieceAId: id, sideA: side, pieceBId: nbId, sideB: opposite });
        }
        i = endI + 1;
      }
    }
  }
  return out;
}

const ALL_SIDES = ['top', 'right', 'bottom', 'left'];

export function listOuterEdges(project) {
  const { grid } = project;
  const bounds = groupBoundsMap(grid);
  const out = [];
  for (const [id, b] of bounds) {
    for (const side of ALL_SIDES) {
      if (SIDE_AXIS[side].atEdge(b, grid)) {
        out.push({ pairKey: `${id}||outer-${side}`, pieceId: id, side, isOuter: true });
      }
    }
  }
  return out;
}
