import './PuzzlePiece.css';

const BODY_W = 200;
const BODY_H = 200;
const KNOB_R = 30;

const FLAT = 'flat';
const TAB = 'tab';
const SOCKET = 'socket';

function arc(side, to) {
  const sweep = side === TAB ? 1 : 0;
  return `A ${KNOB_R} ${KNOB_R} 0 0 ${sweep} ${to}`;
}

function buildPath({ top, right, bottom, left }, ox, oy) {
  const x0 = ox;
  const x1 = ox + BODY_W;
  const y0 = oy;
  const y1 = oy + BODY_H;
  const cx = ox + BODY_W / 2;
  const cy = oy + BODY_H / 2;

  const parts = [`M ${x0} ${y0}`];

  parts.push(`L ${cx - KNOB_R} ${y0}`);
  if (top === FLAT) {
    parts.push(`L ${cx + KNOB_R} ${y0}`);
  } else {
    parts.push(arc(top, `${cx + KNOB_R} ${y0}`));
  }
  parts.push(`L ${x1} ${y0}`);

  parts.push(`L ${x1} ${cy - KNOB_R}`);
  if (right === FLAT) {
    parts.push(`L ${x1} ${cy + KNOB_R}`);
  } else {
    parts.push(arc(right, `${x1} ${cy + KNOB_R}`));
  }
  parts.push(`L ${x1} ${y1}`);

  parts.push(`L ${cx + KNOB_R} ${y1}`);
  if (bottom === FLAT) {
    parts.push(`L ${cx - KNOB_R} ${y1}`);
  } else {
    parts.push(arc(bottom, `${cx - KNOB_R} ${y1}`));
  }
  parts.push(`L ${x0} ${y1}`);

  parts.push(`L ${x0} ${cy + KNOB_R}`);
  if (left === FLAT) {
    parts.push(`L ${x0} ${cy - KNOB_R}`);
  } else {
    parts.push(arc(left, `${x0} ${cy - KNOB_R}`));
  }
  parts.push(`L ${x0} ${y0}`, 'Z');

  return parts.join(' ');
}

function normalizeSides(sides = {}) {
  return {
    top: sides.top ?? FLAT,
    right: sides.right ?? FLAT,
    bottom: sides.bottom ?? FLAT,
    left: sides.left ?? FLAT,
  };
}

export default function PuzzlePiece({ sides, label }) {
  const s = normalizeSides(sides);

  const bodyOffsetX = s.left === TAB ? KNOB_R : 0;
  const bodyOffsetY = s.top === TAB ? KNOB_R : 0;
  const svgWidth = BODY_W + bodyOffsetX + (s.right === TAB ? KNOB_R : 0);
  const svgHeight = BODY_H + bodyOffsetY + (s.bottom === TAB ? KNOB_R : 0);

  const d = buildPath(s, bodyOffsetX, bodyOffsetY);
  const viewBox = `0 0 ${svgWidth} ${svgHeight}`;

  return (
    <div
      className="puzzle-piece"
      style={{
        width: svgWidth,
        height: svgHeight,
        top: -bodyOffsetY,
        left: -bodyOffsetX,
      }}
    >
      <svg
        className="puzzle-piece__svg"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path className="puzzle-piece__path" d={d} />
      </svg>
      <span
        className="puzzle-piece__label"
        style={{
          top: bodyOffsetY,
          left: bodyOffsetX,
          width: BODY_W,
          height: BODY_H,
        }}
      >
        {label}
      </span>
    </div>
  );
}
