// Straight effect: simple straight line, no knobs.

function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, config) {
  if (axis === 'x') return `L ${endA} ${fixed}`;
  return `L ${fixed} ${endA}`;
}

export const straightEffect = {
  name: 'straight',
  displayName: 'Straight',
  hidesKnobs: true,
  buildSide,
};
