import EdgeTierEditor from './EdgeTierEditor.jsx';
import CellTierEditor from './CellTierEditor.jsx';
import { DEFAULT_WAVE } from '../edges/constants.js';

// Inspector view shown when nothing is selected on the canvas. Surfaces the
// project-wide defaults plus any inner/outer layer overrides. Clicking a
// cascade strip pill toggles the corresponding tier — `expandedTier` from
// the parent decides which non-default tier is currently open.
export default function ProjectDefaultsCard({
  project,
  expandedTier, // 'default' | 'inner' | 'outer' | null
  // edge setters
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  setLayerEffect, setLayerConfig, clearLayer, setLayerEffects,
  // cell setters
  setDefaultCellEffects,
}) {
  const defaultEdge = project.edges.default;
  const defaultEdgeEffect = defaultEdge.effect;
  const defaultEdgeConfig = defaultEdge.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = defaultEdge.effects || {};

  const innerLayer = project.edges.inner;
  const outerLayer = project.edges.outer;

  const defaultCellEffects = project?.cells?.default?.effects || {};

  return (
    <>
      <div className="inspector-header">
        <h3 className="inspector-header__title">Project defaults</h3>
        <span className="inspector-header__sub">applied to every piece unless overridden</span>
      </div>

      <EdgeTierEditor
        title="Default edges"
        accent={expandedTier === 'default'}
        effect={defaultEdgeEffect}
        config={defaultEdgeConfig}
        ownEffects={defaultEdgeEffects}
        inheritedEffects={{}}
        onSetEffect={(name) => setDefaultEdgeEffect(name, name === 'wave' ? defaultEdgeConfig : undefined)}
        onPatchConfig={setDefaultEdgeConfig}
        onChangeEffects={setDefaultEdgeEffects}
      />

      <CellTierEditor
        title="Default body"
        accent={expandedTier === 'default'}
        ownEffects={defaultCellEffects}
        inheritedEffects={{}}
        onChange={setDefaultCellEffects}
      />

      {expandedTier === 'inner' && (
        <EdgeTierEditor
          title="Inner edges"
          accent
          effect={innerLayer?.effect ?? defaultEdgeEffect}
          config={innerLayer?.config ?? defaultEdgeConfig}
          ownEffects={innerLayer?.effects || {}}
          inheritedEffects={defaultEdgeEffects}
          onSetEffect={(name) => setLayerEffect('inner', name, name === 'wave' ? (innerLayer?.config ?? defaultEdgeConfig) : undefined)}
          onPatchConfig={(patch) => setLayerConfig('inner', patch)}
          onChangeEffects={(map) => setLayerEffects('inner', map)}
          onClear={innerLayer ? () => clearLayer('inner') : null}
        />
      )}

      {expandedTier === 'outer' && (
        <EdgeTierEditor
          title="Outer edges"
          accent
          effect={outerLayer?.effect ?? defaultEdgeEffect}
          config={outerLayer?.config ?? defaultEdgeConfig}
          ownEffects={outerLayer?.effects || {}}
          inheritedEffects={defaultEdgeEffects}
          onSetEffect={(name) => setLayerEffect('outer', name, name === 'wave' ? (outerLayer?.config ?? defaultEdgeConfig) : undefined)}
          onPatchConfig={(patch) => setLayerConfig('outer', patch)}
          onChangeEffects={(map) => setLayerEffects('outer', map)}
          onClear={outerLayer ? () => clearLayer('outer') : null}
        />
      )}
    </>
  );
}
