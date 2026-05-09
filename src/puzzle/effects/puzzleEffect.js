// Puzzle piece effect: classic interlocking tabs and sockets via SVG arcs.

// Build the path commands for ONE side of a piece.
//   startA, endA: absolute coords along the side's axis
//   fixed:        perpendicular coord of the edge (constant along this side)
//   axis:         'x' for horizontal edges (top/bottom), 'y' for vertical
//   knobs:        normalized knob list [{ pos, type }] in piece-relative pos [0,1]
//   pieceStartA:  absolute coord at pos=0 (so pos*pieceLength gives offset)
//   pieceLength:  length of the side
//   outwardSign:  +1 if outward direction along perpendicular axis is positive
//   KNOB_R:       knob radius
//
// Returns SVG path commands (string), starting with an L command and ending
// at (endA, fixed) — the caller has already moved to (startA, fixed).
function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R) {
  const dir = endA >= startA ? 1 : -1;
  const parts = [];

  // Sort knobs by traversal direction (ascending pos for forward, descending for reverse)
  const sortedKnobs = [...knobs].sort((a, b) => (a.pos - b.pos) * dir);

  for (const k of sortedKnobs) {
    // Use signed delta so the position is correct for both forward (dir=+1)
    // and reverse (dir=-1) traversal. pieceStartA + k.pos*pieceLength goes the
    // wrong direction when startA > endA.
    const knobAxisPos = startA + k.pos * (endA - startA);

    // SVG sweep=1 (CW) curves to the RIGHT of the direction of travel.
    // For a tab (outward bulge):
    //   axis='y' (vertical edge, going down or up): CW curves right (+x) for
    //     downward travel = outward for right edge, and CW curves left (-x) for
    //     upward travel = outward for left edge. Formula: tab → sweep=1. ✓
    //   axis='x' (horizontal edge, going right or left): CW curves down (+y)
    //     for rightward travel = inward for top edge, and CW curves up (-y) for
    //     leftward travel = inward for bottom edge. Formula: tab → sweep=0.
    const sweep = axis === 'y'
      ? (k.type === 'tab' ? 1 : 0)
      : (k.type === 'tab' ? 0 : 1);

    if (axis === 'x') {
      const cx = knobAxisPos;
      parts.push(`L ${cx - dir * KNOB_R} ${fixed}`);
      parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweep} ${cx + dir * KNOB_R} ${fixed}`);
    } else {
      const cy = knobAxisPos;
      parts.push(`L ${fixed} ${cy - dir * KNOB_R}`);
      parts.push(`A ${KNOB_R} ${KNOB_R} 0 0 ${sweep} ${fixed} ${cy + dir * KNOB_R}`);
    }
  }

  // Final segment to side end
  if (axis === 'x') {
    parts.push(`L ${endA} ${fixed}`);
  } else {
    parts.push(`L ${fixed} ${endA}`);
  }

  return parts.join(' ');
}

export const puzzleEffect = {
  name: 'puzzle',
  displayName: 'Puzzle',
  hidesKnobs: false,
  buildSide,
};
