import SliderRow from '../SliderRow.jsx';
import StyleControls from './StyleControls.jsx';
import EffectsPicker from '../interactions/EffectsPicker.jsx';
import { EFFECT_NAMES, EDGE_EFFECTS } from '../../../puzzle';
import { DEFAULT_WAVE, cap } from './constants.js';

// One card for setting effect + wave config + interaction effects — used by
// Default, Inner, and Outer layer rows in the Edges panel. When `active` is
// true the card visually highlights as an override; `onClear` shows a "use
// default" link if provided. The EffectsPicker at the bottom edits this
// tier's hover/click animation map; lower-tier inheritance is shown via
// `inheritedEffects`.
export default function LayerCard({
  title, hint, effect, config,
  active, onSetEffect, onPatchConfig, onClear,
  // v2 effects
  ownEffects = {}, inheritedEffects = {}, onChangeEffects,
}) {
  return (
    <section className={`card ${active ? 'card--accent' : ''}`}>
      <div className="card__row">
        <h3 className="card__title">{title}</h3>
        {onClear && (
          <button type="button" className="link-btn" onClick={onClear}>
            use default
          </button>
        )}
      </div>
      {hint && <p className="hint">{hint}</p>}
      <div className="effect-chips">
        {EFFECT_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            className={`chip chip--sm ${effect === name ? 'chip--active' : ''}`}
            onClick={() => onSetEffect(name)}
          >
            {cap(name)}
          </button>
        ))}
      </div>
      {effect === 'wave' && (
        <div className="wave-config">
          <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
            value={config?.frequency ?? DEFAULT_WAVE.frequency}
            format={(v) => v.toFixed(3)}
            onChange={(v) => onPatchConfig({ frequency: v })} />
          <SliderRow label="Amp" min={0} max={40} step={1}
            value={config?.amplitude ?? DEFAULT_WAVE.amplitude}
            onChange={(v) => onPatchConfig({ amplitude: v })} />
        </div>
      )}
      <StyleControls config={config} onPatchConfig={onPatchConfig} />

      {onChangeEffects && (
        <>
          <div className="form-row form-row--stack">
            <label className="form-row__label">Edge effects</label>
          </div>
          <EffectsPicker
            catalogue={EDGE_EFFECTS}
            ownEffects={ownEffects}
            inheritedEffects={inheritedEffects}
            onChange={onChangeEffects}
          />
        </>
      )}
    </section>
  );
}
