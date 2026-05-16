import EdgeTierEditor from './EdgeTierEditor.jsx';
import CellTierEditor from './CellTierEditor.jsx';
import { DEFAULT_WAVE } from '../edges/constants.js';

// Body of the "Default" accordion card. The Inner / Outer / Piece / Edge
// tiers are owned by Inspector.jsx as sibling accordion cards now, so this
// component only renders the project-wide default editors.
export default function ProjectDefaultsCard({
  project,
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  setDefaultCellEffects,
}) {
  const defaultEdge = project.edges.default;
  const defaultEdgeEffect = defaultEdge.effect;
  const defaultEdgeConfig = defaultEdge.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = defaultEdge.effects || {};

  const defaultCellEffects = project?.cells?.default?.effects || {};

  return (
    <>
      <EdgeTierEditor
        title="Default edges"
        accent
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
        accent
        ownEffects={defaultCellEffects}
        inheritedEffects={{}}
        onChange={setDefaultCellEffects}
      />
    </>
  );
}
