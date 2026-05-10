import { useMemo, useState } from 'react';
import { PuzzleBoard, EFFECT_NAMES } from '../../../../puzzle';

// A 2×2 puzzle whose default effect can be changed live. No persistence —
// purely a tutorial demo for the docs page.
const PIECES = [
  { id: 'tl', x:   0, y:   0, w: 160, h: 160, label: 'TL',
    sides: { right:  { count: 1, type: 'tab' },    bottom: { count: 1, type: 'tab' } } },
  { id: 'tr', x: 160, y:   0, w: 160, h: 160, label: 'TR',
    sides: { left:   { count: 1, type: 'socket' }, bottom: { count: 1, type: 'tab' } } },
  { id: 'bl', x:   0, y: 160, w: 160, h: 160, label: 'BL',
    sides: { right:  { count: 1, type: 'tab' },    top:    { count: 1, type: 'socket' } } },
  { id: 'br', x: 160, y: 160, w: 160, h: 160, label: 'BR',
    sides: { left:   { count: 1, type: 'socket' }, top:    { count: 1, type: 'socket' } } },
];

const WAVE_CFG = { frequency: 0.04, amplitude: 14 };

export default function MiniPuzzle() {
  const [effect, setEffect] = useState('puzzle');
  const config = useMemo(() => effect === 'wave' ? WAVE_CFG : undefined, [effect]);

  return (
    <div className="mini-puzzle">
      <div className="mini-puzzle__chips">
        {EFFECT_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            className={`chip chip--sm ${effect === name ? 'chip--active' : ''}`}
            onClick={() => setEffect(name)}
          >
            {cap(name)}
          </button>
        ))}
      </div>
      <div className="mini-puzzle__stage">
        <PuzzleBoard pieces={PIECES} effect={effect} effectConfig={config} />
      </div>
    </div>
  );
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
