import { describe, expect, it } from 'vitest';
import {
  edgeKey,
  piecesOfEdge,
  resolveEdge,
  resolveEdgeEffects,
} from '../../../src/grid/compile.js';

describe('edgeKey', () => {
  it('sorts the two piece ids lexicographically so the key is symmetric', () => {
    expect(edgeKey('b', 'a')).toBe('a||b');
    expect(edgeKey('a', 'b')).toBe('a||b');
  });
});

describe('piecesOfEdge', () => {
  it('returns the two piece ids for a shared edge in sorted order', () => {
    expect(piecesOfEdge('a||b')).toEqual(['a', 'b']);
  });

  it('returns a single id for an outer edge', () => {
    expect(piecesOfEdge('a||outer-top')).toEqual(['a']);
  });
});

// === Shared-edge symmetry =====================================
// The puzzle-vs-wave mismatch bug we fixed earlier in compile.js
// boiled down to: a shared edge resolved differently when the
// caller passed [A,B] vs [B,A]. Both halves of a shared edge must
// resolve to the same effect — otherwise pieceA renders puzzle and
// pieceB renders wave on the same edge.
describe('resolveEdge symmetry (shared edges)', () => {
  const baseEdges = {
    default: { effect: 'puzzle' },
    inner: null,
    outer: null,
    byEdge: {},
    byPiece: {
      'piece-A': { effect: 'wave',   config: { amplitude: 12 } },
      'piece-B': { effect: 'puzzle', config: { inverted: true } },
    },
  };
  const pairKey = edgeKey('piece-A', 'piece-B'); // → 'piece-A||piece-B'

  it('chooses the lex-smaller piece (piece-A) for byPiece regardless of edgePieceIds order', () => {
    const fromA = resolveEdge(baseEdges, pairKey, 'inner', ['piece-A', 'piece-B']);
    const fromB = resolveEdge(baseEdges, pairKey, 'inner', ['piece-B', 'piece-A']);
    expect(fromA.effect).toBe('wave');     // piece-A wins (lex-smaller id)
    expect(fromB.effect).toBe('wave');
  });

  it('byEdge override beats every byPiece entry', () => {
    const edges = {
      ...baseEdges,
      byEdge: { [pairKey]: { effect: 'straight', config: { color: '#0f0' } } },
    };
    const { effect, config } = resolveEdge(edges, pairKey, 'inner', ['piece-A', 'piece-B']);
    expect(effect).toBe('straight');
    expect(config.color).toBe('#0f0');
  });

  it('falls back to the inner layer if no byPiece/byEdge entry exists', () => {
    const edges = {
      default: { effect: 'puzzle' },
      inner:   { effect: 'wave', config: { frequency: 0.05 } },
      outer: null,
      byEdge: {}, byPiece: {},
    };
    const out = resolveEdge(edges, 'x||y', 'inner', ['x', 'y']);
    expect(out.effect).toBe('wave');
    expect(out.config.frequency).toBe(0.05);
  });
});

// === Cell-tier symmetry (animation effects map) ================
describe('resolveEdgeEffects symmetry', () => {
  it('lex-smaller piece wins when both endpoints carry their own effects', () => {
    const edges = {
      default: { effects: { 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } } },
      inner: null, outer: null, byEdge: {},
      byPiece: {
        // piece-A's effects map → glow on hover.
        'piece-A': { effects: { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } } },
        // piece-B's effects map → thicken on hover.
        'piece-B': { effects: { 'thicken:hover': { id: 'thicken', trigger: 'hover', config: {} } } },
      },
    };
    const pairKey = edgeKey('piece-A', 'piece-B');

    const a = resolveEdgeEffects(edges, pairKey, 'inner', ['piece-A', 'piece-B']);
    const b = resolveEdgeEffects(edges, pairKey, 'inner', ['piece-B', 'piece-A']);

    // Both orders should resolve to the same shape (piece-A wins via
    // lex-smaller rule — its effect is merged LAST inside resolveEdgeEffects).
    expect(a).toEqual(b);
    // The winning effects map should include piece-A's `glow:hover` entry.
    expect(a['glow:hover']?.id).toBe('glow');
  });
});
