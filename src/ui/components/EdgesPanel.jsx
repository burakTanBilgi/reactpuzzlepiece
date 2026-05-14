import HintCard from './edges/HintCard.jsx';
import LayerCard from './edges/LayerCard.jsx';
import SelectedEdgeCard from './edges/SelectedEdgeCard.jsx';
import { DEFAULT_WAVE } from './edges/constants.js';

// Side-panel UI for the Edges mode of the Edit page. Pure presentation —
// shared selection state lives on the parent. This file is just an
// orchestrator: each card (Hint / Selected / Layer) is its own component.
//
// Effect/config resolution chain (highest priority first):
//   per-edge override (selected) > inner/outer layer > default
//
// Ordering rules:
//   No selection:  Hint     → Default
//   Inner only:    Selected → Inner   → Default
//   Outer only:    Selected → Outer   → Default
//   Mixed:         Selected → Inner   → Outer  → Default
// Layer cards only surface when their kind is in the selection — keeps the
// no-selection state minimal and matches the resolution order top-down.
export default function EdgesPanel({
  project, pieces, sharedEdges, allEdges,
  selected, onClearSelection, onSelectAll,
  setDefaultEdgeEffect, setDefaultEdgeConfig,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, resetEdgeOverrides,
  setLayerEffect, setLayerConfig, clearLayer,
}) {
  const defaultEffect  = project.edges.default.effect;
  const defaultConfig  = project.edges.default.config ?? DEFAULT_WAVE;
  const innerLayer     = project.edges.inner;
  const outerLayer     = project.edges.outer;
  const overrideCount  = Object.keys(project.edges.byEdge).length;

  const hasInnerSelected = [...selected].some((pk) => !pk.includes('||outer-'));
  const hasOuterSelected = [...selected].some((pk) =>  pk.includes('||outer-'));
  const hasSelection     = selected.size > 0;

  const defaultCard = (
    <LayerCard
      title="Default effect"
      hint="Applied to every edge unless overridden below."
      effect={defaultEffect}
      config={defaultConfig}
      onSetEffect={(name) => setDefaultEdgeEffect(name, name === 'wave' ? defaultConfig : undefined)}
      onPatchConfig={setDefaultEdgeConfig}
    />
  );

  const innerCard = (
    <LayerCard
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
  );

  const outerCard = (
    <LayerCard
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
  );

  return (
    <>
      {hasSelection ? (
        <SelectedEdgeCard
          selected={selected}
          project={project}
          pieces={pieces}
          sharedEdges={sharedEdges}
          onClearSelection={onClearSelection}
          setEdgeEffect={setEdgeEffect}
          setEdgeConfig={setEdgeConfig}
          clearEdgeOverride={clearEdgeOverride}
        />
      ) : (
        <HintCard />
      )}

      {!hasSelection      && defaultCard}
      {hasInnerSelected   && innerCard}
      {hasOuterSelected   && outerCard}
      {hasSelection       && defaultCard}

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
