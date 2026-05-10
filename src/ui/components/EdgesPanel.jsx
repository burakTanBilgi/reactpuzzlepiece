import { useMemo } from 'react';
import { EFFECT_NAMES } from '../../puzzle';
import SliderRow from './SliderRow.jsx';

const DEFAULT_WAVE = { frequency: 0.025, amplitude: 12, phase: 0 };
const MIXED = '__mixed__';

// Side-panel UI for the Edges mode of the Edit page. Pure presentation —
// shared selection state lives on the parent.
//
// Effect/config resolution chain (highest priority first):
//   per-edge override (selected) > inner/outer layer > default
export default function EdgesPanel({
  project, pieces, sharedEdges, allEdges,
  selected, onClearSelection, onSelectAll,
  setDefaultEdgeEffect, setDefaultEdgeConfig,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, resetEdgeOverrides,
  setLayerEffect, setLayerConfig, clearLayer,
}) {
  const p = project;
  const defaultEffect = p.edges.default.effect;
  const defaultConfig = p.edges.default.config ?? DEFAULT_WAVE;
  const innerLayer = p.edges.inner;       // null if no override
  const outerLayer = p.edges.outer;
  const overrideCount = Object.keys(p.edges.byEdge).length;
  const piecesById = useMemo(() => new Map(pieces.map((pc) => [pc.id, pc])), [pieces]);

  // Resolve the "current" effect/config of an edge using the same priority
  // chain as the renderer: per-edge override > inner/outer layer > default.
  const resolveSelected = (pk) => {
    const ov = p.edges.byEdge[pk];
    const isOuter = pk.includes('||outer-');
    const layer = isOuter ? outerLayer : innerLayer;
    return {
      effect: ov?.effect ?? layer?.effect ?? defaultEffect,
      cfg:    ov?.config ?? layer?.config ?? defaultConfig,
    };
  };

  const combo = useMemo(() => {
    if (selected.size === 0) return null;
    let effect = null;
    let cfg = null;
    let first = true;
    for (const pk of selected) {
      const { effect: e, cfg: c } = resolveSelected(pk);
      if (first) { effect = e; cfg = c; first = false; }
      else {
        if (e !== effect) effect = MIXED;
        if (cfg?.frequency !== c?.frequency) cfg = { ...cfg, frequency: MIXED };
        if (cfg?.amplitude !== c?.amplitude) cfg = { ...cfg, amplitude: MIXED };
        if (cfg?.inverted !== c?.inverted)   cfg = { ...cfg, inverted: MIXED };
      }
    }
    return { effect, cfg };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, p.edges.byEdge, defaultEffect, defaultConfig, innerLayer, outerLayer]);

  const applyEffect = (name) => {
    const cfg = name === 'wave'
      ? (combo?.cfg && combo.cfg.frequency !== MIXED && combo.cfg.amplitude !== MIXED
          ? combo.cfg : defaultConfig)
      : undefined;
    for (const pk of selected) setEdgeEffect(pk, name, cfg);
  };
  const applyConfig = (patch) => {
    for (const pk of selected) setEdgeConfig(pk, patch);
  };
  const resetSelected = () => {
    for (const pk of selected) clearEdgeOverride(pk);
  };

  return (
    <>
      <EffectCard
        title="Default effect"
        hint="Applied to every edge unless overridden below."
        effect={defaultEffect}
        config={defaultConfig}
        onSetEffect={(name) => setDefaultEdgeEffect(name, name === 'wave' ? defaultConfig : undefined)}
        onPatchConfig={setDefaultEdgeConfig}
      />

      <EffectCard
        title="Inner edges"
        hint={innerLayer
          ? 'Override applied to every shared edge. Per-edge picks still win.'
          : 'No override — inner edges follow the default. Pick an effect to override.'}
        effect={innerLayer?.effect ?? defaultEffect}
        config={innerLayer?.config ?? defaultConfig}
        active={!!innerLayer}
        onSetEffect={(name) => setLayerEffect('inner', name, name === 'wave' ? (innerLayer?.config ?? defaultConfig) : undefined)}
        onPatchConfig={(patch) => setLayerConfig('inner', patch)}
        onClear={innerLayer ? () => clearLayer('inner') : null}
      />

      <EffectCard
        title="Outer edges"
        hint={outerLayer
          ? 'Override applied to every outer edge. Per-edge picks still win.'
          : 'No override — outer edges follow the default. Pick an effect to override.'}
        effect={outerLayer?.effect ?? defaultEffect}
        config={outerLayer?.config ?? defaultConfig}
        active={!!outerLayer}
        onSetEffect={(name) => setLayerEffect('outer', name, name === 'wave' ? (outerLayer?.config ?? defaultConfig) : undefined)}
        onPatchConfig={(patch) => setLayerConfig('outer', patch)}
        onClear={outerLayer ? () => clearLayer('outer') : null}
      />

      {selected.size > 0 ? (
        <section className="card card--accent">
          <div className="card__row">
            <h3 className="card__title">
              {selected.size === 1 ? 'Selected edge' : `${selected.size} edges selected`}
            </h3>
            <button type="button" className="link-btn" onClick={onClearSelection}>clear</button>
          </div>

          {selected.size === 1 && (() => {
            const pk = [...selected][0];
            const e = sharedEdges.find((x) => x.pairKey === pk);
            if (!e) return null;
            return (
              <p className="hint">
                {piecesById.get(e.pieceAId)?.label ?? e.pieceAId}
                {' ↔ '}
                {piecesById.get(e.pieceBId)?.label ?? e.pieceBId}
              </p>
            );
          })()}

          <div className="effect-chips">
            {EFFECT_NAMES.map((name) => (
              <button key={name} type="button"
                className={`chip chip--sm ${combo?.effect === name ? 'chip--active' : ''}`}
                onClick={() => applyEffect(name)}>
                {cap(name)}
              </button>
            ))}
            {combo?.effect === MIXED && (
              <span className="chip chip--sm chip--mixed">mixed</span>
            )}
          </div>

          {(combo?.effect === 'puzzle' ||
            (combo?.effect === MIXED && [...selected].some((pk) => resolveSelected(pk).effect === 'puzzle'))) && (
            <div className="puzzle-config">
              <button type="button"
                className={`invert-tabs-btn ${combo?.cfg?.inverted === true ? 'invert-tabs-btn--active' : ''}`}
                onClick={() => applyConfig({ inverted: !(combo?.cfg?.inverted === true) })}
                title="Toggle tab/socket orientation">
                <span className="invert-tabs-btn__icon">⟷</span>
                <span>Invert</span>
              </button>
            </div>
          )}

          {(combo?.effect === 'wave' ||
            (combo?.effect === MIXED && [...selected].some((pk) => resolveSelected(pk).effect === 'wave'))) && (
            <div className="wave-config">
              <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
                value={combo?.cfg?.frequency === MIXED
                  ? (defaultConfig.frequency ?? DEFAULT_WAVE.frequency)
                  : (combo?.cfg?.frequency ?? DEFAULT_WAVE.frequency)}
                format={(v) => combo?.cfg?.frequency === MIXED ? `· ${v.toFixed(3)}` : v.toFixed(3)}
                onChange={(v) => applyConfig({ frequency: v })} />
              <SliderRow label="Amp" min={0} max={40} step={1}
                value={combo?.cfg?.amplitude === MIXED
                  ? (defaultConfig.amplitude ?? DEFAULT_WAVE.amplitude)
                  : (combo?.cfg?.amplitude ?? DEFAULT_WAVE.amplitude)}
                format={(v) => combo?.cfg?.amplitude === MIXED ? `· ${v}` : `${v}`}
                onChange={(v) => applyConfig({ amplitude: v })} />
            </div>
          )}

          <div className="action-stack">
            <button type="button" className="action-btn action-btn--ghost" onClick={resetSelected}>
              Reset {selected.size === 1 ? 'this edge' : `these ${selected.size} edges`} to default
            </button>
          </div>
        </section>
      ) : (
        <section className="card">
          <h3 className="card__title">Per-edge override</h3>
          <p className="hint">
            Click an edge in the canvas to give it its own effect.
            <br/>Shift-click to select multiple edges and edit them together.
          </p>
        </section>
      )}

      <div className="action-stack">
        <button type="button" className="action-btn action-btn--ghost"
          onClick={onSelectAll} disabled={allEdges.length === 0}>
          Select all edges
        </button>
        {overrideCount > 0 && (
          <button type="button" className="action-btn action-btn--ghost" onClick={resetEdgeOverrides}>
            Clear all {overrideCount} override{overrideCount === 1 ? '' : 's'}
          </button>
        )}
      </div>
    </>
  );
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// A small re-usable card for setting effect + wave config (used by Default,
// Inner, Outer). When `active` is true the card visually highlights as an
// override layer; `onClear` shows a "use default" link if provided.
function EffectCard({ title, hint, effect, config, active, onSetEffect, onPatchConfig, onClear }) {
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
    </section>
  );
}
