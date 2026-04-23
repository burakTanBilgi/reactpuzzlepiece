// Pure state-manipulation helpers for a puzzle board.
// The board is just an array of piece objects:
//   { id, x, y, w, h, label, sides: { top?, right?, bottom?, left? } }
// A side is { count, type } where type is 'tab' | 'socket' | 'flat'.
// These functions are immutable — they return new arrays/objects.

import { KNOB_D } from './geometry.js';

export const BIG = 400;
export const MIN_DIM = 80;
export const EPS = 0.01;

export const SIDES = ['top', 'right', 'bottom', 'left'];
export const OPPOSITE = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

export const oppositeType = (t) =>
  t === 'tab' ? 'socket' : t === 'socket' ? 'tab' : 'flat';

let _idCounter = 0;
export const makeId = (prefix = 'p') => `${prefix}-${_idCounter++}`;

// --- Default starting layout -------------------------------------------------

export function initialFourPieces(size = BIG) {
  return [
    {
      id: 'tl',
      x: 0, y: 0, w: size, h: size,
      label: 'TL',
      sides: {
        right: { count: 1, type: 'tab' },
        bottom: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'tr',
      x: size, y: 0, w: size, h: size,
      label: 'TR',
      sides: {
        left: { count: 1, type: 'socket' },
        bottom: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'bl',
      x: 0, y: size, w: size, h: size,
      label: 'BL',
      sides: {
        top: { count: 1, type: 'socket' },
        right: { count: 1, type: 'tab' },
      },
    },
    {
      id: 'br',
      x: size, y: size, w: size, h: size,
      label: 'BR',
      sides: {
        top: { count: 1, type: 'socket' },
        left: { count: 1, type: 'socket' },
      },
    },
  ];
}

// --- Queries -----------------------------------------------------------------

export function sideFor(piece, side) {
  return piece?.sides?.[side] ?? { count: 0, type: 'flat' };
}

export function maxKnobsForSide(piece, side) {
  const edge = side === 'left' || side === 'right' ? piece.h : piece.w;
  return Math.max(1, Math.floor(edge / KNOB_D));
}

// All pieces that share the given side of `piece`.
export function findNeighbors(pieces, piece, side) {
  const pid = piece.id;
  if (side === 'right') {
    const x = piece.x + piece.w;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.x - x) < EPS &&
        p.y < piece.y + piece.h - EPS &&
        p.y + p.h > piece.y + EPS
    );
  }
  if (side === 'left') {
    const x = piece.x;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.x + p.w - x) < EPS &&
        p.y < piece.y + piece.h - EPS &&
        p.y + p.h > piece.y + EPS
    );
  }
  if (side === 'bottom') {
    const y = piece.y + piece.h;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.y - y) < EPS &&
        p.x < piece.x + piece.w - EPS &&
        p.x + p.w > piece.x + EPS
    );
  }
  if (side === 'top') {
    const y = piece.y;
    return pieces.filter(
      (p) =>
        p.id !== pid &&
        Math.abs(p.y + p.h - y) < EPS &&
        p.x < piece.x + piece.w - EPS &&
        p.x + p.w > piece.x + EPS
    );
  }
  return [];
}

// True if the piece's edge fully spans the combined extent of its neighbors.
// Used to decide whether a cascade-split is allowed.
export function coversNeighbors(piece, side, neighbors) {
  if (neighbors.length === 0) return true;
  if (side === 'left' || side === 'right') {
    const nMin = Math.min(...neighbors.map((n) => n.y));
    const nMax = Math.max(...neighbors.map((n) => n.y + n.h));
    return piece.y <= nMin + EPS && piece.y + piece.h >= nMax - EPS;
  }
  const nMin = Math.min(...neighbors.map((n) => n.x));
  const nMax = Math.max(...neighbors.map((n) => n.x + n.w));
  return piece.x <= nMin + EPS && piece.x + piece.w >= nMax - EPS;
}

// True if two pieces share exactly the same edge extent on the given side.
export function edgesMatch(piece, neighbor, side) {
  if (side === 'left' || side === 'right') {
    return Math.abs(piece.y - neighbor.y) < EPS && Math.abs(piece.h - neighbor.h) < EPS;
  }
  return Math.abs(piece.x - neighbor.x) < EPS && Math.abs(piece.w - neighbor.w) < EPS;
}

export function piecesInRegion(pieces, region, excludeId) {
  const { xMin, yMin, xMax, yMax } = region;
  return pieces.filter(
    (p) =>
      p.id !== excludeId &&
      p.x >= xMin - EPS &&
      p.y >= yMin - EPS &&
      p.x + p.w <= xMax + EPS &&
      p.y + p.h <= yMax + EPS
  );
}

// --- Mutations ---------------------------------------------------------------

export function updatePiece(pieces, pieceId, updater) {
  return pieces.map((p) => (p.id === pieceId ? updater(p) : p));
}

export function setPieceSide(piece, side, newSide) {
  return { ...piece, sides: { ...piece.sides, [side]: newSide } };
}

// Pick a sensible knob type for the new count.
export function resolveType(piece, side, neighbors, newCount) {
  const current = sideFor(piece, side);
  if (newCount === 0) return 'flat';
  if (current.type !== 'flat') return current.type;
  if (neighbors.length > 0) {
    const nb = neighbors[0];
    const nbSide = sideFor(nb, OPPOSITE[side]);
    if (nbSide.type !== 'flat') return oppositeType(nbSide.type);
  }
  return 'tab';
}

// Cascade split: replace every piece fully contained in the neighbor
// bounding-box with `newCount` sub-pieces that mate with the changing side.
export function splitNeighborsOnSide(pieces, pieceId, side, newCount, knobType) {
  const piece = pieces.find((p) => p.id === pieceId);
  if (!piece) return pieces;
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return pieces;

  const xMin = Math.min(...neighbors.map((n) => n.x));
  const xMax = Math.max(...neighbors.map((n) => n.x + n.w));
  const yMin = Math.min(...neighbors.map((n) => n.y));
  const yMax = Math.max(...neighbors.map((n) => n.y + n.h));

  const region = { xMin, yMin, xMax, yMax };
  const toRemove = piecesInRegion(pieces, region, pieceId);

  const topN = neighbors.find((n) => Math.abs(n.y - yMin) < EPS);
  const bottomN = neighbors.find((n) => Math.abs(n.y + n.h - yMax) < EPS);
  const leftN = neighbors.find((n) => Math.abs(n.x - xMin) < EPS);
  const rightN = neighbors.find((n) => Math.abs(n.x + n.w - xMax) < EPS);

  const mateSide = OPPOSITE[side];
  const oppType = oppositeType(knobType);

  const baseLabel =
    topN?.label || bottomN?.label || leftN?.label || rightN?.label || 'S';

  let rest = pieces.filter((p) => !toRemove.some((n) => n.id === p.id));
  const subs = [];

  const isVerticalSplit = side === 'right' || side === 'left';

  const farSide = side;
  const farN = isVerticalSplit
    ? side === 'right' ? rightN : leftN
    : side === 'bottom' ? bottomN : topN;
  const farOrig = sideFor(farN, farSide);
  const farHasKnobs = farOrig.type !== 'flat' && farOrig.count > 0;

  if (isVerticalSplit) {
    const h = (yMax - yMin) / newCount;
    const w = xMax - xMin;
    if (h < MIN_DIM) return pieces;

    for (let i = 0; i < newCount; i++) {
      const sides = { [mateSide]: { count: 1, type: oppType } };
      if (i === 0) {
        const topSide = sideFor(topN, 'top');
        if (topSide.type !== 'flat') sides.top = topSide;
      } else {
        sides.top = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const botSide = sideFor(bottomN, 'bottom');
        if (botSide.type !== 'flat') sides.bottom = botSide;
      } else {
        sides.bottom = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrig.type };
      }

      subs.push({
        id: makeId('p'),
        x: xMin,
        y: yMin + i * h,
        w,
        h,
        label: newCount === 1 ? baseLabel : `${baseLabel}${i}`,
        sides,
      });
    }
  } else {
    const w = (xMax - xMin) / newCount;
    const h = yMax - yMin;
    if (w < MIN_DIM) return pieces;

    for (let i = 0; i < newCount; i++) {
      const sides = { [mateSide]: { count: 1, type: oppType } };
      if (i === 0) {
        const leftSide = sideFor(leftN, 'left');
        if (leftSide.type !== 'flat') sides.left = leftSide;
      } else {
        sides.left = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const rightSide = sideFor(rightN, 'right');
        if (rightSide.type !== 'flat') sides.right = rightSide;
      } else {
        sides.right = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrig.type };
      }

      subs.push({
        id: makeId('p'),
        x: xMin + i * w,
        y: yMin,
        w,
        h,
        label: newCount === 1 ? baseLabel : `${baseLabel}${i}`,
        sides,
      });
    }
  }

  // Propagate far-side knob count to the piece across the region's far edge,
  // when it exists and spans that edge exactly. Keeps matings consistent.
  if (farHasKnobs) {
    let farFarPiece = null;
    let nearSideOnFarFar = null;

    if (isVerticalSplit) {
      nearSideOnFarFar = OPPOSITE[farSide];
      if (side === 'right') {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.x - xMax) < EPS &&
            Math.abs(p.y - yMin) < EPS &&
            Math.abs(p.y + p.h - yMax) < EPS
        );
      } else {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.x + p.w - xMin) < EPS &&
            Math.abs(p.y - yMin) < EPS &&
            Math.abs(p.y + p.h - yMax) < EPS
        );
      }
    } else {
      nearSideOnFarFar = OPPOSITE[farSide];
      if (side === 'bottom') {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.y - yMax) < EPS &&
            Math.abs(p.x - xMin) < EPS &&
            Math.abs(p.x + p.w - xMax) < EPS
        );
      } else {
        farFarPiece = rest.find(
          (p) =>
            Math.abs(p.y + p.h - yMin) < EPS &&
            Math.abs(p.x - xMin) < EPS &&
            Math.abs(p.x + p.w - xMax) < EPS
        );
      }
    }

    if (farFarPiece) {
      rest = rest.map((p) =>
        p.id === farFarPiece.id
          ? {
              ...p,
              sides: {
                ...p.sides,
                [nearSideOnFarFar]: {
                  count: newCount,
                  type: oppositeType(farOrig.type),
                },
              },
            }
          : p
      );
    }
  }

  return [...rest, ...subs];
}

// High-level "change one side of one piece" transition.
// Returns a new pieces array, performing cascade split when allowed.
export function changeSide(pieces, pieceId, side, newCount, { cascade = true } = {}) {
  const piece = pieces.find((p) => p.id === pieceId);
  if (!piece) return pieces;

  const current = sideFor(piece, side);
  if (current.count === newCount) return pieces;

  const neighbors = findNeighbors(pieces, piece, side);
  const covers = coversNeighbors(piece, side, neighbors);
  const newType = resolveType(piece, side, neighbors, newCount);
  const newSide = { count: newCount, type: newType };

  if (cascade && newCount > 0 && neighbors.length > 0 && covers) {
    let next = splitNeighborsOnSide(pieces, pieceId, side, newCount, newType);
    next = updatePiece(next, pieceId, (p) => setPieceSide(p, side, newSide));
    return next;
  }

  let next = updatePiece(pieces, pieceId, (p) => setPieceSide(p, side, newSide));
  if (neighbors.length === 1 && edgesMatch(piece, neighbors[0], side)) {
    const nb = neighbors[0];
    next = updatePiece(next, nb.id, (p) =>
      setPieceSide(p, OPPOSITE[side], {
        count: newCount,
        type: oppositeType(newType),
      })
    );
  }
  return next;
}
