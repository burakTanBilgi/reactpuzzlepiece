// Pure geometry helpers for puzzle pieces.
// No React in this file — it can be used anywhere (tests, SSR, workers…).

import { puzzleEffect } from './effects/puzzleEffect.js';
import { waveEffect } from './effects/waveEffect.js';
import { straightEffect } from './effects/straightEffect.js';
import { effectForSegment, findEdgeSegments } from './board.js';

export const KNOB_R = 30;
export const KNOB_D = KNOB_R * 2;

export const FLAT = 'flat';
export const TAB = 'tab';
export const SOCKET = 'socket';

export const EFFECTS = {
  puzzle: puzzleEffect,
  wave: waveEffect,
  straight: straightEffect,
};

export const EFFECT_NAMES = Object.keys(EFFECTS);

const POS_EPS = 1e-4;

export function evenlySpaced(count, type) {
  return Array.from({ length: count }, (_, i) => ({
    pos: (2 * i + 1) / (2 * count),
    type,
  }));
}

export function normalizeSide(side) {
  if (!side || side === FLAT) return [];
  if (side === TAB) return [{ pos: 0.5, type: TAB }];
  if (side === SOCKET) return [{ pos: 0.5, type: SOCKET }];
  if (Array.isArray(side)) {
    return side.map((k) => ({ pos: k.pos, type: k.type }));
  }
  if (typeof side === 'object' && side.count > 0 && side.type) {
    return evenlySpaced(side.count, side.type);
  }
  return [];
}

function hasTab(side) {
  return normalizeSide(side).some((k) => k.type === TAB);
}

// Build the path for one side, splitting into segments based on neighbors and
// applying the effect configured for each segment.
function buildSidePath({
  piece,
  allPieces,
  sideName,
  startA,
  endA,
  fixed,
  axis,
  pieceStartA,
  pieceLength,
  knobs,
  outwardSign,
  defaultEffect,
  effectConfig,
}) {
  const dir = endA >= startA ? 1 : -1;

  // Without pieces context, treat as one segment with the whole-side effect.
  if (!allPieces) {
    const effect = piece.sideEffects?.[sideName] || piece.effect || defaultEffect || 'puzzle';
    const fx = EFFECTS[effect] || EFFECTS.puzzle;
    return fx.buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, effectConfig);
  }

  const segments = findEdgeSegments(allPieces, piece, sideName);
  const ordered = dir > 0 ? segments : [...segments].reverse();
  const parts = [];

  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    // Per-segment config shadows per-side, which shadows global.
    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = pieceStartA + seg.startPos * pieceLength;
    const segEndAbs = pieceStartA + seg.endPos * pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd = dir > 0 ? segEndAbs : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    // Pick the knob whose position is INSIDE this segment (strict, no epsilon
    // on segment boundaries — boundary-point knobs are an artifact of single
    // whole-side knobs and would render twice).
    const segKnobs = knobs
      .filter((k) =>
        k.pos > seg.startPos + POS_EPS &&
        k.pos < seg.endPos - POS_EPS
      )
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    parts.push(
      fx.buildSide(segStart, segEnd, fixed, axis, segKnobs, segStart, segLen, outwardSign, KNOB_R, segConfig)
    );
  }
  return parts.join(' ');
}

// Build a single SVG `d` attribute for a piece. Each side may be split into
// segments (one per neighbor), and each segment can use a different effect.
export function computePiecePath(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const parts = [`M ${x} ${y}`];

  parts.push(buildSidePath({
    piece, allPieces, sideName: 'top',
    startA: x, endA: x + w, fixed: y, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.top,
    outwardSign: -1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'right',
    startA: y, endA: y + h, fixed: x + w, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.right,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'bottom',
    startA: x + w, endA: x, fixed: y + h, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'left',
    startA: y + h, endA: y, fixed: x, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.left,
    outwardSign: -1, defaultEffect, effectConfig,
  }));

  parts.push('Z');
  return parts.join(' ');
}

export function computeKnobs(piece) {
  const { x, y, w, h } = piece;
  const knobs = [];
  for (const k of normalizeSide(piece.sides?.top)) {
    knobs.push({ side: 'top', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y });
  }
  for (const k of normalizeSide(piece.sides?.right)) {
    knobs.push({ side: 'right', type: k.type, pos: k.pos, cx: x + w, cy: y + k.pos * h });
  }
  for (const k of normalizeSide(piece.sides?.bottom)) {
    knobs.push({ side: 'bottom', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y + h });
  }
  for (const k of normalizeSide(piece.sides?.left)) {
    knobs.push({ side: 'left', type: k.type, pos: k.pos, cx: x, cy: y + k.pos * h });
  }
  return knobs;
}

// Active knobs respect per-segment effect: a knob sitting in a wave/straight
// segment is hidden, but a knob in a puzzle segment on the same side stays.
export function computeActiveKnobs(piece, allPieces, defaultEffect = 'puzzle') {
  return computeKnobs(piece).filter((k) => {
    if (!allPieces) {
      const effect = piece.sideEffects?.[k.side] || piece.effect || defaultEffect;
      return !EFFECTS[effect]?.hidesKnobs;
    }
    const segments = findEdgeSegments(allPieces, piece, k.side);
    const seg = segments.find((s) => k.pos >= s.startPos - POS_EPS && k.pos <= s.endPos + POS_EPS);
    if (!seg) return false;
    const effect = effectForSegment(piece, k.side, seg.neighborId, defaultEffect);
    return !EFFECTS[effect]?.hidesKnobs;
  });
}

const HIT_OFFSET = KNOB_R * 0.5;

export function knobHitCenter(side, cx, cy) {
  if (side === 'top') return { hx: cx, hy: cy - HIT_OFFSET };
  if (side === 'bottom') return { hx: cx, hy: cy + HIT_OFFSET };
  if (side === 'left') return { hx: cx - HIT_OFFSET, hy: cy };
  return { hx: cx + HIT_OFFSET, hy: cy };
}

// Bounding box including effect-specific extents.
// Export buildSidePath for use in overlays that need to render edge paths.
export { buildSidePath };

// Compute the SVG path for a single side of a piece (for edge highlighting overlays).
export function computeSidePath(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const sideConfigs = {
    top: { startA: x, endA: x + w, fixed: y, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.top, outwardSign: -1, startPoint: `${x} ${y}` },
    right: { startA: y, endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.right, outwardSign: +1, startPoint: `${x + w} ${y}` },
    bottom: { startA: x + w, endA: x, fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom, outwardSign: +1, startPoint: `${x + w} ${y + h}` },
    left: { startA: y + h, endA: y, fixed: x, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.left, outwardSign: -1, startPoint: `${x} ${y + h}` },
  };

  const cfg = sideConfigs[sideName];
  if (!cfg) return '';

  const { startPoint, ...buildCfg } = cfg;
  const sidePath = buildSidePath({
    piece, allPieces, sideName,
    ...buildCfg,
    defaultEffect, effectConfig,
  });

  return `M ${startPoint} ${sidePath}`;
}


// Per-segment paths for one side. Each entry is a self-contained `<path d>`
// so it can be stroked independently (with its own color/opacity/width).
//
//   [{ neighborId, pairKey, d, style: { color?, opacity?, strokeWidth? } }]
//
// `pairKey` is the same key the project's edge map uses, so callers don't have
// to know whether the segment is a shared edge or an outer one.
export function computeSideSegments(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = normalizeSide(piece.sides?.[sideName]) || [];

  const sideConfigs = {
    top:    { startA: x,     endA: x + w, fixed: y,     axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: -1, startPoint: [x, y] },
    right:  { startA: y,     endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: +1, startPoint: [x + w, y] },
    bottom: { startA: x + w, endA: x,     fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: +1, startPoint: [x + w, y + h] },
    left:   { startA: y + h, endA: y,     fixed: x,     axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: -1, startPoint: [x, y + h] },
  };
  const cfg = sideConfigs[sideName];
  if (!cfg) return [];

  const dir = cfg.endA >= cfg.startA ? 1 : -1;
  const segments = allPieces
    ? findEdgeSegments(allPieces, piece, sideName)
    : [{ startPos: 0, endPos: 1, neighborId: null }];
  const ordered = dir > 0 ? segments : [...segments].reverse();

  const out = [];
  let cursorA = cfg.startA;          // current position along the side axis
  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = cfg.pieceStartA + seg.startPos * cfg.pieceLength;
    const segEndAbs   = cfg.pieceStartA + seg.endPos   * cfg.pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd   = dir > 0 ? segEndAbs   : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    const segKnobs = sidesNorm
      .filter((k) => k.pos > seg.startPos + POS_EPS && k.pos < seg.endPos - POS_EPS)
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    const inner = fx.buildSide(
      segStart, segEnd, cfg.fixed, cfg.axis,
      segKnobs, segStart, segLen, cfg.outwardSign, KNOB_R, segConfig
    );

    // Build the M command for the start of THIS segment along the axis.
    const sx = cfg.axis === 'x' ? cursorA : cfg.fixed;
    const sy = cfg.axis === 'y' ? cursorA : cfg.fixed;
    const d = `M ${sx} ${sy} ${inner}`;

    cursorA += dir * segLen;

    const pairKey = seg.neighborId
      ? edgeKeyOf(piece.id, seg.neighborId)
      : `${piece.id}||outer-${sideName}`;

    out.push({
      neighborId: seg.neighborId,
      pairKey,
      d,
      style: pickStyle(segConfig),
    });
  }

  return out;
}

// Lightweight edge-key helper (compile.js owns the canonical version).
function edgeKeyOf(a, b) { return a < b ? `${a}||${b}` : `${b}||${a}`; }

// Extract stroke-styling fields from a config object. Returns undefined if
// nothing is set so the renderer can know to fall back to CSS defaults.
function pickStyle(cfg) {
  if (!cfg) return undefined;
  const out = {};
  if (cfg.color != null)          out.color = cfg.color;
  if (cfg.opacity != null)        out.opacity = cfg.opacity;
  if (cfg.strokeWidth != null)    out.strokeWidth = cfg.strokeWidth;
  if (cfg.hoverAnimation != null) out.hoverAnimation = cfg.hoverAnimation;
  return Object.keys(out).length ? out : undefined;
}

export function computePieceBbox(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h, sides = {} } = piece;
  const padForSide = (side) => {
    let pad = 0;
    const segments = allPieces
      ? findEdgeSegments(allPieces, piece, side)
      : [{ neighborId: null }];
    for (const seg of segments) {
      const effect = effectForSegment(piece, side, seg.neighborId, defaultEffect);
      if (effect === 'wave') pad = Math.max(pad, (effectConfig?.amplitude ?? 12) + 2);
      else if (effect === 'puzzle' && hasTab(sides[side])) pad = Math.max(pad, KNOB_R);
    }
    return pad;
  };
  return {
    minX: x - padForSide('left'),
    minY: y - padForSide('top'),
    maxX: x + w + padForSide('right'),
    maxY: y + h + padForSide('bottom'),
  };
}
