import EdgeEditorCanvas from './EdgeEditorCanvas.jsx';
import ContentCanvas    from './ContentCanvas.jsx';

// Unified canvas for the Edit page. The underlying PuzzleBoard renders the
// same in both modes — only the overlay / interaction layer changes.
//
//   mode = 'edges'   → edge selection overlay
//   mode = 'content' → piece body click selects the piece
export default function EditCanvas({
  mode,
  pieces, effect, effectConfig,
  // edges mode
  allEdges, selectedEdgeIds, onSelectEdge, isOverridden,
  // content mode
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
