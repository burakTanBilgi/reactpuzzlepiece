import { useMemo, useState } from 'react';
import PuzzlePiece from './PuzzlePiece.jsx';
import { computePieceBbox, computePiecePath } from './geometry.js';
import './PuzzleBoard.css';

const STROKE_PAD = 4;

// Renders every piece as a <path> inside a single <svg>, so the outlines
// stay seamless and hover/selection can control z-order trivially.
export default function PuzzleBoard({ pieces, selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);

  const enriched = useMemo(
    () =>
      pieces.map((p) => ({
        ...p,
        path: computePiecePath(p),
        bbox: computePieceBbox(p),
      })),
    [pieces]
  );

  const bbox = useMemo(() => {
    return enriched.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.bbox.minX),
        minY: Math.min(acc.minY, p.bbox.minY),
        maxX: Math.max(acc.maxX, p.bbox.maxX),
        maxY: Math.max(acc.maxY, p.bbox.maxY),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
  }, [enriched]);

  const vbX = bbox.minX - STROKE_PAD;
  const vbY = bbox.minY - STROKE_PAD;
  const vbW = bbox.maxX - bbox.minX + STROKE_PAD * 2;
  const vbH = bbox.maxY - bbox.minY + STROKE_PAD * 2;

  // Selected + hovered pieces render last so their stroke sits on top.
  const ordered = useMemo(() => {
    if (hoveredId == null && selectedId == null) return enriched;
    const promoteIds = [];
    if (selectedId != null) promoteIds.push(selectedId);
    if (hoveredId != null && hoveredId !== selectedId) promoteIds.push(hoveredId);
    const out = enriched.filter((p) => !promoteIds.includes(p.id));
    for (const id of promoteIds) {
      const top = enriched.find((p) => p.id === id);
      if (top) out.push(top);
    }
    return out;
  }, [enriched, hoveredId, selectedId]);

  const handleHoverStart = (id) => setHoveredId(id);
  const handleHoverEnd = (id) =>
    setHoveredId((current) => (current === id ? null : current));

  return (
    <svg
      className="puzzle-board"
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      width={vbW}
      height={vbH}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ordered.map((p) => (
        <PuzzlePiece
          key={p.id}
          piece={p}
          path={p.path}
          isHovered={hoveredId === p.id}
          isSelected={selectedId === p.id}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onSelect={onSelect}
        />
      ))}
    </svg>
  );
}
