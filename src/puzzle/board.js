// Minimal board helpers consumed by `geometry.js` for path building.
// (The high-level state model now lives in `src/grid/`; pieces are derived
// from a Project via `compileProject`.)

export const EPS = 0.01;

// All pieces that share the given side of `piece`.
export function findNeighbors(pieces, piece, side) {
  const pid = piece.id;
  if (side === 'right') {
    const x = piece.x + piece.w;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'left') {
    const x = piece.x;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x + p.w - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'bottom') {
    const y = piece.y + piece.h;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  if (side === 'top') {
    const y = piece.y;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y + p.h - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  return [];
}

// Sub-edges of a side, one per neighbor (or one outer span).
export function findEdgeSegments(pieces, piece, side) {
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return [{ startPos: 0, endPos: 1, neighborId: null }];

  const isVertical = side === 'left' || side === 'right';
  const sideLen = isVertical ? piece.h : piece.w;
  const sideStart = isVertical ? piece.y : piece.x;

  const ranges = neighbors
    .map((nb) => {
      const nbStart = isVertical ? nb.y : nb.x;
      const nbEnd = isVertical ? nb.y + nb.h : nb.x + nb.w;
      const overlapStart = Math.max(sideStart, nbStart);
      const overlapEnd = Math.min(sideStart + sideLen, nbEnd);
      return {
        startPos: (overlapStart - sideStart) / sideLen,
        endPos: (overlapEnd - sideStart) / sideLen,
        neighborId: nb.id,
      };
    })
    .sort((a, b) => a.startPos - b.startPos);

  const segments = [];
  let cursor = 0;
  for (const r of ranges) {
    if (r.startPos > cursor + 1e-4) {
      segments.push({ startPos: cursor, endPos: r.startPos, neighborId: null });
    }
    segments.push(r);
    cursor = r.endPos;
  }
  if (cursor < 1 - 1e-4) {
    segments.push({ startPos: cursor, endPos: 1, neighborId: null });
  }
  return segments;
}

// Effect lookup chain for a single segment.
export function effectForSegment(piece, side, neighborId, defaultEffect = 'puzzle') {
  const key = neighborId || '__outer';
  return (
    piece?.edgeEffects?.[side]?.[key] ??
    piece?.sideEffects?.[side] ??
    piece?.effect ??
    defaultEffect
  );
}
