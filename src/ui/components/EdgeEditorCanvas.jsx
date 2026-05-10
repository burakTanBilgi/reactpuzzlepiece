import { useMemo } from 'react';
import { PuzzleBoard, computePieceBbox, computeSidePath } from '../../puzzle';

const STROKE_PAD = 60;       // padding for wave effects (max amplitude ~40 + margin)
const HIT_THICKNESS = 24;    // px-thick interactive hit area along an edge

// Renders the puzzle board plus an interactive overlay where every shared
// edge is a clickable thin rectangle. Hovering shows a faint outline; selected
// edges get a bright accent.
//
// Props:
//   pieces, effect, effectConfig — passed through to PuzzleBoard
//   sharedEdges                  — listSharedEdges(project) output
//   selectedEdgeIds              — Set<pairKey>
//   onSelectEdge(pairKey, e)     — click handler (e for shift-key detection)
//   isOverridden(pairKey)        — boolean — to dim/highlight overridden edges
export default function EdgeEditorCanvas({
  pieces,
  effect,
  effectConfig,
  allEdges,
  selectedEdgeIds,
  onSelectEdge,
  isOverridden,
}) {
  const piecesById = useMemo(
    () => new Map(pieces.map((p) => [p.id, p])),
    [pieces]
  );

  // Match the PuzzleBoard's viewBox so the overlay coordinates align.
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

  // Compute a hit rect (in world coords) for every edge (shared or outer).
  const hitRects = useMemo(() => {
    const out = [];
    for (const e of allEdges) {
      if (e.isOuter) {
        // Outer edge: single piece
        const piece = piecesById.get(e.pieceId);
        if (!piece) continue;

        let x, y, w, h, lx1, ly1, lx2, ly2;
        if (e.side === 'right') {
          const xLine = piece.x + piece.w;
          y = piece.y;
          h = piece.h;
          x = xLine - HIT_THICKNESS / 2;
          w = HIT_THICKNESS;
          lx1 = lx2 = xLine; ly1 = piece.y; ly2 = piece.y + piece.h;
        } else if (e.side === 'left') {
          const xLine = piece.x;
          y = piece.y;
          h = piece.h;
          x = xLine - HIT_THICKNESS / 2;
          w = HIT_THICKNESS;
          lx1 = lx2 = xLine; ly1 = piece.y; ly2 = piece.y + piece.h;
        } else if (e.side === 'bottom') {
          const yLine = piece.y + piece.h;
          x = piece.x;
          w = piece.w;
          y = yLine - HIT_THICKNESS / 2;
          h = HIT_THICKNESS;
          ly1 = ly2 = yLine; lx1 = piece.x; lx2 = piece.x + piece.w;
        } else if (e.side === 'top') {
          const yLine = piece.y;
          x = piece.x;
          w = piece.w;
          y = yLine - HIT_THICKNESS / 2;
          h = HIT_THICKNESS;
          ly1 = ly2 = yLine; lx1 = piece.x; lx2 = piece.x + piece.w;
        }

        out.push({
          pairKey: e.pairKey,
          x, y, w, h,
          lx1, ly1, lx2, ly2,
          overridden: isOverridden?.(e.pairKey) ?? false,
          isOuter: true,
          pieceId: e.pieceId,
          side: e.side,
        });
      } else {
        // Shared edge: two pieces
        const a = piecesById.get(e.pieceAId);
        const b = piecesById.get(e.pieceBId);
        if (!a || !b) continue;

        let x, y, w, h, lx1, ly1, lx2, ly2;
        if (e.sideA === 'right') {
          const xLine = a.x + a.w;
          const yStart = Math.max(a.y, b.y);
          const yEnd = Math.min(a.y + a.h, b.y + b.h);
          x = xLine - HIT_THICKNESS / 2;
          y = yStart;
          w = HIT_THICKNESS;
          h = yEnd - yStart;
          lx1 = lx2 = xLine; ly1 = yStart; ly2 = yEnd;
        } else { // sideA === 'bottom'
          const yLine = a.y + a.h;
          const xStart = Math.max(a.x, b.x);
          const xEnd = Math.min(a.x + a.w, b.x + b.w);
          y = yLine - HIT_THICKNESS / 2;
          x = xStart;
          h = HIT_THICKNESS;
          w = xEnd - xStart;
          ly1 = ly2 = yLine; lx1 = xStart; lx2 = xEnd;
        }

        out.push({
          pairKey: e.pairKey,
          x, y, w, h,
          lx1, ly1, lx2, ly2,
          overridden: isOverridden?.(e.pairKey) ?? false,
          isOuter: false,
          pieceAId: e.pieceAId,
          pieceBId: e.pieceBId,
          sideA: e.sideA,
          sideB: e.sideB,
        });
      }
    }
    return out;
  }, [allEdges, piecesById, isOverridden]);

  return (
    <div className="edge-canvas">
      <PuzzleBoard
        pieces={pieces}
        effect={effect}
        effectConfig={effectConfig}
      />
      {/* Overlay must match PuzzleBoard's viewBox + size exactly. */}
      <svg
        className="edge-canvas__overlay"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        width={viewBox.w}
        height={viewBox.h}
        xmlns="http://www.w3.org/2000/svg"
      >
        {hitRects.map((r) => {
          const selected = selectedEdgeIds?.has(r.pairKey);
          // Compute just the relevant side's path (not the whole piece)
          const getSidePath = () => {
            if (r.isOuter) {
              const piece = piecesById.get(r.pieceId);
              if (piece) return computeSidePath(piece, pieces, r.side, effect, effectConfig);
            } else {
              const pieceA = piecesById.get(r.pieceAId);
              if (pieceA) return computeSidePath(pieceA, pieces, r.sideA, effect, effectConfig);
            }
            return null;
          };
          const sidePath = getSidePath();

          return (
            <g key={r.pairKey}
               className={
                 'edge-hit ' +
                 (selected ? 'edge-hit--selected ' : '') +
                 (r.overridden ? 'edge-hit--override' : '')
               }
               onClick={(e) => { e.stopPropagation(); onSelectEdge(r.pairKey, e); }}>
              {/* Invisible thick rect for forgiving click target — first in DOM
                  so siblings can react to its :hover via the ~ combinator. */}
              <rect
                x={r.x} y={r.y} width={r.w} height={r.h}
                className="edge-hit__hit"
              />
              {/* Visible accent line using the actual side path (CSS shows it on hover/selected). */}
              {sidePath && (
                <path
                  d={sidePath}
                  className="edge-hit__line"
                  fill="none"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
