import SliderRow from '../SliderRow.jsx';
import StyleControls from '../edges/StyleControls.jsx';
import EffectsPicker from '../interactions/EffectsPicker.jsx';
import InspectorSubcard from './InspectorSubcard.jsx';
import { EFFECT_NAMES, EDGE_EFFECTS } from '../../../puzzle';
import { DEFAULT_WAVE, MIXED, cap } from '../edges/constants.js';

// Reusable editor for ANY edge cascade tier (default / inner / outer /
// piece / per-edge). Renders two visually separated sub-cards: one for the
// connector shape + stroke style, one for the animation effects picker.
// Callers wire the appropriate setters for the tier they're editing.
//
// Props:
//   title           — sub-card header (e.g. "Edges · Default")
//   accent          — emphasise both subcards (used for the active tier)
//   effect          — resolved effect name (puzzle/wave/straight), used for chip state
//   config          — resolved config { color, opacity, strokeWidth, frequency, amplitude, inverted, ... }
//   ownEffects      — this tier's own effect map
//   inheritedEffects — effects merged from lower-priority tiers (read-only baseline)
//   mixed           — show multi-edge MIXED state in the effects picker
//   onSetEffect(name)        — set the tier's shape effect
//   onPatchConfig(patch)     — merge into the tier's style/wave config
//   onChangeEffects(map)     — write the animations map (whole replace)
//   onClear (optional)       — show a "reset" link on the head of the shape card
//   onResetEffects (optional)— show a "reset" link on the head of the animations card
//   strokeHidden (default false) — hide the shape & stroke sub-card (e.g. for cells)
export default function EdgeTierEditor({
  title,
  accent = false,
  effect, config,
  ownEffects = {},
  inheritedEffects = {},
  mixed = false,
  onSetEffect, onPatchConfig, onChangeEffects,
  onClear,
  onResetEffects,
  strokeHidden = false,
}) {
  const showInvert = effect === 'puzzle' || (effect === MIXED && config?.inverted !== undefined);
  const showWave   = effect === 'wave'   || (effect === MIXED && (config?.frequency != null || config?.amplitude != null));

  return (
    <>
      {!strokeHidden && (
        <InspectorSubcard
          title={`${title} · Shape & stroke`}
          accent={accent}
          actions={onClear ? <button type="button" className="link-btn" onClick={onClear}>reset</button> : null}
        >
          <div className="effect-chips">
            {EFFECT_NAMES.map((name) => (
              <button key={name} type="button"
                className={`chip chip--sm ${effect === name ? 'chip--active' : ''}`}
                onClick={() => onSetEffect?.(name)}>
                {cap(name)}
              </button>
            ))}
            {effect === MIXED && (
              <span className="chip chip--sm chip--mixed">mixed</span>
            )}
          </div>

          {showInvert && (
            <div className="puzzle-config">
              <button type="button"
                className={`invert-tabs-btn ${config?.inverted === true ? 'invert-tabs-btn--active' : ''}`}
                onClick={() => onPatchConfig?.({ inverted: !(config?.inverted === true) })}
                title="Toggle tab/socket orientation">
                <span className="invert-tabs-btn__icon">⟷</span>
                <span>Invert</span>
              </button>
            </div>
          )}

          {showWave && (
            <div className="wave-config">
              <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
                value={config?.frequency === MIXED
                  ? DEFAULT_WAVE.frequency
                  : (config?.frequency ?? DEFAULT_WAVE.frequency)}
                format={(v) => config?.frequency === MIXED ? `· ${v.toFixed(3)}` : v.toFixed(3)}
                onChange={(v) => onPatchConfig?.({ frequency: v })} />
              <SliderRow label="Amp" min={0} max={40} step={1}
                value={config?.amplitude === MIXED
                  ? DEFAULT_WAVE.amplitude
                  : (config?.amplitude ?? DEFAULT_WAVE.amplitude)}
                format={(v) => config?.amplitude === MIXED ? `· ${v}` : `${v}`}
                onChange={(v) => onPatchConfig?.({ amplitude: v })} />
            </div>
          )}

          <StyleControls config={config} onPatchConfig={onPatchConfig} />
        </InspectorSubcard>
      )}

      <InspectorSubcard
        title={`${title} · Animations`}
        accent={accent}
        actions={onResetEffects ? <button type="button" className="link-btn" onClick={onResetEffects}>reset</button> : null}
      >
        <EffectsPicker
          catalogue={EDGE_EFFECTS}
          ownEffects={ownEffects}
          inheritedEffects={inheritedEffects}
          mixed={mixed}
          onChange={onChangeEffects}
        />
      </InspectorSubcard>
    </>
  );
}
