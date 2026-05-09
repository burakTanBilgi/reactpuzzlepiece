// Compile a Project (grid + edges) into the pieces array consumed by
// `PuzzleBoard`. The compile output uses the existing piece data shape so the
// rendering pipeline doesn't change.

import { groupBoundsMap } from './grid.js';

const SIDES = ['top', 'right', 'bottom', 'left'];

// --- Edge keys ---------------------------------------------------------------
//
// Two pieces share an edge iff they touch along a line. We key each shared
// edge by the (smaller, larger) groupId pair so it's stable regardless of
// which piece you ask from.
//
//   edgeKey('a', 'b') === edgeKey('b', 'a')   →  'a||b'
//

export function edgeKey(idA, idB) {
  return idA < idB ? `${idA}||${idB}` : `${idB}||${idA}`;
}

// --- Compile -----------------------------------------------------------------

export function compileProject(project) {
  const { grid, edges } = project;
  const cellSize = grid.cellSize;
  const bounds = groupBoundsMap(grid);

  // 1. Build pieces (one per group).
  const pieces = [];
  const piecesById = new Map();
  for (const [id, b] of bounds) {
    const p = {
      id,
      x: b.cMin * cellSize,
      y: b.rMin * cellSize,
      w: (b.cMax - b.cMin + 1) * cellSize,
      h: (b.rMax - b.rMin + 1) * cellSize,
      label: id.startsWith('g-') ? id.slice(2) : id.split('-')[0],
      sides: {},
      sideEffects: {},
      sideEffectConfigs: {},
      edgeEffects: {},
    };
    pieces.push(p);
    piecesById.set(id, p);
  }

  // 2. Walk each group and detect shared edges with its neighbors.
  //    For each unique pair, set:
  //      - sides[*] on both pieces (one side gets a tab, the matching side a socket)
  //      - sideEffects[*] from edges.byEdge[key] || edges.default
  //      - sideEffectConfigs[*] from the same lookup
  const seenPairs = new Set();
  const defaultEffect = edges?.default?.effect ?? 'puzzle';
  const defaultConfig = edges?.default?.config;

  for (const [id, b] of bounds) {
    const piece = piecesById.get(id);

    // Right edge: scan cells along the right column of this group.
    for (let r = b.rMin; r <= b.rMax; r++) {
      const cRight = b.cMax + 1;
      if (cRight >= grid.cols) continue;
      const nbId = grid.groups[r][cRight];
      const nbPiece = piecesById.get(nbId);
      if (!nbPiece || nbId === id) continue;
      const pairKey = edgeKey(id, nbId);
      if (seenPairs.has(pairKey)) continue;
      seenPairs.add(pairKey);
      applyEdge(piece, 'right', nbPiece, 'left', edges, defaultEffect, defaultConfig, pairKey);
    }
    // Bottom edge.
    for (let c = b.cMin; c <= b.cMax; c++) {
      const rBot = b.rMax + 1;
      if (rBot >= grid.rows) continue;
      const nbId = grid.groups[rBot][c];
      const nbPiece = piecesById.get(nbId);
      if (!nbPiece || nbId === id) continue;
      const pairKey = edgeKey(id, nbId);
      if (seenPairs.has(pairKey)) continue;
      seenPairs.add(pairKey);
      applyEdge(piece, 'bottom', nbPiece, 'top', edges, defaultEffect, defaultConfig, pairKey);
    }
  }

  return pieces;
}

function applyEdge(pieceA, sideA, pieceB, sideB, edges, defEffect, defConfig, pairKey) {
  // Always: top/left piece gets the tab, bottom/right piece gets the socket.
  pieceA.sides[sideA] = { count: 1, type: 'tab' };
  pieceB.sides[sideB] = { count: 1, type: 'socket' };

  const override = edges?.byEdge?.[pairKey];
  const effect = override?.effect ?? defEffect;
  const config = override?.config ?? defConfig;

  pieceA.sideEffects[sideA] = effect;
  pieceB.sideEffects[sideB] = effect;
  if (config) {
    pieceA.sideEffectConfigs[sideA] = config;
    pieceB.sideEffectConfigs[sideB] = config;
  }
}

// --- Edge enumeration (for the Edge Editor's edge picker) -------------------

// Returns [{ pairKey, pieceAId, sideA, pieceBId, sideB }] — every shared edge.
export function listSharedEdges(project) {
  const { grid } = project;
  const bounds = groupBoundsMap(grid);
  const seen = new Set();
  const out = [];
  for (const [id, b] of bounds) {
    for (let r = b.rMin; r <= b.rMax; r++) {
      const cRight = b.cMax + 1;
      if (cRight >= grid.cols) continue;
      const nbId = grid.groups[r][cRight];
      if (nbId === id) continue;
      const k = edgeKey(id, nbId);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ pairKey: k, pieceAId: id, sideA: 'right', pieceBId: nbId, sideB: 'left' });
    }
    for (let c = b.cMin; c <= b.cMax; c++) {
      const rBot = b.rMax + 1;
      if (rBot >= grid.rows) continue;
      const nbId = grid.groups[rBot][c];
      if (nbId === id) continue;
      const k = edgeKey(id, nbId);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ pairKey: k, pieceAId: id, sideA: 'bottom', pieceBId: nbId, sideB: 'top' });
    }
  }
  return out;
}
