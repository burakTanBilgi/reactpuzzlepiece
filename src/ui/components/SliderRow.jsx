import { useContext, useEffect, useState } from 'react';
import { TilesContext } from '../hooks/TilesContext.jsx';

// Slider with a typeable numeric value. Click the value to edit; Enter or
// blur commits, Escape cancels. The displayed value uses `format` when not
// being edited.
//
// When the surrounding `TilesContext` is true (Direction D), the row
// renders 5 preset tile buttons instead of a draggable slider. Each
// tile corresponds to an evenly-spaced step across [min, max]; clicking
// snaps the value to that tile.
//
// Props:
//   label, min, max, step, value, onChange       — standard slider props
//   format(value) → string                        — display formatting (optional)
//   parse(string) → number | null                 — parse user text (optional;
//                                                   defaults to parseFloat)
//   tileCount                                     — number of preset tiles
//                                                   when tiles are active (default 5)
export default function SliderRow({
  label, min, max, step = 1, value, onChange, format, parse, tileCount = 5,
}) {
  const tiles = useContext(TilesContext);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!editing) setDraft(format ? format(value) : String(value));
  }, [value, editing, format]);

  const commit = () => {
    const raw = parse ? parse(draft) : parseFloat(draft);
    if (Number.isFinite(raw)) {
      const clamped = Math.min(max, Math.max(min, raw));
      onChange(clamped);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(format ? format(value) : String(value));
    setEditing(false);
  };

  if (tiles) {
    const presets = [];
    for (let i = 0; i < tileCount; i++) {
      presets.push(min + ((max - min) * i) / (tileCount - 1));
    }
    const closestIdx = presets.reduce(
      (best, p, i) => (Math.abs(p - value) < Math.abs(presets[best] - value) ? i : best),
      0
    );
    return (
      <label className="slider-control slider-control--tiles">
        <span className="slider-control__label">{label}</span>
        <div className="tile-presets">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              className={`tile-preset${i === closestIdx ? ' tile-preset--active' : ''}`}
              onClick={() => onChange(p)}
            >
              {format ? format(p) : String(p)}
            </button>
          ))}
        </div>
      </label>
    );
  }

  return (
    <label className="slider-control">
      <span className="slider-control__label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="text"
        inputMode="decimal"
        className="slider-control__input"
        value={editing ? draft : (format ? format(value) : String(value))}
        onFocus={(e) => { setEditing(true); setDraft(String(value)); e.target.select(); }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.currentTarget.blur(); }
          else if (e.key === 'Escape') { cancel(); e.currentTarget.blur(); }
          else if (e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(Math.min(max, value + step));
          }
          else if (e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(Math.max(min, value - step));
          }
        }}
      />
    </label>
  );
}
