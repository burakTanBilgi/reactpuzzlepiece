import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { compileProject, listSharedEdges } from '../../../../src/grid/compile.js';
import { useLayerTree } from '../../../../src/ui/hooks/useLayerTree.js';
import { project2x2 } from '../../../helpers/fixtures.js';

describe('useLayerTree', () => {
  it('returns at least: Project default + a Pieces section + one row per piece', () => {
    const project = project2x2();
    const pieces  = compileProject(project);
    const shared  = listSharedEdges(project);

    const { result } = renderHook(() => useLayerTree(project, pieces, shared));
    const rows = result.current;

    // Sanity: at least the default + a section header + 4 piece rows.
    expect(rows[0]).toMatchObject({ kind: 'default', id: 'default' });

    const pieceRows = rows.filter((r) => r.kind === 'piece');
    expect(pieceRows).toHaveLength(4);
  });

  it('marks pieces with an override entry as `overridden`', () => {
    const project = project2x2();
    const pieces  = compileProject(project);
    const shared  = listSharedEdges(project);

    // Inject a byPiece entry for the first piece.
    const targetId = pieces[0].id;
    const projectWithOverride = {
      ...project,
      edges: {
        ...project.edges,
        byPiece: { [targetId]: { effect: 'wave' } },
      },
    };

    const { result } = renderHook(() =>
      useLayerTree(projectWithOverride, pieces, shared));
    const targetRow = result.current.find((r) => r.kind === 'piece' && r.id === targetId);

    expect(targetRow.overridden).toBe(true);
  });

  it('skips Inner/Outer rows when no shared/outer edges exist', () => {
    const project = project2x2();
    const pieces  = compileProject(project);
    // Pretend there are no shared edges (e.g. a 1×1 board).
    const { result } = renderHook(() => useLayerTree(project, pieces, []));
    const rows = result.current;
    expect(rows.find((r) => r.kind === 'inner')).toBeUndefined();
  });
});
