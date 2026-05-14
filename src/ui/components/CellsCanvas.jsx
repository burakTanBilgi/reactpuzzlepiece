import { PuzzleBoard } from '../../puzzle';

// Shows the puzzle board with click-to-select enabled. The selected piece's
// ring is rendered by PuzzleBoard itself via the `selectedId` prop, so this
// component is just a thin container — no overlay SVG needed. Used by the
// Cells tab on the Edit page.
export default function CellsCanvas({
  pieces,
  effect,
  effectConfig,
  selectedId,
  onSelectPiece,
}) {
  return (
    <div className="cells-canvas">
      <PuzzleBoard
        pieces={pieces}
        selectedId={selectedId}
        effect={effect}
        effectConfig={effectConfig}
        onSelect={onSelectPiece}
      />
    </div>
  );
}
