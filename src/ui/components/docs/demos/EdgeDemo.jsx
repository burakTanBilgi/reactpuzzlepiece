import { useMemo, useState } from 'react';
import { compileProject } from '../../../../grid/compile.js';
import { PuzzleBoard, EFFECT_NAMES } from '../../../../puzzle';

const EFFECTS = ['default', ...EFFECT_NAMES];

// Demonstrates the priority chain: pick a default, optionally override the
// inner or outer layer, and watch the rendered effect on a 2×2 grid.
export default function EdgeDemo() {
  const [defaultEffect, setDefaultEffect] = useState('puzzle');
  const [innerEffect, setInnerEffect] = useState('default');   // 'default' = no override
  const [outerEffect, setOuterEffect] = useState('default');

  const project = useMemo(() => ({
    grid: {
      rows: 2, cols: 2, cellSize: 140,
      groups: [['a', 'b'], ['c', 'd']],
    },
    edges: {
      default: { effect: defaultEffect, config: { amplitude: 12, frequency: 0.04 } },
      inner: innerEffect === 'default'
        ? null
        : { effect: innerEffect, config: { amplitude: 12, frequency: 0.04 } },
      outer: outerEffect === 'default'
        ? null
        : { effect: outerEffect, config: { amplitude: 12, frequency: 0.04 } },
      byEdge: {},
    },
    pieceColors: {},
    pieceContent: {},
    backgrounds: [],
  }), [defaultEffect, innerEffect, outerEffect]);

  const pieces = useMemo(() => compileProject(project), [project]);

  return (
    <div className="edge-demo">
      <div className="edge-demo__rows">
        <Row label="Default" value={defaultEffect} options={EFFECT_NAMES} onChange={setDefaultEffect} />
        <Row label="Inner"   value={innerEffect}   options={EFFECTS}      onChange={setInnerEffect} />
        <Row label="Outer"   value={outerEffect}   options={EFFECTS}      onChange={setOuterEffect} />
      </div>

      <div className="edge-demo__stage">
        <PuzzleBoard
          pieces={pieces}
          effect={defaultEffect}
          effectConfig={{ amplitude: 12, frequency: 0.04 }}
        />
      </div>
    </div>
  );
}

function Row({ label, value, options, onChange }) {
  return (
    <div className="edge-demo__row">
      <span className="edge-demo__label">{label}</span>
      <div className="effect-chips">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`chip chip--sm ${value === o ? 'chip--active' : ''}`}
            onClick={() => onChange(o)}
          >
            {cap(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
