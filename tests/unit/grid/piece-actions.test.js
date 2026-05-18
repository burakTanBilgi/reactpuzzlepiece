import { describe, expect, it } from 'vitest';
import { pieceActions } from '../../../src/grid/actions/piece-actions.js';
import { project2x2 } from '../../helpers/fixtures.js';

function makeHolder(initial) {
  let state = initial;
  return {
    get state() { return state; },
    setProject: (u) => { state = typeof u === 'function' ? u(state) : u; },
  };
}

describe('pieceActions — colour', () => {
  it('setPieceColor writes the colour onto pieceColors', () => {
    const h = makeHolder(project2x2());
    pieceActions(h.setProject).setPieceColor('piece-A', '#d68b54');
    expect(h.state.pieceColors['piece-A']).toBe('#d68b54');
  });

  it('setPieceColor(null) deletes the entry instead of setting it to null', () => {
    const initial = { ...project2x2(), pieceColors: { 'piece-A': '#d68b54' } };
    const h = makeHolder(initial);
    pieceActions(h.setProject).setPieceColor('piece-A', null);
    expect(h.state.pieceColors['piece-A']).toBeUndefined();
  });

  it('clearPieceColors wipes the whole map', () => {
    const initial = { ...project2x2(), pieceColors: { 'a': '#fff', 'b': '#000' } };
    const h = makeHolder(initial);
    pieceActions(h.setProject).clearPieceColors();
    expect(h.state.pieceColors).toEqual({});
  });
});

describe('pieceActions — content', () => {
  it('setPieceContent writes a content entry under the piece id', () => {
    const h = makeHolder(project2x2());
    pieceActions(h.setProject).setPieceContent('p', { type: 'text', text: 'hi' });
    expect(h.state.pieceContent['p']).toEqual({ type: 'text', text: 'hi' });
  });

  it('setPieceContent(null) removes the entry', () => {
    const initial = { ...project2x2(), pieceContent: { 'p': { type: 'text', text: 'hi' } } };
    const h = makeHolder(initial);
    pieceActions(h.setProject).setPieceContent('p', null);
    expect(h.state.pieceContent['p']).toBeUndefined();
  });

  it('updatePieceContent merges into the existing content (preserves other fields)', () => {
    const initial = {
      ...project2x2(),
      pieceContent: { 'p': { type: 'text', text: 'hi', fontSize: 24 } },
    };
    const h = makeHolder(initial);
    pieceActions(h.setProject).updatePieceContent('p', { text: 'hello' });
    expect(h.state.pieceContent['p']).toEqual({
      type: 'text',
      text: 'hello',
      fontSize: 24,
    });
  });

  it('updatePieceContent creates a new entry from scratch when nothing was set', () => {
    const h = makeHolder(project2x2());
    pieceActions(h.setProject).updatePieceContent('p', { type: 'text', text: 'fresh' });
    expect(h.state.pieceContent['p']).toEqual({ type: 'text', text: 'fresh' });
  });
});

describe('pieceActions — cell effects (v2)', () => {
  it('setDefaultCellEffects writes onto project.cells.default.effects', () => {
    const h = makeHolder(project2x2());
    const map = { 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } };
    pieceActions(h.setProject).setDefaultCellEffects(map);
    expect(h.state.cells.default.effects).toEqual(map);
  });

  it('setCellEffects writes onto project.cells.byPiece[pieceId].effects', () => {
    const h = makeHolder(project2x2());
    const map = { 'lift:hover': { id: 'lift', trigger: 'hover', config: { distance: 4 } } };
    pieceActions(h.setProject).setCellEffects('piece-A', map);
    expect(h.state.cells.byPiece['piece-A'].effects).toEqual(map);
  });

  it('setCellEffects with an empty map removes the byPiece entry', () => {
    const h = makeHolder(project2x2());
    pieceActions(h.setProject).setCellEffects('piece-A', {
      'lift:hover': { id: 'lift', trigger: 'hover', config: {} },
    });
    pieceActions(h.setProject).setCellEffects('piece-A', {});
    expect(h.state.cells.byPiece['piece-A']).toBeUndefined();
  });

  it('resetAllCellEffects wipes default + byPiece in one shot', () => {
    const h = makeHolder(project2x2());
    pieceActions(h.setProject).setDefaultCellEffects({ 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } });
    pieceActions(h.setProject).setCellEffects('piece-A', { 'lift:hover': { id: 'lift', trigger: 'hover', config: {} } });
    pieceActions(h.setProject).resetAllCellEffects();
    expect(h.state.cells.default.effects).toEqual({});
    expect(h.state.cells.byPiece).toEqual({});
  });
});
