import PuzzlePiece from './PuzzlePiece.jsx';
import './App.css';

export default function App() {
  return (
    <main className="stage">
      <h1 className="stage__title">Puzzle Piece Prototype</h1>
      <div className="puzzle-row">
        <PuzzlePiece type="tab-right" label="Piece 1" />
        <PuzzlePiece type="socket-left" label="Piece 2" />
      </div>
      <p className="stage__hint">Hover a piece — the outline traces its full outer shape.</p>
    </main>
  );
}
