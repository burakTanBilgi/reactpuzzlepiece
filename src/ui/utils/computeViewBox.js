import { computePieceBbox } from '../../puzzle';

// Default perpendicular padding around the puzzle for the SVG viewBox.
// Must cover puzzle knobs (KNOB_R = 30) and the tallest wave amplitude (~40).
export const VIEWBOX_PAD = 60;

// Pure: derive a {x,y,w,h} viewBox that snugly encloses every piece's bbox
// (knobs/waves included), padded by `pad` on every side. Returns a 1×1 box
// when there are no pieces — keeps the consuming <svg> valid.
export function computeViewBox(pieces, effect, effectConfig, pad = VIEWBOX_PAD) {
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
    x: bbox.minX - pad,
    y: bbox.minY - pad,
    w: bbox.maxX - bbox.minX + pad * 2,
    h: bbox.maxY - bbox.minY + pad * 2,
  };
}
