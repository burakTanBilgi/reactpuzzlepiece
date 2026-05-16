import { useState } from 'react';
import NavRail from './NavRail.jsx';
import FloatingPanel from './FloatingPanel.jsx';
import PieceInspector from '../inspector/PieceInspector.jsx';
import EdgeInspector from '../inspector/EdgeInspector.jsx';
import ProjectDefaultsCard from '../inspector/ProjectDefaultsCard.jsx';

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
  const [pieceTab, setPieceTab] = useState('edges');

  const pieceSelected = !!selectedPieceId && !!selectedPiece;
  const edgeSelected  = selectedEdges?.size > 0;

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
            title="Project defaults"
            placement="left-sheet"
            onClose={() => setDefaultsOpen(false)}
          >
            <ProjectDefaultsCard
              project={project}
              setDefaultEdgeEffect={setDefaultEdgeEffect}
              setDefaultEdgeConfig={setDefaultEdgeConfig}
              setDefaultEdgeEffects={setDefaultEdgeEffects}
              setDefaultCellEffects={setDefaultCellEffects}
            />
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
