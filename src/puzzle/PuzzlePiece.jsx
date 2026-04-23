// Single puzzle piece rendered as an <svg><g> with one <path>.
// Drop it inside a parent <svg> (or use <PuzzleBoard>).

export default function PuzzlePiece({
  piece,
  path,
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
}) {
  const { id, x, y, w, h, label } = piece;
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
    </g>
  );
}
