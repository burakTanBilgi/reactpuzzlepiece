import { useState } from 'react';
import { EFFECT_NAMES } from '../../puzzle';
import ViewPanel from '../components/ViewPanel.jsx';

const DEFAULT_WAVE = { frequency: 0.025, amplitude: 12, phase: 0 };

export default function EdgeEditorPage({ project }) {
  const {
    project: p,
    pieces,
    sharedEdges,
    setDefaultEdgeEffect,
    setDefaultEdgeConfig,
    setEdgeEffect,
    setEdgeConfig,
    clearEdgeOverride,
    resetEdgeOverrides,
  } = project;
  const [selectedEdge, setSelectedEdge] = useState(null);

  if (!p) return null;

  const defaultEffect = p.edges.default.effect;
  const defaultConfig = p.edges.default.config ?? DEFAULT_WAVE;

  const overrideCount = Object.keys(p.edges.byEdge).length;

  const selEdge = sharedEdges.find((e) => e.pairKey === selectedEdge) || null;
  const selOverride = selEdge ? p.edges.byEdge[selEdge.pairKey] : null;
  const selEffect = selOverride?.effect ?? defaultEffect;
  const selConfig = selOverride?.config ?? defaultConfig;

  const piecesById = new Map(pieces.map((pc) => [pc.id, pc]));

  return (
    <div className="page-edges">
      <aside className="side-tools">
        {/* Default effect */}
        <section className="card">
          <h3 className="card__title">Default effect</h3>
          <p className="hint">Applied to every shared edge unless overridden.</p>
          <div className="effect-chips">
            {EFFECT_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                className={`chip chip--sm ${defaultEffect === name ? 'chip--active' : ''}`}
                onClick={() => setDefaultEdgeEffect(name, name === 'wave' ? defaultConfig : undefined)}
              >
                {cap(name)}
              </button>
            ))}
          </div>
          {defaultEffect === 'wave' && (
            <div className="wave-config">
              <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
                value={defaultConfig.frequency ?? DEFAULT_WAVE.frequency}
                format={(v) => v.toFixed(3)}
                onChange={(v) => setDefaultEdgeConfig({ frequency: v })} />
              <SliderRow label="Amp" min={0} max={40} step={1}
                value={defaultConfig.amplitude ?? DEFAULT_WAVE.amplitude}
                onChange={(v) => setDefaultEdgeConfig({ amplitude: v })} />
            </div>
          )}
        </section>

        {/* Per-edge */}
        <section className="card">
          <h3 className="card__title">Edges ({sharedEdges.length})</h3>
          {sharedEdges.length === 0 && (
            <p className="hint">No shared edges yet — go to the Grid page to lay out cells.</p>
          )}
          <div className="edge-list">
            {sharedEdges.map((e) => {
              const a = piecesById.get(e.pieceAId)?.label ?? e.pieceAId;
              const b = piecesById.get(e.pieceBId)?.label ?? e.pieceBId;
              const isOverridden = !!p.edges.byEdge[e.pairKey];
              return (
                <button
                  key={e.pairKey}
                  type="button"
                  className={`edge-list__item ${selectedEdge === e.pairKey ? 'edge-list__item--active' : ''}`}
                  onClick={() => setSelectedEdge(e.pairKey === selectedEdge ? null : e.pairKey)}
                >
                  <span className="edge-list__pair">
                    {a} <span className="edge-list__arrow">↔</span> {b}
                  </span>
                  <span className={`edge-list__fx ${isOverridden ? 'edge-list__fx--override' : ''}`}>
                    {isOverridden ? cap(p.edges.byEdge[e.pairKey].effect) : '·'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected edge override */}
        {selEdge && (
          <section className="card">
            <h3 className="card__title">Selected edge</h3>
            <p className="hint">
              {piecesById.get(selEdge.pieceAId)?.label ?? selEdge.pieceAId}
              {' ↔ '}
              {piecesById.get(selEdge.pieceBId)?.label ?? selEdge.pieceBId}
            </p>
            <div className="effect-chips">
              {EFFECT_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`chip chip--sm ${selEffect === name ? 'chip--active' : ''}`}
                  onClick={() => setEdgeEffect(selEdge.pairKey, name, name === 'wave' ? selConfig : undefined)}
                >
                  {cap(name)}
                </button>
              ))}
            </div>
            {selEffect === 'wave' && (
              <div className="wave-config">
                <SliderRow label="Freq" min={0.005} max={0.1} step={0.001}
                  value={selConfig.frequency ?? DEFAULT_WAVE.frequency}
                  format={(v) => v.toFixed(3)}
                  onChange={(v) => setEdgeConfig(selEdge.pairKey, { frequency: v })} />
                <SliderRow label="Amp" min={0} max={40} step={1}
                  value={selConfig.amplitude ?? DEFAULT_WAVE.amplitude}
                  onChange={(v) => setEdgeConfig(selEdge.pairKey, { amplitude: v })} />
              </div>
            )}
            {selOverride && (
              <button type="button" className="action-btn action-btn--ghost"
                onClick={() => clearEdgeOverride(selEdge.pairKey)}>
                Reset to default
              </button>
            )}
          </section>
        )}

        {overrideCount > 0 && (
          <button
            type="button"
            className="action-btn action-btn--ghost"
            onClick={resetEdgeOverrides}
          >
            Clear all {overrideCount} override{overrideCount === 1 ? '' : 's'}
          </button>
        )}
      </aside>

      <ViewPanel pieces={pieces} effect={defaultEffect} effectConfig={defaultConfig} />
    </div>
  );
}

function SliderRow({ label, min, max, step, value, format, onChange }) {
  return (
    <label className="slider-control">
      <span className="slider-control__label">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} />
      <output className="slider-control__value">{format ? format(value) : value}</output>
    </label>
  );
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
