import { describe, expect, it } from 'vitest';
import {
  cellEffectAttrs,
  edgeEffectAttrs,
} from '../../../src/puzzle/effect-attrs.js';

describe('cellEffectAttrs', () => {
  it('returns an empty bundle when given no effects', () => {
    expect(cellEffectAttrs(null)).toEqual({ className: '', style: undefined, hasEdgeScope: false });
    expect(cellEffectAttrs(undefined)).toEqual({ className: '', style: undefined, hasEdgeScope: false });
  });

  it('emits one `piece--anim-{id}--{trigger}` class per entry', () => {
    const out = cellEffectAttrs({
      'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} },
      'lift:click':      { id: 'lift',      trigger: 'click', config: { distance: 8 } },
    });
    expect(out.className).toContain('piece--anim-highlight--hover');
    expect(out.className).toContain('piece--anim-lift--click');
  });

  it('writes CSS custom properties from per-effect config fields', () => {
    const out = cellEffectAttrs({
      'lift:hover': { id: 'lift', trigger: 'hover', config: { distance: 12 } },
    });
    expect(out.style).toEqual({ '--anim-lift-distance': '12px' });
  });

  it('falls back to schema defaults when config field is missing', () => {
    const out = cellEffectAttrs({
      'lift:hover': { id: 'lift', trigger: 'hover', config: {} },
    });
    // default distance is 4, unit 'px'.
    expect(out.style['--anim-lift-distance']).toBe('4px');
  });

  it('skips invalid entries without an id or trigger', () => {
    const out = cellEffectAttrs({
      'broken': null,
      'missing-id': { trigger: 'hover' },
      'missing-trigger': { id: 'lift' },
    });
    expect(out.className).toBe('');
  });

  it('hasEdgeScope stays false for cell effects (cells have no scopes)', () => {
    const out = cellEffectAttrs({
      'lift:hover': { id: 'lift', trigger: 'hover', config: {} },
    });
    expect(out.hasEdgeScope).toBe(false);
  });
});

describe('edgeEffectAttrs', () => {
  it('emits `piece__edge--anim-{id}--{trigger}-on-{scope}` classes', () => {
    const out = edgeEffectAttrs({
      'highlight:hover:piece': { id: 'highlight', trigger: 'hover', scope: 'piece', config: {} },
    });
    expect(out.className).toContain('piece__edge--anim-highlight--hover-on-piece');
  });

  it('defaults missing scope to the catalogue defaultScope', () => {
    const out = edgeEffectAttrs({
      'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} },
    });
    expect(out.className).toContain('piece__edge--anim-highlight--hover-on-piece');
  });

  it('flags hasEdgeScope when any entry targets the edge stroke', () => {
    const out = edgeEffectAttrs({
      'glow:hover:edge': { id: 'glow', trigger: 'hover', scope: 'edge', config: {} },
    });
    expect(out.hasEdgeScope).toBe(true);
  });

  it('hasEdgeScope is false when every entry targets the piece scope', () => {
    const out = edgeEffectAttrs({
      'glow:hover:piece': { id: 'glow', trigger: 'hover', scope: 'piece', config: {} },
    });
    expect(out.hasEdgeScope).toBe(false);
  });
});
