import { useMemo } from 'react';
import SliderRow from '../SliderRow.jsx';
import StyleControls from './StyleControls.jsx';
import EffectsPicker from '../interactions/EffectsPicker.jsx';
import { EFFECT_NAMES, EDGE_EFFECTS } from '../../../puzzle';
import { piecesOfEdge, resolveEdgeEffects } from '../../../grid/compile.js';
import { DEFAULT_WAVE, MIXED, cap } from './constants.js';

// The accent card at the top of the Edges panel when one or more edges are
// selected. Resolves the effect/config for each selected edge through the
// cascade (per-edge > inner/outer layer > default), folds them into a
// `combo` (or MIXED), and lets the user retarget the whole selection.
export default function SelectedEdgeCard({
  selected,
  project,
  pieces,
  sharedEdges,
  onClearSelection,
  setEdgeEffect,
  setEdgeConfig,
  clearEdgeOverride,
  setEdgeEffects,
}) {
  const piecesById = useMemo(
    () => new Map(pieces.map((pc) => [pc.id, pc])),
    [pieces]
  );

  const defaultEffect = project.edges.default.effect;
  const defaultConfig = project.edges.default.config ?? DEFAULT_WAVE;
  const innerLayer    = project.edges.inner;
  const outerLayer    = project.edges.outer;
  const byPiece       = project.edges.byPiece || {};

  // Same priority chain as compile.js#resolveEdge:
  //   per-edge > cell (byPiece) > inner/outer > default
  const resolveSelected = (pk) => {
    const ov = project.edges.byEdge[pk];
    const isOuter = pk.includes('||outer-');
    const layer = isOuter ? outerLayer : innerLayer;

    let cell = null;
    for (const pid of piecesOfEdge(pk)) {
      if (byPiece[pid]) { cell = byPiece[pid]; break; }
    }

    return {
      effect: ov?.effect ?? cell?.effect ?? layer?.effect ?? defaultEffect,
      cfg:    ov?.config ?? cell?.config ?? layer?.config ?? defaultConfig,
    };
  };

  // Fold each selected edge's resolved effect/config into one combined value;
  // any property that disagrees across the selection is replaced with MIXED.
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
        if (cfg?.frequency      !== c?.frequency)      cfg = { ...cfg, frequency:      MIXED };
        if (cfg?.amplitude      !== c?.amplitude)      cfg = { ...cfg, amplitude:      MIXED };
        if (cfg?.inverted       !== c?.inverted)       cfg = { ...cfg, inverted:       MIXED };
        if (cfg?.color          !== c?.color)          cfg = { ...cfg, color:          MIXED };
        if (cfg?.opacity        !== c?.opacity)        cfg = { ...cfg, opacity:        MIXED };
        if (cfg?.strokeWidth    !== c?.strokeWidth)    cfg = { ...cfg, strokeWidth:    MIXED };
        if (cfg?.hoverAnimation !== c?.hoverAnimation) cfg = { ...cfg, hoverAnimation: MIXED };
      }
    }
    return { effect, cfg };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, project.edges.byEdge, byPiece, defaultEffect, defaultConfig, innerLayer, outerLayer]);

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

  const showInvert =
    combo?.effect === 'puzzle' ||
    (combo?.effect === MIXED && [...selected].some((pk) => resolveSelected(pk).effect === 'puzzle'));
  const showWaveConfig =
    combo?.effect === 'wave' ||
    (combo?.effect === MIXED && [...selected].some((pk) => resolveSelected(pk).effect === 'wave'));

  return (
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

      {showInvert && (
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

      {showWaveConfig && (
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

      <StyleControls config={combo?.cfg} onPatchConfig={applyConfig} />

      {setEdgeEffects && (() => {
        const pks = [...selected];
        const firstPk = pks[0];
        const isOuter = firstPk.includes('||outer-');
        const ownEffects = project.edges.byEdge[firstPk]?.effects || {};
        // Inherited effects = everything that would resolve at the per-edge
        // tier MINUS this tier's own. Build by resolving the cascade up to
        // (but not including) byEdge, which is what cells / layer / default
        // contribute beneath us.
        const layer = isOuter ? project.edges.outer : project.edges.inner;
        const cellTiers = piecesOfEdge(firstPk).map((id) => project.edges.byPiece?.[id]?.effects).filter(Boolean);
        const inheritedEffects = mergeAll(
          project.edges.default?.effects,
          layer?.effects,
          ...cellTiers,
        );
        // Multi-edit: detect mixed across selected edges by comparing each
        // edge's own effects map against the first one.
        const mixed = pks.length > 1 && pks.some((pk) =>
          !sameJSON(project.edges.byEdge[pk]?.effects || {}, ownEffects)
        );
        return (
          <>
            <div className="form-row form-row--stack">
              <label className="form-row__label">Edge effects</label>
            </div>
            <EffectsPicker
              catalogue={EDGE_EFFECTS}
              ownEffects={ownEffects}
              inheritedEffects={inheritedEffects}
              mixed={mixed}
              onChange={(map) => { for (const pk of pks) setEdgeEffects(pk, map); }}
            />
          </>
        );
      })()}

      <div className="action-stack">
        <button type="button" className="action-btn action-btn--ghost" onClick={resetSelected}>
          Reset {selected.size === 1 ? 'this edge' : `these ${selected.size} edges`} to default
        </button>
      </div>
    </section>
  );
}

function mergeAll(...maps) {
  const out = {};
  for (const m of maps) {
    if (!m) continue;
    for (const [k, v] of Object.entries(m)) {
      if (v === null) delete out[k];
      else            out[k] = v;
    }
  }
  return out;
}

function sameJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
