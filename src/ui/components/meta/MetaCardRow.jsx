import { useMemo } from 'react';
import { compileProject } from '../../../grid/compile.js';
import { PuzzleBoard, computePieceBbox } from '../../../puzzle';

const WAVE_CFG = { frequency: 0.022, amplitude: 10 };
const CELL_SIZE = 220;

// Renders a row (or grid) of cards as a real Hakoniwa project: each card is
// a piece, joined to its neighbours by the wave effect. The puzzle silhouette
// is the SVG below; the icon / title / body / click target sit on top as
// HTML inside an absolute-positioned overlay aligned to each piece's bbox.
//
// Props:
//   cards — Array<{ id, icon?, title, body, onClick? }>
//   rows  — grid rows (default 1)
//   cols  — grid cols (default cards.length / rows)
export default function MetaCardRow({ cards, rows = 1, cols }) {
  const nCols = cols ?? Math.ceil(cards.length / rows);

  // Build a synthetic Hakoniwa project: one cell per card, wave-joined.
  // Each cell takes a stable id (the card's `id`) so clicks map back trivially.
  const project = useMemo(() => {
    const groups = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: nCols }, (_, c) => {
        const idx = r * nCols + c;
        return cards[idx]?.id ?? `meta-empty-${r}-${c}`;
      })
    );
    return {
      grid: { rows, cols: nCols, cellSize: CELL_SIZE, groups },
      edges: {
        default: { effect: 'wave', config: WAVE_CFG },
        inner: null, outer: null, byPiece: {}, byEdge: {},
      },
      pieceColors: {},
      pieceContent: {},
      backgrounds: [],
    };
  }, [cards, rows, nCols]);

  const pieces = useMemo(() => compileProject(project), [project]);

  // Compute the SVG viewBox the same way PuzzleBoard does so the overlay
  // coordinates line up exactly with the rendered SVG. We need the same
  // STROKE_PAD it uses (60px — see PuzzleBoard.jsx).
  const STROKE_PAD = 60;
  const bbox = useMemo(() => {
    const init = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    return pieces.reduce((acc, p) => {
      const b = computePieceBbox(p, pieces, 'wave', WAVE_CFG);
      return {
        minX: Math.min(acc.minX, b.minX),
        minY: Math.min(acc.minY, b.minY),
        maxX: Math.max(acc.maxX, b.maxX),
        maxY: Math.max(acc.maxY, b.maxY),
      };
    }, init);
  }, [pieces]);

  const vbX = bbox.minX - STROKE_PAD;
  const vbY = bbox.minY - STROKE_PAD;
  const vbW = bbox.maxX - bbox.minX + STROKE_PAD * 2;
  const vbH = bbox.maxY - bbox.minY + STROKE_PAD * 2;

  // Map each card to its piece, then to a percent rect inside the SVG box
  // so absolute-positioned HTML overlays scale with the SVG (which itself
  // is responsive via CSS width: 100%).
  const piecesById = useMemo(() => new Map(pieces.map((p) => [p.id, p])), [pieces]);

  return (
    <div className="meta-card-row" data-cols={nCols} data-rows={rows}>
      <div className="meta-card-row__svg">
        <PuzzleBoard pieces={pieces} effect="wave" effectConfig={WAVE_CFG} />
      </div>
      <div className="meta-card-row__overlay" style={{ aspectRatio: `${vbW} / ${vbH}` }}>
        {cards.map((card) => {
          const piece = piecesById.get(card.id);
          if (!piece) return null;
          const left   = ((piece.x - vbX) / vbW) * 100;
          const top    = ((piece.y - vbY) / vbH) * 100;
          const width  = (piece.w / vbW) * 100;
          const height = (piece.h / vbH) * 100;
          const Tag = card.onClick ? 'button' : 'div';
          return (
            <Tag
              key={card.id}
              type={card.onClick ? 'button' : undefined}
              onClick={card.onClick}
              className={`meta-card${card.onClick ? ' meta-card--clickable' : ''}`}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            >
              {card.icon && <span className="meta-card__icon" aria-hidden="true">{card.icon}</span>}
              <span className="meta-card__title">{card.title}</span>
              {card.body && <span className="meta-card__body">{card.body}</span>}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
