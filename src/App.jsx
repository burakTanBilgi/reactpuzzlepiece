import PuzzleBoard from './PuzzleBoard.jsx';
import './App.css';

const pieces = [
  {
    id: 'big-tl',
    x: 0,
    y: 0,
    w: 400,
    h: 400,
    label: 'Big TL',
    sides: {
      right: 'tab',
      bottom: [
        { pos: 0.25, type: 'tab' },
        { pos: 0.75, type: 'tab' },
      ],
    },
  },
  {
    id: 'big-tr',
    x: 400,
    y: 0,
    w: 400,
    h: 400,
    label: 'Big TR',
    sides: {
      left: 'socket',
      bottom: 'tab',
    },
  },
  {
    id: 'big-br',
    x: 400,
    y: 400,
    w: 400,
    h: 400,
    label: 'Big BR',
    sides: {
      top: 'socket',
      left: [
        { pos: 0.25, type: 'socket' },
        { pos: 0.75, type: 'socket' },
      ],
    },
  },
  {
    id: 's1',
    x: 0,
    y: 400,
    w: 200,
    h: 200,
    label: 'S1',
    sides: {
      top: 'socket',
      right: 'tab',
      bottom: 'tab',
    },
  },
  {
    id: 's2',
    x: 200,
    y: 400,
    w: 200,
    h: 200,
    label: 'S2',
    sides: {
      top: 'socket',
      left: 'socket',
      right: 'tab',
      bottom: 'tab',
    },
  },
  {
    id: 's3',
    x: 0,
    y: 600,
    w: 200,
    h: 200,
    label: 'S3',
    sides: {
      top: 'socket',
      right: 'tab',
    },
  },
  {
    id: 's4',
    x: 200,
    y: 600,
    w: 200,
    h: 200,
    label: 'S4',
    sides: {
      top: 'socket',
      left: 'socket',
      right: 'tab',
    },
  },
];

export default function App() {
  return (
    <main className="stage">
      <h1 className="stage__title">Puzzle Piece Prototype</h1>
      <PuzzleBoard pieces={pieces} />
      <p className="stage__hint">
        Hover a piece — the outline traces its full outer shape.
      </p>
    </main>
  );
}
