import SliderRow from '../SliderRow.jsx';
import { MIXED } from './constants.js';

// Color / opacity / thickness — apply to every effect. Lives in the same
// `config` bag so it cascades through the existing priority chain.
//
// "Default color" (no entry) is distinct from "transparent": the former
// inherits the theme stroke color; the latter sets opacity to 0 / a
// transparent stroke so the page background shows through.
export default function StyleControls({ config, onPatchConfig }) {
  const colorMixed   = config?.color === MIXED;
  const opacityMixed = config?.opacity === MIXED;
  const widthMixed   = config?.strokeWidth === MIXED;

  // For the color picker we always need a concrete hex value to satisfy
  // <input type="color">. Default to a neutral grey when nothing is set.
  const colorValue = (typeof config?.color === 'string' && config.color !== MIXED)
    ? config.color
    : '#888888';
  const colorIsSet = typeof config?.color === 'string' && config.color !== MIXED;

  return (
    <div className="style-controls">
      <div className="form-row">
        <label className="form-row__label">Color</label>
        <input
          type="color"
          className="form-row__color"
          value={colorValue}
          onChange={(e) => onPatchConfig({ color: e.target.value })}
        />
        {colorIsSet ? (
          <button type="button" className="link-btn" onClick={() => onPatchConfig({ color: undefined })}>
            reset
          </button>
        ) : (
          <span className="hint" style={{ marginLeft: 4 }}>{colorMixed ? 'mixed' : 'theme'}</span>
        )}
      </div>

      <SliderRow
        label="Opacity"
        min={0} max={1} step={0.01}
        value={opacityMixed ? 1 : (config?.opacity ?? 1)}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => onPatchConfig({ opacity: v })}
      />

      <SliderRow
        label="Width"
        min={0} max={10} step={0.25}
        value={widthMixed ? 1.25 : (config?.strokeWidth ?? 1.25)}
        format={(v) => `${v}px`}
        onChange={(v) => onPatchConfig({ strokeWidth: v })}
      />
    </div>
  );
}
