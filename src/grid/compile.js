// Compile a Project (grid + edges) into the pieces array consumed by
// `PuzzleBoard`. Each piece's side is assembled from its neighbor segments so
// knobs land at the midpoint of each shared sub-edge.

import { groupBoundsMap } from './grid.js';

export function edgeKey(idA, idB) {
  return idA < idB ? `${idA}||${idB}` : `${idB}||${idA}`;
}

// --- Compile -----------------------------------------------------------------

export function compileProject(project) {
  const { grid, edges, pieceColors, pieceContent } = project;
  const cellSize = grid.cellSize;
  const bounds = groupBoundsMap(grid);

  // 1. Build pieces (one per group).
  const pieces = [];
  const piecesById = new Map();
  for (const [id, b] of bounds) {
    pieces.push(piecesById.set(id, {
      id,
      x: b.cMin * cellSize,
      y: b.rMin * cellSize,
      w: (b.cMax - b.cMin + 1) * cellSize,
      h: (b.rMax - b.rMin + 1) * cellSize,
      label: prettyLabel(id),
      fill: pieceColors?.[id],
      content: pieceContent?.[id],
      sides: {},
      sideEffects: {},
      sideEffectConfigs: {},
      edgeEffects: {},
      edgeEffectConfigs: {},
    }).get(id));
  }

  const defaultEffect = edges?.default?.effect ?? 'puzzle';
  const defaultConfig = edges?.default?.config;

  // 2. For each piece, compute each side from its neighbor segments.
  for (const piece of pieces) {
    const b = bounds.get(piece.id);

    for (const side of ['top', 'right', 'bottom', 'left']) {
      const segs = collectSegments(grid, piece.id, b, side);
      if (segs.length === 0) {
        // No neighbors on this side → outer edge. Apply effect with single knob or flat.
        const outerKey = `${piece.id}||outer-${side}`;
        const override = edges?.byEdge?.[outerKey];
        const effect = override?.effect ?? defaultEffect;
        const config = override?.config ?? defaultConfig;

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
      assignSide(piece, side, segs, edges, defaultEffect, defaultConfig);
    }
  }

  return pieces;
}

// --- Segment discovery -------------------------------------------------------

// Walk the cells along one side of a group's bounding rect, grouping
// consecutive cells that share the same neighbor groupId. Returns ordered
// segments with normalized positions in [0,1] along that side.
//
//   { neighborId, startPos, endPos, midPos }
//
function collectSegments(grid, pieceId, b, side) {
  const segs = [];
  const { rows, cols } = grid;

  if (side === 'right') {
    if (b.cMax + 1 >= cols) return segs;
    const sideLen = b.rMax - b.rMin + 1;
    let r = b.rMin;
    while (r <= b.rMax) {
      const nbId = grid.groups[r][b.cMax + 1];
      if (nbId === pieceId) { r++; continue; } // safety: same-group should never appear here
      let endR = r;
      while (endR + 1 <= b.rMax && grid.groups[endR + 1][b.cMax + 1] === nbId) endR++;
      const startPos = (r - b.rMin) / sideLen;
      const endPos = (endR - b.rMin + 1) / sideLen;
      segs.push({ neighborId: nbId, startPos, endPos, midPos: (startPos + endPos) / 2 });
      r = endR + 1;
    }
  } else if (side === 'left') {
    if (b.cMin === 0) return segs;
    const sideLen = b.rMax - b.rMin + 1;
    let r = b.rMin;
    while (r <= b.rMax) {
      const nbId = grid.groups[r][b.cMin - 1];
      if (nbId === pieceId) { r++; continue; }
      let endR = r;
      while (endR + 1 <= b.rMax && grid.groups[endR + 1][b.cMin - 1] === nbId) endR++;
      const startPos = (r - b.rMin) / sideLen;
      const endPos = (endR - b.rMin + 1) / sideLen;
      segs.push({ neighborId: nbId, startPos, endPos, midPos: (startPos + endPos) / 2 });
      r = endR + 1;
    }
  } else if (side === 'bottom') {
    if (b.rMax + 1 >= rows) return segs;
    const sideLen = b.cMax - b.cMin + 1;
    let c = b.cMin;
    while (c <= b.cMax) {
      const nbId = grid.groups[b.rMax + 1][c];
      if (nbId === pieceId) { c++; continue; }
      let endC = c;
      while (endC + 1 <= b.cMax && grid.groups[b.rMax + 1][endC + 1] === nbId) endC++;
      const startPos = (c - b.cMin) / sideLen;
      const endPos = (endC - b.cMin + 1) / sideLen;
      segs.push({ neighborId: nbId, startPos, endPos, midPos: (startPos + endPos) / 2 });
      c = endC + 1;
    }
  } else if (side === 'top') {
    if (b.rMin === 0) return segs;
    const sideLen = b.cMax - b.cMin + 1;
    let c = b.cMin;
    while (c <= b.cMax) {
      const nbId = grid.groups[b.rMin - 1][c];
      if (nbId === pieceId) { c++; continue; }
      let endC = c;
      while (endC + 1 <= b.cMax && grid.groups[b.rMin - 1][endC + 1] === nbId) endC++;
      const startPos = (c - b.cMin) / sideLen;
      const endPos = (endC - b.cMin + 1) / sideLen;
      segs.push({ neighborId: nbId, startPos, endPos, midPos: (startPos + endPos) / 2 });
      c = endC + 1;
    }
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

function assignSide(piece, side, segs, edges, defaultEffect, defaultConfig) {
  const baseKnobType = knobTypeForSide(side);

  // One knob per segment, centered on that segment. Check inversion per-segment.
  const knobs = segs.map((s) => {
    const pairKey = edgeKey(piece.id, s.neighborId);
    const override = edges?.byEdge?.[pairKey];
    let knobType = baseKnobType;
    // Flip this segment's knob if inverted
    if (override?.config?.inverted) {
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
    const override = edges?.byEdge?.[pairKey];
    const effect = override?.effect ?? defaultEffect;
    const config = override?.config ?? defaultConfig;

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

export function listSharedEdges(project) {
  const { grid } = project;
  const bounds = groupBoundsMap(grid);
  const seen = new Set();
  const out = [];
  for (const [id, b] of bounds) {
    // Right neighbors
    if (b.cMax + 1 < grid.cols) {
      let r = b.rMin;
      while (r <= b.rMax) {
        const nbId = grid.groups[r][b.cMax + 1];
        if (nbId === id) { r++; continue; }
        let endR = r;
        while (endR + 1 <= b.rMax && grid.groups[endR + 1][b.cMax + 1] === nbId) endR++;
        const k = edgeKey(id, nbId);
        if (!seen.has(k)) {
          seen.add(k);
          out.push({ pairKey: k, pieceAId: id, sideA: 'right', pieceBId: nbId, sideB: 'left' });
        }
        r = endR + 1;
      }
    }
    // Bottom neighbors
    if (b.rMax + 1 < grid.rows) {
      let c = b.cMin;
      while (c <= b.cMax) {
        const nbId = grid.groups[b.rMax + 1][c];
        if (nbId === id) { c++; continue; }
        let endC = c;
        while (endC + 1 <= b.cMax && grid.groups[b.rMax + 1][endC + 1] === nbId) endC++;
        const k = edgeKey(id, nbId);
        if (!seen.has(k)) {
          seen.add(k);
          out.push({ pairKey: k, pieceAId: id, sideA: 'bottom', pieceBId: nbId, sideB: 'top' });
        }
        c = endC + 1;
      }
    }
  }
  return out;
}

export function listOuterEdges(project) {
  const { grid } = project;
  const bounds = groupBoundsMap(grid);
  const out = [];
  for (const [id, b] of bounds) {
    // Top edge
    if (b.rMin === 0) {
      const pairKey = `${id}||outer-top`;
      out.push({ pairKey, pieceId: id, side: 'top', isOuter: true });
    }
    // Bottom edge
    if (b.rMax + 1 >= grid.rows) {
      const pairKey = `${id}||outer-bottom`;
      out.push({ pairKey, pieceId: id, side: 'bottom', isOuter: true });
    }
    // Left edge
    if (b.cMin === 0) {
      const pairKey = `${id}||outer-left`;
      out.push({ pairKey, pieceId: id, side: 'left', isOuter: true });
    }
    // Right edge
    if (b.cMax + 1 >= grid.cols) {
      const pairKey = `${id}||outer-right`;
      out.push({ pairKey, pieceId: id, side: 'right', isOuter: true });
    }
  }
  return out;
}
