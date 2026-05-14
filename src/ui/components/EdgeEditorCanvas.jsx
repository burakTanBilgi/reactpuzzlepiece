import { useMemo } from 'react';
import { PuzzleBoard, computeSidePath, computePiecePath } from '../../puzzle';
import { computeViewBox } from '../utils/computeViewBox.js';
import { tierHasOverride } from './inspector/cascade-source.js';

const HIT_THICKNESS = 24;
const HIT_HALF = HIT_THICKNESS / 2;
// Perpendicular padding for clip: must cover puzzle knobs (KNOB_R=30) and waves (max ~40).
const PERP_PAD = 60;

const STYLE_PROPS = ['color', 'opacity', 'strokeWidth', 'frequency', 'amplitude', 'inverted'];

// Hit-rect geometry for one edge. `b` is the neighbor piece for inner edges,
// or null for outer edges (then start/end span the full side of `a`).
//
// Output: a rectangle aligned to the edge for pointer-hit detection plus the
// (lx1, ly1, lx2, ly2) endpoints of the edge line itself, used to position
// the clip path that scopes the highlighted stroke.
function edgeHitGeometry(a, b, side) {
  if (side === 'right' || side === 'left') {
    const xLine  = side === 'right' ? a.x + a.w : a.x;
    const yStart = b ? Math.max(a.y, b.y)         : a.y;
    const yEnd   = b ? Math.min(a.y + a.h, b.y + b.h) : a.y + a.h;
    return {
      isVertical: true,
      x: xLine - HIT_HALF, y: yStart, w: HIT_THICKNESS, h: yEnd - yStart,
      lx1: xLine, ly1: yStart, lx2: xLine, ly2: yEnd,
    };
  }
  const yLine  = side === 'bottom' ? a.y + a.h : a.y;
  const xStart = b ? Math.max(a.x, b.x)         : a.x;
  const xEnd   = b ? Math.min(a.x + a.w, b.x + b.w) : a.x + a.w;
  return {
    isVertical: false,
    x: xStart, y: yLine - HIT_HALF, w: xEnd - xStart, h: HIT_THICKNESS,
    lx1: xStart, ly1: yLine, lx2: xEnd, ly2: yLine,
  };
}

// Classify a byEdge entry into style/animation override flags so the canvas
// can paint a distinct dot color for each.
function classifyEdgeOverride(entry) {
  if (!entry) return { style: false, anim: false };
  const style = entry.effect != null
    || STYLE_PROPS.some((k) => entry.config?.[k] != null);
  const anim = entry.effects && Object.keys(entry.effects).length > 0;
  return { style: !!style, anim: !!anim };
}

export default function EdgeEditorCanvas({
  pieces,
  effect,
  effectConfig,
  allEdges,
  selectedEdgeIds,
  onSelectEdge,
  selectedPieceId,
  onSelectPiece,
  edgesByEdge,
  edgesByPiece,
}) {
  const piecesById = useMemo(
    () => new Map(pieces.map((p) => [p.id, p])),
    [pieces]
  );

  const viewBox = useMemo(
    () => computeViewBox(pieces, effect, effectConfig),
    [pieces, effect, effectConfig]
  );

  const hitRects = useMemo(() => {
    const out = [];
    for (const e of allEdges) {
      const entry = edgesByEdge?.[e.pairKey];
      const { style, anim } = classifyEdgeOverride(entry);
      if (e.isOuter) {
        const piece = piecesById.get(e.pieceId);
        if (!piece) continue;
        out.push({
          pairKey: e.pairKey, ...edgeHitGeometry(piece, null, e.side),
          styleOv: style, animOv: anim, isOuter: true, pieceId: e.pieceId, side: e.side,
        });
      } else {
        const a = piecesById.get(e.pieceAId);
        const b = piecesById.get(e.pieceBId);
        if (!a || !b) continue;
        out.push({
          pairKey: e.pairKey, ...edgeHitGeometry(a, b, e.sideA),
          styleOv: style, animOv: anim, isOuter: false,
          pieceAId: e.pieceAId, pieceBId: e.pieceBId, sideA: e.sideA,
        });
      }
    }
    return out;
  }, [allEdges, piecesById, edgesByEdge]);

  // Pieces with any byPiece override — render a dashed inset outline.
  const overriddenPieces = useMemo(() => {
    if (!edgesByPiece) return [];
    return pieces.filter((p) => tierHasOverride(edgesByPiece[p.id]));
  }, [pieces, edgesByPiece]);

  return (
    <div className="edge-canvas edit-canvas--inspector">
      <PuzzleBoard
        pieces={pieces}
        effect={effect}
        effectConfig={effectConfig}
        selectedId={selectedPieceId}
        onSelect={onSelectPiece}
      />
      <svg
        className="edge-canvas__overlay"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        width={viewBox.w}
        height={viewBox.h}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {hitRects.map((r) => {
            const cx = r.isVertical
              ? { x: r.lx1 - PERP_PAD, y: r.ly1, w: PERP_PAD * 2, h: r.ly2 - r.ly1 }
              : { x: r.lx1, y: r.ly1 - PERP_PAD, w: r.lx2 - r.lx1, h: PERP_PAD * 2 };
            return (
              <clipPath key={r.pairKey} id={`ec-clip-${r.pairKey}`}>
                <rect x={cx.x} y={cx.y} width={cx.w} height={cx.h} />
              </clipPath>
            );
          })}
        </defs>

        {/* Piece override outlines (rendered beneath the edge hit overlay). */}
        {overriddenPieces.map((p) => (
          <path
            key={`po-${p.id}`}
            d={computePiecePath(p, pieces, effect, effectConfig)}
            className="piece-override-outline"
          />
        ))}

        {hitRects.map((r) => {
          const selected = selectedEdgeIds?.has(r.pairKey);
          const sidePath = r.isOuter
            ? computeSidePath(piecesById.get(r.pieceId), pieces, r.side, effect, effectConfig)
            : computeSidePath(piecesById.get(r.pieceAId), pieces, r.sideA, effect, effectConfig);

          const overridden = r.styleOv || r.animOv;
          const both       = r.styleOv && r.animOv;
          const mx = (r.lx1 + r.lx2) / 2;
          const my = (r.ly1 + r.ly2) / 2;

          return (
            <g key={r.pairKey}
               className={
                 'edge-hit ' +
                 (selected ? 'edge-hit--selected ' : '') +
                 (overridden ? 'edge-hit--override' : '')
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

              {overridden && !selected && (
                both ? (
                  <>
                    <circle cx={mx - 3} cy={my} r={3}
                      className="edge-override-dot edge-override-dot--combo-a" />
                    <circle cx={mx + 3} cy={my} r={3}
                      className="edge-override-dot edge-override-dot--combo-b" />
                  </>
                ) : (
                  <circle cx={mx} cy={my} r={3.5}
                    className={`edge-override-dot ${r.styleOv ? 'edge-override-dot--style' : 'edge-override-dot--anim'}`} />
                )
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
