import PuzzlePiece from './PuzzlePiece.jsx';
import './App.css';

export default function App() {
  return (
    <main className="stage">
      <h1 className="stage__title">Puzzle Piece Prototype</h1>

      <div className="puzzle-grid">
        <div className="puzzle-grid__cell">
          <PuzzlePiece sides={{ right: 'tab', bottom: 'tab' }} label="Piece 1" />
        </div>
        <div className="puzzle-grid__cell">
          <PuzzlePiece sides={{ left: 'socket', bottom: 'tab' }} label="Piece 2" />
        </div>
        <div className="puzzle-grid__cell">
          <PuzzlePiece sides={{ right: 'tab', top: 'socket' }} label="Piece 3" />
        </div>
        <div className="puzzle-grid__cell">
          <PuzzlePiece sides={{ left: 'socket', top: 'socket' }} label="Piece 4" />
        </div>
      </div>

      <p className="stage__hint">Hover a piece — the outline traces its full outer shape.</p>
    </main>
  );
}
