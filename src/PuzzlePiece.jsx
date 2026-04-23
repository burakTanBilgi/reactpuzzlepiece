import './PuzzlePiece.css';

const BODY_W = 200;
const BODY_H = 200;
const KNOB_R = 30;

function buildPath(type) {
  const cy = BODY_H / 2;
  const top = cy - KNOB_R;
  const bot = cy + KNOB_R;

  if (type === 'tab-right') {
    return [
      `M 0 0`,
      `L ${BODY_W} 0`,
      `L ${BODY_W} ${top}`,
      `A ${KNOB_R} ${KNOB_R} 0 0 1 ${BODY_W} ${bot}`,
      `L ${BODY_W} ${BODY_H}`,
      `L 0 ${BODY_H}`,
      `Z`,
    ].join(' ');
  }

  if (type === 'socket-left') {
    return [
      `M 0 0`,
      `L ${BODY_W} 0`,
      `L ${BODY_W} ${BODY_H}`,
      `L 0 ${BODY_H}`,
      `L 0 ${bot}`,
      `A ${KNOB_R} ${KNOB_R} 0 0 0 0 ${top}`,
      `L 0 0`,
      `Z`,
    ].join(' ');
  }

  return '';
}

function getViewBox(type) {
  if (type === 'tab-right') {
    return `0 0 ${BODY_W + KNOB_R} ${BODY_H}`;
  }
  return `0 0 ${BODY_W} ${BODY_H}`;
}

function getSvgSize(type) {
  if (type === 'tab-right') {
    return { width: BODY_W + KNOB_R, height: BODY_H };
  }
  return { width: BODY_W, height: BODY_H };
}

export default function PuzzlePiece({ type, label }) {
  const d = buildPath(type);
  const viewBox = getViewBox(type);
  const { width, height } = getSvgSize(type);

  return (
    <div
      className={`puzzle-piece puzzle-piece--${type}`}
      style={{ width, height }}
    >
      <svg
        className="puzzle-piece__svg"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path className="puzzle-piece__path" d={d} />
      </svg>
      <span className="puzzle-piece__label">{label}</span>
    </div>
  );
}
