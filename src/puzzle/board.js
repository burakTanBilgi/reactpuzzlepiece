// Pure state-manipulation helpers for a puzzle board.
// The board is an array of piece objects:
//   { id, x, y, w, h, label, sides: { top?, right?, bottom?, left? } }
//
// A side may be any of:
//   - undefined / 'flat'                         → no knobs
//   - { count, type }                            → evenly-spaced uniform knobs
//   - [{ pos, type }, …]                         → mixed / explicit positions
// Use `sideCount`/`sideType` to read any side form.
//
// All functions in this file are immutable — they return new arrays/objects.

import { KNOB_D, normalizeSide } from './geometry.js';

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

// --- Side-form helpers -------------------------------------------------------

// Number of knobs on a side, regardless of storage form.
export function sideCount(side) {
  if (side == null || side === 'flat') return 0;
  if (Array.isArray(side)) return side.length;
  if (side === 'tab' || side === 'socket') return 1;
  if (typeof side === 'object') return side.count ?? 0;
  return 0;
}

// Dominant type on a side: 'tab', 'socket', 'flat', or 'mixed'.
export function sideType(side) {
  if (side == null || side === 'flat') return 'flat';
  if (Array.isArray(side)) {
    if (side.length === 0) return 'flat';
    const first = side[0].type;
    return side.every((k) => k.type === first) ? first : 'mixed';
  }
  if (side === 'tab' || side === 'socket') return side;
  if (typeof side === 'object') {
    if (!side.count) return 'flat';
    return side.type ?? 'flat';
  }
  return 'flat';
}

// Collapse an explicit knob array to { count, type } when all knobs have the
// same type and sit at evenly-spaced positions; otherwise keep the array.
function collapseKnobs(knobs) {
  if (knobs.length === 0) return { count: 0, type: 'flat' };
  const first = knobs[0].type;
  if (!knobs.every((k) => k.type === first)) return knobs;
  const n = knobs.length;
  const even = Array.from({ length: n }, (_, i) => (2 * i + 1) / (2 * n));
  const sorted = [...knobs].sort((a, b) => a.pos - b.pos);
  const allEven = sorted.every((k, i) => Math.abs(k.pos - even[i]) < 1e-4);
  if (allEven) return { count: n, type: first };
  return knobs;
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

// Given a piece, a side, and a normalized position (0..1) of a knob on that
// side, return the neighbor that shares the connection at that knob (or null
// if it's an outer edge).
export function findNeighborAtKnob(pieces, piece, side, pos) {
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return null;
  if (side === 'left' || side === 'right') {
    const y = piece.y + pos * piece.h;
    return (
      neighbors.find((n) => n.y <= y + EPS && n.y + n.h >= y - EPS) ?? null
    );
  }
  const x = piece.x + pos * piece.w;
  return (
    neighbors.find((n) => n.x <= x + EPS && n.x + n.w >= x - EPS) ?? null
  );
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

// Pick a sensible knob type when the count on a side changes.
export function resolveType(piece, side, neighbors, newCount) {
  if (newCount === 0) return 'flat';
  const curType = sideType(sideFor(piece, side));
  if (curType === 'tab' || curType === 'socket') return curType;
  if (neighbors.length > 0) {
    const nbType = sideType(sideFor(neighbors[0], OPPOSITE[side]));
    if (nbType === 'tab' || nbType === 'socket') return oppositeType(nbType);
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
  const farOrigType = sideType(farOrig);
  const farHasKnobs = farOrigType !== 'flat' && sideCount(farOrig) > 0;

  if (isVerticalSplit) {
    const h = (yMax - yMin) / newCount;
    const w = xMax - xMin;
    if (h < MIN_DIM) return pieces;

    for (let i = 0; i < newCount; i++) {
      const sides = { [mateSide]: { count: 1, type: oppType } };
      if (i === 0) {
        const topSide = sideFor(topN, 'top');
        if (sideType(topSide) !== 'flat') sides.top = topSide;
      } else {
        sides.top = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const botSide = sideFor(bottomN, 'bottom');
        if (sideType(botSide) !== 'flat') sides.bottom = botSide;
      } else {
        sides.bottom = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrigType };
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
        if (sideType(leftSide) !== 'flat') sides.left = leftSide;
      } else {
        sides.left = { count: 1, type: 'socket' };
      }
      if (i === newCount - 1) {
        const rightSide = sideFor(rightN, 'right');
        if (sideType(rightSide) !== 'flat') sides.right = rightSide;
      } else {
        sides.right = { count: 1, type: 'tab' };
      }
      if (farHasKnobs) {
        sides[farSide] = { count: 1, type: farOrigType };
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
                  type: oppositeType(farOrigType),
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
  if (sideCount(current) === newCount) return pieces;

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

// --- Knob flip ---------------------------------------------------------------

// Translate a knob position on `piece`'s `side` into the local position along
// `neighbor`'s opposite side (both in 0..1 along their respective edges).
function mapKnobPosToNeighbor(piece, side, pos, neighbor) {
  if (side === 'left' || side === 'right') {
    const absY = piece.y + pos * piece.h;
    return (absY - neighbor.y) / neighbor.h;
  }
  const absX = piece.x + pos * piece.w;
  return (absX - neighbor.x) / neighbor.w;
}

// Flip the type of a specific knob on a side. Returns the new side and a
// `flipped` flag. Returns the input side unchanged when no matching knob is
// found or the knob is 'flat'.
function flipKnobInSide(side, pos) {
  const knobs = normalizeSide(side);
  if (knobs.length === 0) return { newSide: side, flipped: false };

  let bestIdx = 0;
  let bestDist = Math.abs(knobs[0].pos - pos);
  for (let i = 1; i < knobs.length; i++) {
    const d = Math.abs(knobs[i].pos - pos);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  // The nearest knob must actually be close (half an average gap).
  const tol = 0.5 / knobs.length + 1e-3;
  if (bestDist > tol) return { newSide: side, flipped: false };

  const knob = knobs[bestIdx];
  const newType = oppositeType(knob.type);
  if (newType === knob.type || newType === 'flat') {
    return { newSide: side, flipped: false };
  }

  const newKnobs = knobs.map((k, i) =>
    i === bestIdx ? { pos: k.pos, type: newType } : { pos: k.pos, type: k.type }
  );
  return { newSide: collapseKnobs(newKnobs), flipped: true };
}

// Flip the ownership of a single knob: the piece that owned the tab now owns
// the socket, and vice versa. Updates both sides of the connection. Does
// nothing for outer-edge knobs (no neighbor).
export function flipKnob(pieces, pieceId, side, pos) {
  const piece = pieces.find((p) => p.id === pieceId);
  if (!piece) return pieces;

  const neighbor = findNeighborAtKnob(pieces, piece, side, pos);
  if (!neighbor) return pieces;

  const pieceResult = flipKnobInSide(sideFor(piece, side), pos);
  if (!pieceResult.flipped) return pieces;

  const nbPos = mapKnobPosToNeighbor(piece, side, pos, neighbor);
  const nbSideName = OPPOSITE[side];
  const nbResult = flipKnobInSide(sideFor(neighbor, nbSideName), nbPos);

  let next = updatePiece(pieces, pieceId, (p) =>
    setPieceSide(p, side, pieceResult.newSide)
  );
  if (nbResult.flipped) {
    next = updatePiece(next, neighbor.id, (p) =>
      setPieceSide(p, nbSideName, nbResult.newSide)
    );
  }
  return next;
}
