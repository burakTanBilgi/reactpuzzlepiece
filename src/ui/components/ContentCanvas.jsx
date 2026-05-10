import { useMemo } from 'react';
import { PuzzleBoard, computePieceBbox } from '../../puzzle';

const STROKE_PAD = 60;

// Shows the puzzle board with a transparent overlay that lets the user click
// any piece to select it. Selected piece gets a colored ring.
export default function ContentCanvas({
  pieces,
  effect,
  effectConfig,
  selectedId,
  onSelectPiece,
}) {
  const viewBox = useMemo(() => {
    if (pieces.length === 0) return { x: 0, y: 0, w: 1, h: 1 };
    const bbox = pieces.reduce(
      (acc, p) => {
        const b = computePieceBbox(p, pieces, effect, effectConfig);
        return {
          minX: Math.min(acc.minX, b.minX),
          minY: Math.min(acc.minY, b.minY),
          maxX: Math.max(acc.maxX, b.maxX),
          maxY: Math.max(acc.maxY, b.maxY),
        };
      },
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
    return {
      x: bbox.minX - STROKE_PAD,
      y: bbox.minY - STROKE_PAD,
      w: bbox.maxX - bbox.minX + STROKE_PAD * 2,
      h: bbox.maxY - bbox.minY + STROKE_PAD * 2,
    };
  }, [pieces, effect, effectConfig]);

  return (
    <div className="content-canvas">
      <PuzzleBoard
        pieces={pieces}
        selectedId={selectedId}
        effect={effect}
        effectConfig={effectConfig}
        onSelect={onSelectPiece}
      />
      <svg
        className="content-canvas__overlay"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        width={viewBox.w}
        height={viewBox.h}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
    </div>
  );
}
