// Pure geometry helpers for puzzle pieces.
// No React in this file — it can be used anywhere (tests, SSR, workers…).

export const KNOB_R = 30;
export const KNOB_D = KNOB_R * 2;

export const FLAT = 'flat';
export const TAB = 'tab';
export const SOCKET = 'socket';

// Produce `count` evenly-spaced knob descriptors along a side.
// pos is a fraction in [0, 1] from the side's origin.
export function evenlySpaced(count, type) {
  return Array.from({ length: count }, (_, i) => ({
    pos: (2 * i + 1) / (2 * count),
    type,
  }));
}

// Accept any of the supported side shapes and return a flat
// [{ pos, type }] array of knob descriptors.
export function normalizeSide(side) {
  if (!side || side === FLAT) return [];
  if (side === TAB) return [{ pos: 0.5, type: TAB }];
  if (side === SOCKET) return [{ pos: 0.5, type: SOCKET }];
  if (Array.isArray(side)) {
    return side.map((k) => ({ pos: k.pos, type: k.type }));
  }
  if (typeof side === 'object' && side.count > 0 && side.type) {
    return evenlySpaced(side.count, side.type);
  }
  return [];
}

function hasTab(side) {
  return normalizeSide(side).some((k) => k.type === TAB);
}

function sweepFor(type) {
  return type === TAB ? 1 : 0;
}

// Build a single SVG `d` attribute for a piece.
// Keeps the outline seamless — no internal lines at knob bases.
export function computePiecePath(piece) {
  const { x, y, w, h } = piece;
  const top = normalizeSide(piece.sides?.top);
  const right = normalizeSide(piece.sides?.right);
  const bottom = normalizeSide(piece.sides?.bottom);
  const left = normalizeSide(piece.sides?.left);

  const parts = [`M ${x} ${y}`];

  for (const k of top) {
    const cx = x + k.pos * w;
    parts.push(`L ${cx - KNOB_R} ${y}`);
    parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweepFor(k.type)} ${cx + KNOB_R} ${y}`);
  }
  parts.push(`L ${x + w} ${y}`);

  for (const k of right) {
    const cy = y + k.pos * h;
    parts.push(`L ${x + w} ${cy - KNOB_R}`);
    parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweepFor(k.type)} ${x + w} ${cy + KNOB_R}`);
  }
  parts.push(`L ${x + w} ${y + h}`);

  for (const k of [...bottom].reverse()) {
    const cx = x + k.pos * w;
    parts.push(`L ${cx + KNOB_R} ${y + h}`);
    parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweepFor(k.type)} ${cx - KNOB_R} ${y + h}`);
  }
  parts.push(`L ${x} ${y + h}`);

  for (const k of [...left].reverse()) {
    const cy = y + k.pos * h;
    parts.push(`L ${x} ${cy + KNOB_R}`);
    parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweepFor(k.type)} ${x} ${cy - KNOB_R}`);
  }
  parts.push(`L ${x} ${y}`, 'Z');

  return parts.join(' ');
}

// Bounding box including any outward-pointing tabs, used to pad the viewBox
// so strokes on protruding knobs aren't clipped.
export function computePieceBbox(piece) {
  const { x, y, w, h, sides = {} } = piece;
  const extL = hasTab(sides.left) ? KNOB_R : 0;
  const extR = hasTab(sides.right) ? KNOB_R : 0;
  const extT = hasTab(sides.top) ? KNOB_R : 0;
  const extB = hasTab(sides.bottom) ? KNOB_R : 0;
  return {
    minX: x - extL,
    minY: y - extT,
    maxX: x + w + extR,
    maxY: y + h + extB,
  };
}
