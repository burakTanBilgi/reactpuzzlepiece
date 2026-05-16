import { useMemo } from 'react';
import { listOuterEdges, piecesOfEdge } from '../../grid/compile.js';
import { tierHasOverride } from '../components/inspector/cascade-source.js';

// Flat layer-row list derived from the current project. Used by the
// Layers Edit UI panel. Each row is one of:
//
//   { kind: 'default',  id: 'default',  label, overridden }
//   { kind: 'inner',    id: 'inner',    label, overridden }
//   { kind: 'outer',    id: 'outer',    label, overridden }
//   { kind: 'section',  id: 'pieces',   label }       (visual header)
//   { kind: 'piece',    id: pieceId,    label, overridden }
//   { kind: 'section',  id: 'edges',    label }
//   { kind: 'edge',     id: pairKey,    label, overridden, isOuter, pairKey }
//
// `overridden` indicates whether this layer carries a project override
// (e.g. a non-empty byPiece entry, a non-null inner/outer layer, etc.).
// The Layers UI surfaces this with a filled dot vs a chain icon.
export function useLayerTree(project, pieces, sharedEdges) {
  return useMemo(() => {
    if (!project) return [];

    const rows = [];
    const edges = project.edges;

    rows.push({
      kind: 'default',
      id: 'default',
      label: 'Project default',
      overridden: true,           // Defaults always carry the floor values.
    });

    const hasInnerEdges = sharedEdges && sharedEdges.length > 0;
    const outerEdges    = listOuterEdges(project);
    const hasOuterEdges = outerEdges.length > 0;

    if (hasInnerEdges) {
      rows.push({
        kind: 'inner',
        id: 'inner',
        label: 'Inner edges',
        overridden: !!edges?.inner && tierHasOverride(edges.inner),
      });
    }
    if (hasOuterEdges) {
      rows.push({
        kind: 'outer',
        id: 'outer',
        label: 'Outer edges',
        overridden: !!edges?.outer && tierHasOverride(edges.outer),
      });
    }

    rows.push({ kind: 'section', id: 'pieces', label: 'Pieces' });
    for (const p of pieces) {
      rows.push({
        kind: 'piece',
        id: p.id,
        label: p.label || p.id,
        overridden: tierHasOverride(edges?.byPiece?.[p.id]),
      });
    }

    if (sharedEdges?.length || outerEdges.length) {
      rows.push({ kind: 'section', id: 'edges', label: 'Edges' });
      const piecesById = new Map(pieces.map((p) => [p.id, p]));

      for (const e of sharedEdges) {
        const a = piecesById.get(e.pieceAId)?.label || e.pieceAId;
        const b = piecesById.get(e.pieceBId)?.label || e.pieceBId;
        rows.push({
          kind: 'edge',
          id: e.pairKey,
          pairKey: e.pairKey,
          isOuter: false,
          label: `${a} ↔ ${b}`,
          overridden: tierHasOverride(edges?.byEdge?.[e.pairKey]),
        });
      }
      for (const e of outerEdges) {
        const [pieceId] = piecesOfEdge(e.pairKey);
        const label = piecesById.get(pieceId)?.label || pieceId;
        rows.push({
          kind: 'edge',
          id: e.pairKey,
          pairKey: e.pairKey,
          isOuter: true,
          label: `${label} · outer ${e.side}`,
          overridden: tierHasOverride(edges?.byEdge?.[e.pairKey]),
        });
      }
    }

    return rows;
  }, [project, pieces, sharedEdges]);
}
