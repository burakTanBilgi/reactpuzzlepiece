import { describe, expect, it } from 'vitest';
import { edgeActions } from '../../../src/grid/actions/edge-actions.js';
import { project2x2 } from '../../helpers/fixtures.js';

// edgeActions wraps each mutation as a setProject(updater) call. In a
// test we capture the latest project shape after each action.
function makeHolder(initial) {
  let state = initial;
  return {
    get state() { return state; },
    setProject: (u) => { state = typeof u === 'function' ? u(state) : u; },
  };
}

describe('edgeActions — default tier', () => {
  it('setDefaultEdgeEffect overwrites effect (without keeping prior config)', () => {
    const h = makeHolder({ ...project2x2(), edges: { ...project2x2().edges, default: { effect: 'puzzle', config: { color: '#fff' } } } });
    edgeActions(h.setProject).setDefaultEdgeEffect('wave', { frequency: 0.04 });
    expect(h.state.edges.default).toEqual({ effect: 'wave', config: { frequency: 0.04 } });
  });

  it('setDefaultEdgeConfig merges into existing config without clobbering effect', () => {
    const h = makeHolder({ ...project2x2(), edges: { ...project2x2().edges, default: { effect: 'puzzle', config: { color: '#fff' } } } });
    edgeActions(h.setProject).setDefaultEdgeConfig({ opacity: 0.5 });
    expect(h.state.edges.default).toEqual({
      effect: 'puzzle',
      config: { color: '#fff', opacity: 0.5 },
    });
  });
});

describe('edgeActions — per-edge tier', () => {
  it('setEdgeEffect writes a byEdge[pairKey] entry', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setEdgeEffect('a||b', 'wave', { frequency: 0.05 });
    expect(h.state.edges.byEdge['a||b']).toEqual({ effect: 'wave', config: { frequency: 0.05 } });
  });

  it('clearEdgeOverride removes the matching byEdge key', () => {
    const initial = project2x2();
    initial.edges.byEdge['a||b'] = { effect: 'straight' };
    const h = makeHolder(initial);
    edgeActions(h.setProject).clearEdgeOverride('a||b');
    expect(h.state.edges.byEdge['a||b']).toBeUndefined();
  });

  it('setEdgeConfig falls back to the default effect when no entry exists yet', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setEdgeConfig('a||b', { color: '#abc' });
    const entry = h.state.edges.byEdge['a||b'];
    expect(entry.effect).toBe(project2x2().edges.default.effect);
    expect(entry.config.color).toBe('#abc');
  });
});

describe('edgeActions — layer + piece tiers', () => {
  it('setLayerEffect writes to edges.inner / edges.outer', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setLayerEffect('inner', 'wave', { frequency: 0.03 });
    expect(h.state.edges.inner).toEqual({ effect: 'wave', config: { frequency: 0.03 } });
  });

  it('clearLayer resets the layer to null so the cascade falls back to default', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setLayerEffect('inner', 'wave');
    edgeActions(h.setProject).clearLayer('inner');
    expect(h.state.edges.inner).toBeNull();
  });

  it('clearPieceEdgeOverride removes a byPiece entry', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setPieceEdgeEffect('piece-A', 'wave');
    edgeActions(h.setProject).clearPieceEdgeOverride('piece-A');
    expect(h.state.edges.byPiece['piece-A']).toBeUndefined();
  });
});

describe('edgeActions — effects (v2) maps', () => {
  it('setEdgeEffects writes the map under byEdge[pairKey].effects', () => {
    const h = makeHolder(project2x2());
    const map = { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } };
    edgeActions(h.setProject).setEdgeEffects('a||b', map);
    expect(h.state.edges.byEdge['a||b'].effects).toEqual(map);
  });

  it('setEdgeEffects with an empty map deletes the byEdge entry when no other override remains', () => {
    const h = makeHolder(project2x2());
    edgeActions(h.setProject).setEdgeEffects('a||b', {
      'glow:hover': { id: 'glow', trigger: 'hover', config: {} },
    });
    edgeActions(h.setProject).setEdgeEffects('a||b', {});
    expect(h.state.edges.byEdge['a||b']).toBeUndefined();
  });

  it('setEdgeEffects with empty map keeps the byEdge entry alive when an effect/config remains', () => {
    const initial = project2x2();
    initial.edges.byEdge['a||b'] = { effect: 'wave', effects: { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } } };
    const h = makeHolder(initial);
    edgeActions(h.setProject).setEdgeEffects('a||b', {});
    // effect is still present so the entry should not be deleted.
    expect(h.state.edges.byEdge['a||b']).toBeDefined();
    expect(h.state.edges.byEdge['a||b'].effect).toBe('wave');
  });
});

describe('edgeActions.resetEdgeOverrides', () => {
  it('wipes byEdge + byPiece and clears effects at every tier', () => {
    const initial = project2x2();
    initial.edges.byEdge['a||b'] = { effect: 'wave' };
    initial.edges.byPiece['piece-A'] = { effect: 'wave' };
    initial.edges.default.effects = { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } };
    initial.edges.inner = { effect: 'wave', effects: { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } } };

    const h = makeHolder(initial);
    edgeActions(h.setProject).resetEdgeOverrides();

    expect(h.state.edges.byEdge).toEqual({});
    expect(h.state.edges.byPiece).toEqual({});
    expect(h.state.edges.default.effects).toEqual({});
    expect(h.state.edges.inner.effects).toEqual({});
  });
});
