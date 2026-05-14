import SliderRow from '../SliderRow.jsx';
import StyleControls from './StyleControls.jsx';
import AnimationChips from '../interactions/AnimationChips.jsx';
import { EDGE_ANIMATIONS } from '../interactions/animations.js';
import { EFFECT_NAMES } from '../../../puzzle';
import { DEFAULT_WAVE, cap } from './constants.js';

// The accent card shown when a single piece is selected in Edges mode.
// Bulk-edits the piece's `byPiece` (cell-tier) override — applies to every
// edge of the piece in one go.
//
// Resolution priority (top of cell tier):
//   per-edge override (byEdge[pairKey])  >  cell (this card)  >  inner/outer  >  default
// So per-edge picks still win over the cell-tier value set here.
export default function SelectedPieceCard({
  piece,
  project,
  onClearSelection,
  setPieceEdgeEffect,
  setPieceEdgeConfig,
  clearPieceEdgeOverride,
}) {
  const defaultEffect = project.edges.default.effect;
  const defaultConfig = project.edges.default.config ?? DEFAULT_WAVE;
  const cellOverride  = project.edges.byPiece?.[piece.id] || null;

  // What's currently active for this piece — the byPiece entry if it exists,
  // else fall back to the project default. (We don't synthesise a per-edge
  // "mixed" view: the layers/byEdge below the cell tier can still vary,
  // but the cell tier itself is always one value.)
  const effect = cellOverride?.effect ?? defaultEffect;
  const config = cellOverride?.config ?? defaultConfig;

  const applyEffect = (name) => {
    const cfg = name === 'wave'
      ? (cellOverride?.config ?? defaultConfig)
      : undefined;
    setPieceEdgeEffect(piece.id, name, cfg);
  };
  const applyConfig = (patch) => setPieceEdgeConfig(piece.id, patch);
  const resetCell   = () => clearPieceEdgeOverride(piece.id);

  return (
    <section className="card card--accent">
      <div className="card__row">
        <h3 className="card__title">{piece.label || 'Selected piece'}</h3>
        <button type="button" className="link-btn" onClick={onClearSelection}>clear</button>
      </div>

      <p className="hint">
        {cellOverride
          ? 'Cell override applies to every edge of this piece. Per-edge picks still win.'
          : 'Pick an effect to override every edge of this piece at once.'}
      </p>

      <div className="effect-chips">
        {EFFECT_NAMES.map((name) => (
          <button key={name} type="button"
            className={`chip chip--sm ${effect === name ? 'chip--active' : ''}`}
            onClick={() => applyEffect(name)}>
            {cap(name)}
          </button>
        ))}
      </div>

      {effect === 'puzzle' && (
        <div className="puzzle-config">
          <button type="button"
            className={`invert-tabs-btn ${config?.inverted === true ? 'invert-tabs-btn--active' : ''}`}
            onClick={() => applyConfig({ inverted: !(config?.inverted === true) })}
            title="Toggle tab/socket orientation">
            <span className="invert-tabs-btn__icon">⟷</span>
            <span>Invert</span>
          </button>
        </div>
      )}

      {effect === 'wave' && (
        <div className="wave-config">
          <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
            value={config?.frequency ?? DEFAULT_WAVE.frequency}
            format={(v) => v.toFixed(3)}
            onChange={(v) => applyConfig({ frequency: v })} />
          <SliderRow label="Amp" min={0} max={40} step={1}
            value={config?.amplitude ?? DEFAULT_WAVE.amplitude}
            onChange={(v) => applyConfig({ amplitude: v })} />
        </div>
      )}

      <StyleControls config={config} onPatchConfig={applyConfig} />

      <div className="form-row form-row--stack">
        <label className="form-row__label">Hover</label>
        <AnimationChips
          options={EDGE_ANIMATIONS}
          active={config?.hoverAnimation || 'none'}
          onSelect={(id) => applyConfig({ hoverAnimation: id === 'none' ? null : id })}
        />
      </div>

      {cellOverride && (
        <div className="action-stack">
          <button type="button" className="action-btn action-btn--ghost" onClick={resetCell}>
            Reset this piece's edges to default
          </button>
        </div>
      )}
    </section>
  );
}
