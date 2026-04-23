const KNOB_R = 30;

const FLAT = 'flat';
const TAB = 'tab';
const SOCKET = 'socket';

function normalizeSide(side) {
  if (!side || side === FLAT) return [];
  if (side === TAB) return [{ pos: 0.5, type: TAB }];
  if (side === SOCKET) return [{ pos: 0.5, type: SOCKET }];
  if (Array.isArray(side)) {
    return side.map((k) => ({ pos: k.pos, type: k.type }));
  }
  return [];
}

function hasTab(side) {
  return normalizeSide(side).some((k) => k.type === TAB);
}

function sweepFor(type) {
  return type === TAB ? 1 : 0;
}

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

export default function PuzzlePiece({ piece, path, isHovered, onHoverStart, onHoverEnd }) {
  const { id, x, y, w, h, label } = piece;
  return (
    <g
      className={`piece ${isHovered ? 'piece--hover' : ''}`}
      onMouseEnter={() => onHoverStart(id)}
      onMouseLeave={() => onHoverEnd(id)}
    >
      <path d={path} className="piece__path" />
      {label && (
        <text x={x + w / 2} y={y + h / 2} className="piece__label">
          {label}
        </text>
      )}
    </g>
  );
}
