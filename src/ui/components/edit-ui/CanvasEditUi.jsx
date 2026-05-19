import { useState } from 'react';
import NavRail from './NavRail.jsx';
import FloatingPanel from './FloatingPanel.jsx';
import PieceInspector from '../inspector/PieceInspector.jsx';
import EdgeInspector from '../inspector/EdgeInspector.jsx';
import ProjectDefaultsCard from '../inspector/ProjectDefaultsCard.jsx';
import EdgeTierEditor from '../inspector/EdgeTierEditor.jsx';
import { SubcardAccordion } from '../inspector/SubcardAccordionContext.jsx';
import { DEFAULT_WAVE } from '../edges/constants.js';

const DRAWER_TIERS = [
  { id: 'default', label: 'Default' },
  { id: 'inner',   label: 'Inner'   },
  { id: 'outer',   label: 'Outer'   },
];

const DRAWER_TITLES = {
  default: 'Project defaults',
  inner:   'Inner edges',
  outer:   'Outer edges',
};

// Canvas-first Edit UI (Direction A). A slim left nav, the rest is
// canvas + ViewPanel. Selection drives floating panels overlaid on the
// canvas. The project defaults open via a separate left-side drawer.
export default function CanvasEditUi({
  canvas,
  // selection
  selectedEdges,
  selectedPieceId,
  selectedPiece,
  onClearPieceSelection,
  onClearEdgeSelection,
  // hover/click toggles
  hoverFxEnabled, onToggleHover,
  clickFxEnabled, onToggleClick,
  // overrides
  hasOverrides, onClearOverrides,
  // mode picker
  modePickerSlot,
  // project + actions (forwarded to inspectors)
  project,
  pieces,
  sharedEdges,
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  setLayerEffect, setLayerConfig, clearLayer, setLayerEffects,
  setPieceEdgeEffect, setPieceEdgeConfig, setPieceEdgeEffects, clearPieceEdgeOverride,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, setEdgeEffects,
  setPieceContent, updatePieceContent,
  setDefaultCellEffects, setCellEffects,
}) {
  const [defaultsOpen, setDefaultsOpen] = useState(false);
  const [defaultsTier, setDefaultsTier] = useState('default');
  const [pieceTab, setPieceTab] = useState('edges');

  const pieceSelected = !!selectedPieceId && !!selectedPiece;
  const edgeSelected  = selectedEdges?.size > 0;

  const edges = project.edges;
  const defaultEdgeEffect  = edges.default.effect;
  const defaultEdgeConfig  = edges.default.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = edges.default.effects || {};

  const closeDrawer = () => { setDefaultsOpen(false); setDefaultsTier('default'); };

  return (
    <div className="canvas-edit-ui">
      <NavRail
        hoverFxEnabled={hoverFxEnabled}
        onToggleHover={onToggleHover}
        clickFxEnabled={clickFxEnabled}
        onToggleClick={onToggleClick}
        hasOverrides={hasOverrides}
        onClearOverrides={onClearOverrides}
        defaultsOpen={defaultsOpen}
        onToggleDefaults={() => setDefaultsOpen((v) => !v)}
        modePickerSlot={modePickerSlot}
      />

      <div className="canvas-edit-ui__viewport">
        {canvas}

        {defaultsOpen && (
          <FloatingPanel
            title={DRAWER_TITLES[defaultsTier]}
            placement="left-sheet"
            onClose={closeDrawer}
          >
            <div className="canvas-defaults__tiers" role="tablist" aria-label="Tier">
              {DRAWER_TIERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={defaultsTier === t.id}
                  className={`canvas-defaults__pill${defaultsTier === t.id ? ' canvas-defaults__pill--active' : ''}`}
                  onClick={() => setDefaultsTier(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {defaultsTier === 'default' && (
              <ProjectDefaultsCard
                project={project}
                setDefaultEdgeEffect={setDefaultEdgeEffect}
                setDefaultEdgeConfig={setDefaultEdgeConfig}
                setDefaultEdgeEffects={setDefaultEdgeEffects}
                setDefaultCellEffects={setDefaultCellEffects}
              />
            )}

            {(defaultsTier === 'inner' || defaultsTier === 'outer') && (() => {
              const kind = defaultsTier;
              const layer = edges[kind];
              return (
                <SubcardAccordion id={kind} defaultOpenId="shape-stroke">
                  <EdgeTierEditor
                    title={kind === 'inner' ? 'Inner edges' : 'Outer edges'}
                    accent
                    effect={layer?.effect ?? defaultEdgeEffect}
                    config={layer?.config ?? defaultEdgeConfig}
                    ownEffects={layer?.effects || {}}
                    inheritedEffects={defaultEdgeEffects}
                    onSetEffect={(name) => setLayerEffect(kind, name, name === 'wave'
                      ? (layer?.config ?? defaultEdgeConfig) : undefined)}
                    onPatchConfig={(patch) => setLayerConfig(kind, patch)}
                    onChangeEffects={(map) => setLayerEffects(kind, map)}
                    onClear={layer ? () => clearLayer(kind) : null}
                  />
                </SubcardAccordion>
              );
            })()}
          </FloatingPanel>
        )}

        {pieceSelected && (
          <FloatingPanel
            title={`Piece · ${selectedPiece.label || selectedPiece.id}`}
            placement="top-right"
            onClose={onClearPieceSelection}
          >
            <PieceInspector
              piece={selectedPiece}
              project={project}
              activeTab={pieceTab}
              onChangeTab={setPieceTab}
              onClearSelection={onClearPieceSelection}
              setPieceContent={setPieceContent}
              updatePieceContent={updatePieceContent}
              setCellEffects={setCellEffects}
              setPieceEdgeEffect={setPieceEdgeEffect}
              setPieceEdgeConfig={setPieceEdgeConfig}
              setPieceEdgeEffects={setPieceEdgeEffects}
              clearPieceEdgeOverride={clearPieceEdgeOverride}
            />
          </FloatingPanel>
        )}

        {!pieceSelected && edgeSelected && (
          <FloatingPanel
            title={selectedEdges.size === 1 ? 'Edge' : `${selectedEdges.size} edges`}
            placement="top-right"
            onClose={onClearEdgeSelection}
          >
            <EdgeInspector
              selected={selectedEdges}
              project={project}
              pieces={pieces}
              sharedEdges={sharedEdges}
              onClearSelection={onClearEdgeSelection}
              setEdgeEffect={setEdgeEffect}
              setEdgeConfig={setEdgeConfig}
              clearEdgeOverride={clearEdgeOverride}
              setEdgeEffects={setEdgeEffects}
            />
          </FloatingPanel>
        )}
      </div>
    </div>
  );
}
