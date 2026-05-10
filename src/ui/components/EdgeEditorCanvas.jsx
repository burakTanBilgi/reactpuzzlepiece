import { useMemo } from 'react';
import { PuzzleBoard, computePieceBbox, computeSidePath } from '../../puzzle';

const STROKE_PAD = 60;
const HIT_THICKNESS = 24;
// Perpendicular padding for clip: must cover puzzle knobs (KNOB_R=30) and waves (max ~40).
const PERP_PAD = 60;

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

  const hitRects = useMemo(() => {
    const out = [];
    for (const e of allEdges) {
      if (e.isOuter) {
        const piece = piecesById.get(e.pieceId);
        if (!piece) continue;
        let x, y, w, h, lx1, ly1, lx2, ly2;
        if (e.side === 'right') {
          const xLine = piece.x + piece.w;
          x = xLine - HIT_THICKNESS / 2; y = piece.y; w = HIT_THICKNESS; h = piece.h;
          lx1 = lx2 = xLine; ly1 = piece.y; ly2 = piece.y + piece.h;
        } else if (e.side === 'left') {
          const xLine = piece.x;
          x = xLine - HIT_THICKNESS / 2; y = piece.y; w = HIT_THICKNESS; h = piece.h;
          lx1 = lx2 = xLine; ly1 = piece.y; ly2 = piece.y + piece.h;
        } else if (e.side === 'bottom') {
          const yLine = piece.y + piece.h;
          x = piece.x; y = yLine - HIT_THICKNESS / 2; w = piece.w; h = HIT_THICKNESS;
          ly1 = ly2 = yLine; lx1 = piece.x; lx2 = piece.x + piece.w;
        } else {
          const yLine = piece.y;
          x = piece.x; y = yLine - HIT_THICKNESS / 2; w = piece.w; h = HIT_THICKNESS;
          ly1 = ly2 = yLine; lx1 = piece.x; lx2 = piece.x + piece.w;
        }
        out.push({ pairKey: e.pairKey, x, y, w, h, lx1, ly1, lx2, ly2,
          overridden: isOverridden?.(e.pairKey) ?? false,
          isOuter: true, pieceId: e.pieceId, side: e.side });
      } else {
        const a = piecesById.get(e.pieceAId);
        const b = piecesById.get(e.pieceBId);
        if (!a || !b) continue;
        let x, y, w, h, lx1, ly1, lx2, ly2;
        if (e.sideA === 'right') {
          const xLine = a.x + a.w;
          const yStart = Math.max(a.y, b.y);
          const yEnd = Math.min(a.y + a.h, b.y + b.h);
          x = xLine - HIT_THICKNESS / 2; y = yStart; w = HIT_THICKNESS; h = yEnd - yStart;
          lx1 = lx2 = xLine; ly1 = yStart; ly2 = yEnd;
        } else {
          const yLine = a.y + a.h;
          const xStart = Math.max(a.x, b.x);
          const xEnd = Math.min(a.x + a.w, b.x + b.w);
          y = yLine - HIT_THICKNESS / 2; x = xStart; h = HIT_THICKNESS; w = xEnd - xStart;
          ly1 = ly2 = yLine; lx1 = xStart; lx2 = xEnd;
        }
        out.push({ pairKey: e.pairKey, x, y, w, h, lx1, ly1, lx2, ly2,
          overridden: isOverridden?.(e.pairKey) ?? false,
          isOuter: false, pieceAId: e.pieceAId, pieceBId: e.pieceBId, sideA: e.sideA });
      }
    }
    return out;
  }, [allEdges, piecesById, isOverridden]);

  return (
    <div className="edge-canvas">
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={effectConfig} />
      <svg
        className="edge-canvas__overlay"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        width={viewBox.w}
        height={viewBox.h}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clip paths: tight along edge, wide perpendicularly to show knobs/waves. */}
        <defs>
          {hitRects.map((r) => {
            const isVertical = Math.abs(r.lx1 - r.lx2) < 0.1;
            const cx = isVertical
              ? { x: r.lx1 - PERP_PAD, y: r.ly1, w: PERP_PAD * 2, h: r.ly2 - r.ly1 }
              : { x: r.lx1, y: r.ly1 - PERP_PAD, w: r.lx2 - r.lx1, h: PERP_PAD * 2 };
            return (
              <clipPath key={r.pairKey} id={`ec-clip-${r.pairKey}`}>
                <rect x={cx.x} y={cx.y} width={cx.w} height={cx.h} />
              </clipPath>
            );
          })}
        </defs>

        {hitRects.map((r) => {
          const selected = selectedEdgeIds?.has(r.pairKey);
          const sidePath = r.isOuter
            ? computeSidePath(piecesById.get(r.pieceId), pieces, r.side, effect, effectConfig)
            : computeSidePath(piecesById.get(r.pieceAId), pieces, r.sideA, effect, effectConfig);

          return (
            <g key={r.pairKey}
               className={
                 'edge-hit ' +
                 (selected ? 'edge-hit--selected ' : '') +
                 (r.overridden ? 'edge-hit--override' : '')
               }
               onClick={(e) => { e.stopPropagation(); onSelectEdge(r.pairKey, e); }}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} className="edge-hit__hit" />
              {sidePath && (
                <path
                  d={sidePath}
                  className="edge-hit__line"
                  fill="none"
                  clipPath={`url(#ec-clip-${r.pairKey})`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
