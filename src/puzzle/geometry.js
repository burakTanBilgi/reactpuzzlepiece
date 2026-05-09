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

  // Per-side config shadows the global effectConfig for this side's rendering.
  const sideConfig = piece.sideEffectConfigs?.[sideName] ?? effectConfig;

  const segments = findEdgeSegments(allPieces, piece, sideName);
  const ordered = dir > 0 ? segments : [...segments].reverse();
  const parts = [];

  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    const segStartAbs = pieceStartA + seg.startPos * pieceLength;
    const segEndAbs = pieceStartA + seg.endPos * pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd = dir > 0 ? segEndAbs : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    // Reproject knobs from piece-relative pos to segment-relative pos.
    const segKnobs = knobs
      .filter((k) => k.pos >= seg.startPos - POS_EPS && k.pos <= seg.endPos + POS_EPS)
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    parts.push(
      fx.buildSide(segStart, segEnd, fixed, axis, segKnobs, segStart, segLen, outwardSign, KNOB_R, sideConfig)
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
