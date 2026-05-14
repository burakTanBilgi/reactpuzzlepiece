import HintCard from './edges/HintCard.jsx';
import LayerCard from './edges/LayerCard.jsx';
import SelectedEdgeCard from './edges/SelectedEdgeCard.jsx';
import SelectedPieceCard from './edges/SelectedPieceCard.jsx';
import WaveDivider from './meta/WaveDivider.jsx';
import { DEFAULT_WAVE } from './edges/constants.js';

// Side-panel UI for the Edges mode of the Edit page. Pure presentation —
// shared selection state lives on the parent. This file is just an
// orchestrator: each card (Hint / Selected* / Layer) is its own component.
//
// Effect/config resolution chain (highest priority first):
//   per-edge override (byEdge)  >  cell (byPiece)  >  inner/outer layer  >  default
//
// Top of panel ordering (mutually exclusive — parent enforces that edge
// selection and piece selection can't both be non-empty):
//   No selection      → HintCard
//   Edge(s) selected  → SelectedEdgeCard
//   Piece selected    → SelectedPieceCard
//
// Layer cards (below the top card) only appear when their kind is in scope:
//   Edge selection : filter by inner/outer kinds in the selection
//   Piece selection: filter by inner/outer kinds the piece actually has
//   No selection   : neither layer shown — only the Default card sits beneath.
export default function EdgesPanel({
  project, pieces, sharedEdges, allEdges,
  // edge selection
  selected, onClearEdgeSelection,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, resetEdgeOverrides,
  // piece selection
  selectedPiece, onClearPieceSelection,
  setPieceEdgeEffect, setPieceEdgeConfig, clearPieceEdgeOverride,
  // default + layers (effect + style cascade)
  setDefaultEdgeEffect, setDefaultEdgeConfig,
  setLayerEffect, setLayerConfig, clearLayer,
  // hover/click animation effects (v2 cascade) — one map setter per tier
  setDefaultEdgeEffects, setLayerEffects, setPieceEdgeEffects, setEdgeEffects,
}) {
  const defaultEffect  = project.edges.default.effect;
  const defaultConfig  = project.edges.default.config ?? DEFAULT_WAVE;
  const innerLayer     = project.edges.inner;
  const outerLayer     = project.edges.outer;
  const overrideCount  = Object.keys(project.edges.byEdge).length;
  const cellOverrideCount = Object.keys(project.edges.byPiece || {}).length;

  // Effect-map cascades — passed to each tier card so it can show its own
  // entries plus the inherited baseline (read-only, ghosted in the picker).
  const defaultEdgeEffects = project.edges.default.effects || {};
  const innerEffects       = project.edges.inner?.effects   || {};
  const outerEffects       = project.edges.outer?.effects   || {};

  const hasEdgeSelection  = selected.size > 0;
  const hasPieceSelection = !!selectedPiece;

  // Which layer cards should appear beneath the top card.
  const showInnerLayer = hasEdgeSelection
    ? [...selected].some((pk) => !pk.includes('||outer-'))
    : hasPieceSelection
      ? allEdges.some((e) => !e.isOuter && (e.pieceAId === selectedPiece.id || e.pieceBId === selectedPiece.id))
      : false;
  const showOuterLayer = hasEdgeSelection
    ? [...selected].some((pk) => pk.includes('||outer-'))
    : hasPieceSelection
      ? allEdges.some((e) => e.isOuter && e.pieceId === selectedPiece.id)
      : false;

  const defaultCard = (
    <LayerCard
      title="Default effect"
      hint="Applied to every edge unless overridden below."
      effect={defaultEffect}
      config={defaultConfig}
      onSetEffect={(name) => setDefaultEdgeEffect(name, name === 'wave' ? defaultConfig : undefined)}
      onPatchConfig={setDefaultEdgeConfig}
      ownEffects={defaultEdgeEffects}
      inheritedEffects={{}}
      onChangeEffects={setDefaultEdgeEffects}
    />
  );

  const innerCard = (
    <LayerCard
      title="Inner edges"
      hint={innerLayer
        ? 'Override applied to every shared edge. Cell + per-edge picks still win.'
        : 'No override — inner edges follow the default. Pick an effect to override.'}
      effect={innerLayer?.effect ?? defaultEffect}
      config={innerLayer?.config ?? defaultConfig}
      active={!!innerLayer}
      onSetEffect={(name) => setLayerEffect('inner', name, name === 'wave' ? (innerLayer?.config ?? defaultConfig) : undefined)}
      onPatchConfig={(patch) => setLayerConfig('inner', patch)}
      onClear={innerLayer ? () => clearLayer('inner') : null}
      ownEffects={innerEffects}
      inheritedEffects={defaultEdgeEffects}
      onChangeEffects={(map) => setLayerEffects('inner', map)}
    />
  );

  const outerCard = (
    <LayerCard
      title="Outer edges"
      hint={outerLayer
        ? 'Override applied to every outer edge. Cell + per-edge picks still win.'
        : 'No override — outer edges follow the default. Pick an effect to override.'}
      effect={outerLayer?.effect ?? defaultEffect}
      config={outerLayer?.config ?? defaultConfig}
      active={!!outerLayer}
      onSetEffect={(name) => setLayerEffect('outer', name, name === 'wave' ? (outerLayer?.config ?? defaultConfig) : undefined)}
      onPatchConfig={(patch) => setLayerConfig('outer', patch)}
      onClear={outerLayer ? () => clearLayer('outer') : null}
      ownEffects={outerEffects}
      inheritedEffects={defaultEdgeEffects}
      onChangeEffects={(map) => setLayerEffects('outer', map)}
    />
  );

  const topCard = hasEdgeSelection ? (
    <SelectedEdgeCard
      selected={selected}
      project={project}
      pieces={pieces}
      sharedEdges={sharedEdges}
      onClearSelection={onClearEdgeSelection}
      setEdgeEffect={setEdgeEffect}
      setEdgeConfig={setEdgeConfig}
      clearEdgeOverride={clearEdgeOverride}
      setEdgeEffects={setEdgeEffects}
    />
  ) : hasPieceSelection ? (
    <SelectedPieceCard
      piece={selectedPiece}
      project={project}
      onClearSelection={onClearPieceSelection}
      setPieceEdgeEffect={setPieceEdgeEffect}
      setPieceEdgeConfig={setPieceEdgeConfig}
      clearPieceEdgeOverride={clearPieceEdgeOverride}
      setPieceEdgeEffects={setPieceEdgeEffects}
    />
  ) : (
    <HintCard />
  );

  const hasAnyOverride = overrideCount > 0 || cellOverrideCount > 0;

  return (
    <>
      {topCard}

      <WaveDivider amplitude={3} height={10} />

      {!hasEdgeSelection && !hasPieceSelection && defaultCard}
      {showInnerLayer && innerCard}
      {showOuterLayer && outerCard}
      {(hasEdgeSelection || hasPieceSelection) && defaultCard}

      {hasAnyOverride && (
        <div className="action-stack">
          <button type="button" className="action-btn action-btn--ghost" onClick={resetEdgeOverrides}>
            Clear all overrides
          </button>
        </div>
      )}
    </>
  );
}
