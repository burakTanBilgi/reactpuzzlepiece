import EdgeEditorCanvas from './EdgeEditorCanvas.jsx';
import ContentCanvas    from './ContentCanvas.jsx';

// Unified canvas for the Edit page. The underlying PuzzleBoard renders the
// same in both modes — only the overlay / interaction layer changes.
//
//   mode = 'edges'   → edge selection overlay (clicking an edge picks the
//                      edge; clicking a piece body picks the piece for
//                      cell-tier editing)
//   mode = 'content' → piece body click selects the piece for content editing
export default function EditCanvas({
  mode,
  pieces, effect, effectConfig,
  // edges mode
  allEdges, selectedEdgeIds, onSelectEdge, isOverridden,
  // shared piece selection (used by both modes)
  selectedPieceId, onSelectPiece,
}) {
  if (mode === 'edges') {
    return (
      <EdgeEditorCanvas
        pieces={pieces}
        effect={effect}
        effectConfig={effectConfig}
        allEdges={allEdges}
        selectedEdgeIds={selectedEdgeIds}
        onSelectEdge={onSelectEdge}
        isOverridden={isOverridden}
        selectedPieceId={selectedPieceId}
        onSelectPiece={onSelectPiece}
      />
    );
  }

  return (
    <ContentCanvas
      pieces={pieces}
      effect={effect}
      effectConfig={effectConfig}
      selectedId={selectedPieceId}
      onSelectPiece={onSelectPiece}
    />
  );
}
