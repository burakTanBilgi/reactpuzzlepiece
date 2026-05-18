import { describe, expect, it } from 'vitest';
import {
  computeTierStates,
  resolveEdgePropSource,
  tierHasOverride,
  tierLabel,
} from '../../../../src/ui/components/inspector/cascade-source.js';

describe('tierHasOverride', () => {
  it('is false for null/undefined entries', () => {
    expect(tierHasOverride(null)).toBe(false);
    expect(tierHasOverride(undefined)).toBe(false);
  });

  it('is false for an empty {} entry', () => {
    expect(tierHasOverride({})).toBe(false);
  });

  it('is true when `effect` is set', () => {
    expect(tierHasOverride({ effect: 'wave' })).toBe(true);
  });

  it('is true when any style prop sits inside config', () => {
    expect(tierHasOverride({ config: { color: '#abc' } })).toBe(true);
    expect(tierHasOverride({ config: { strokeWidth: 2 } })).toBe(true);
    expect(tierHasOverride({ config: { amplitude: 12 } })).toBe(true);
  });

  it('is true when `effects` carries at least one animation', () => {
    expect(tierHasOverride({
      effects: { 'highlight:hover': { id: 'highlight', trigger: 'hover' } },
    })).toBe(true);
  });

  it('is false for `effects: {}` (empty map)', () => {
    expect(tierHasOverride({ effects: {} })).toBe(false);
  });
});

describe('computeTierStates', () => {
  const baseEdges = {
    default: { effect: 'puzzle' },
    inner:   null,
    outer:   { effect: 'wave' },   // outer has an override
    byPiece: { 'piece-A': { effect: 'wave' } },
    byEdge:  { 'a||b': { effect: 'straight' } },
  };

  it('default tier is always applicable; carries override iff `edges.default` has one', () => {
    const out = computeTierStates(baseEdges, { type: 'none' });
    expect(out.default.applicable).toBe(true);
    expect(out.default.hasOverride).toBe(true);   // default has `effect: 'puzzle'`
  });

  it('with no selection, Inner and Outer are both applicable', () => {
    const out = computeTierStates(baseEdges, { type: 'none' });
    expect(out.inner.applicable).toBe(true);
    expect(out.inner.hasOverride).toBe(false);     // inner is null
    expect(out.outer.applicable).toBe(true);
    expect(out.outer.hasOverride).toBe(true);
    // Piece + Edge tiers stay inapplicable on a 'none' selection.
    expect(out.piece.applicable).toBe(false);
    expect(out.edge.applicable).toBe(false);
  });

  it('reports Piece-tier override flag for a selected piece', () => {
    const out = computeTierStates(baseEdges, {
      type: 'piece',
      pieceId: 'piece-A',
      hasInner: true,
      hasOuter: false,
    });
    expect(out.piece.applicable).toBe(true);
    expect(out.piece.hasOverride).toBe(true);
    expect(out.outer.applicable).toBe(false);     // selection says hasOuter=false
  });

  it('reports Edge-tier override flag for a selected pair', () => {
    const out = computeTierStates(baseEdges, {
      type: 'edge',
      pairKeys: ['a||b'],
    });
    expect(out.edge.applicable).toBe(true);
    expect(out.edge.hasOverride).toBe(true);
  });
});

describe('resolveEdgePropSource', () => {
  it('returns `none` when no tier carries the prop', () => {
    const edges = { default: {}, inner: null, outer: null, byPiece: {}, byEdge: {} };
    expect(resolveEdgePropSource(edges, 'a||b', 'color')).toEqual({ tier: 'none' });
  });

  it('returns the byEdge tier when the per-edge entry has the prop', () => {
    const edges = {
      default: { effect: 'puzzle' },
      inner: null, outer: null, byPiece: {},
      byEdge: { 'a||b': { config: { color: '#fff' } } },
    };
    expect(resolveEdgePropSource(edges, 'a||b', 'color').tier).toBe('edge');
  });
});

describe('tierLabel', () => {
  it('returns friendly names per tier', () => {
    expect(tierLabel('edge')).toBe('Edge');
    expect(tierLabel('piece')).toBe('Piece');
    expect(tierLabel('layer', 'inner')).toBe('Inner');
    expect(tierLabel('layer', 'outer')).toBe('Outer');
    expect(tierLabel('default')).toBe('Default');
    expect(tierLabel('none')).toBe('—');
  });
});
