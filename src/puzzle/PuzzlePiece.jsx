import { KNOB_R, TAB, computeKnobs, knobHitCenter } from './geometry.js';

// Single puzzle piece rendered as an <svg><g> with one <path>.
// Drop it inside a parent <svg> (or use <PuzzleBoard>).
//
// Tabs get a small invisible `<circle>` hit-region on top so clicks on a tab
// can be routed to the neighbor across the connection. That's what
// `onKnobClick(pieceId, side, pos)` is for; the board ties it to selection.

const HIT_R = KNOB_R * 0.75;

export default function PuzzlePiece({
  piece,
  path,
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  onKnobClick,
}) {
  const { id, x, y, w, h, label } = piece;
  const knobs = computeKnobs(piece);

  return (
    <g
      className={`piece ${isHovered ? 'piece--hover' : ''} ${isSelected ? 'piece--selected' : ''}`}
      onMouseEnter={() => onHoverStart?.(id)}
      onMouseLeave={() => onHoverEnd?.(id)}
      onClick={() => onSelect?.(id)}
    >
      <path d={path} className="piece__path" />
      {label && (
        <text x={x + w / 2} y={y + h / 2} className="piece__label">
          {label}
        </text>
      )}
      {onKnobClick &&
        knobs
          .filter((k) => k.type === TAB)
          .map((k) => {
            const { hx, hy } = knobHitCenter(k.side, k.cx, k.cy);
            return (
              <circle
                key={`${k.side}-${k.pos}`}
                cx={hx}
                cy={hy}
                r={HIT_R}
                className="piece__knob-hit"
                onClick={(e) => {
                  e.stopPropagation();
                  onKnobClick(id, k.side, k.pos);
                }}
              />
            );
          })}
    </g>
  );
}
