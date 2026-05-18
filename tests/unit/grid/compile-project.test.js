import { describe, expect, it } from 'vitest';
import { compileProject, listOuterEdges } from '../../../src/grid/compile.js';
import { mergeCells } from '../../../src/grid/grid.js';
import { project2x2, project2x2WithTopMerge } from '../../helpers/fixtures.js';

describe('compileProject — end-to-end', () => {
  it('emits one piece per group with correctly-scaled bounds', () => {
    const p = project2x2();
    const cellSize = p.grid.cellSize;
    const pieces = compileProject(p);

    expect(pieces).toHaveLength(4);
    for (const piece of pieces) {
      expect(piece.w).toBe(cellSize);
      expect(piece.h).toBe(cellSize);
      // x/y align to cell boundaries.
      expect(piece.x % cellSize).toBe(0);
      expect(piece.y % cellSize).toBe(0);
    }
  });

  it('forwards `fill` from pieceColors and `content` from pieceContent', () => {
    const p = project2x2();
    const targetId = p.grid.groups[0][0];
    const withColor = {
      ...p,
      pieceColors:  { [targetId]: '#d68b54' },
      pieceContent: { [targetId]: { type: 'text', text: 'Hi' } },
    };

    const pieces = compileProject(withColor);
    const target = pieces.find((q) => q.id === targetId);
    expect(target.fill).toBe('#d68b54');
    expect(target.content).toEqual({ type: 'text', text: 'Hi' });
  });

  it('a merged 1×2 piece spans two cell widths', () => {
    const p = project2x2WithTopMerge();
    const pieces = compileProject(p);
    const mergedId = p.grid.groups[0][0];
    const merged = pieces.find((q) => q.id === mergedId);
    expect(merged.w).toBe(p.grid.cellSize * 2);
    expect(merged.h).toBe(p.grid.cellSize);
  });

  it('attaches cellEffects from the resolved cascade', () => {
    const p = project2x2();
    const targetId = p.grid.groups[0][0];
    const projectWithCellEffect = {
      ...p,
      cells: {
        default: { effects: { 'highlight:hover': { id: 'highlight', trigger: 'hover', config: {} } } },
        byPiece: { [targetId]: { effects: { 'glow:hover': { id: 'glow', trigger: 'hover', config: {} } } } },
      },
    };

    const pieces = compileProject(projectWithCellEffect);
    const target = pieces.find((q) => q.id === targetId);
    // Effects map merges default → byPiece (highlight + glow).
    expect(Object.keys(target.cellEffects)).toEqual(
      expect.arrayContaining(['highlight:hover', 'glow:hover'])
    );

    const other = pieces.find((q) => q.id !== targetId);
    // Default-only piece sees only 'highlight:hover'.
    expect(Object.keys(other.cellEffects)).toEqual(['highlight:hover']);
  });

  it('listOuterEdges yields one pairKey per outer-facing side of every piece', () => {
    const p = project2x2();
    const outer = listOuterEdges(p);
    // 2×2 = 4 corner singletons; each has 2 outer sides → 8 outer edges.
    expect(outer).toHaveLength(8);
    for (const e of outer) {
      expect(e.pairKey).toMatch(/\|\|outer-/);
      expect(e.isOuter).toBe(true);
    }
  });

  it('merging two cells removes the inner edge between them from listOuterEdges', () => {
    const before = project2x2();
    const after = { ...before, grid: mergeCells(before.grid, [[0, 0], [0, 1]]) };
    expect(listOuterEdges(after).length).toBeLessThan(listOuterEdges(before).length);
  });
});
