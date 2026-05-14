import { useEffect, useMemo, useState } from 'react';
import CascadeStrip from './CascadeStrip.jsx';
import ProjectDefaultsCard from './ProjectDefaultsCard.jsx';
import PieceInspector from './PieceInspector.jsx';
import EdgeInspector from './EdgeInspector.jsx';
import { computeTierStates } from './cascade-source.js';
import { listOuterEdges } from '../../../grid/compile.js';
import './Inspector.css';

// Top-level selection-driven inspector. Owns the cross-cutting UI state
// (which non-current tier is expanded, which tab the PieceInspector is on)
// so it survives intra-selection edits but resets when the selection
// fundamentally changes.
export default function Inspector({
  project,
  pieces,
  sharedEdges,
  // selection state (lives on EditPage so the canvas can read it)
  selectedEdges,
  selectedPieceId,
  onClearEdgeSelection,
  onClearPieceSelection,
  // every setter the inspectors compose
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  setLayerEffect, setLayerConfig, clearLayer, setLayerEffects,
  setPieceEdgeEffect, setPieceEdgeConfig, setPieceEdgeEffects, clearPieceEdgeOverride,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, setEdgeEffects,
  setPieceContent, updatePieceContent,
  setDefaultCellEffects, setCellEffects,
  resetEdgeOverrides, resetAllCellEffects,
}) {
  const [expandedTier, setExpandedTier] = useState(null);
  const [pieceTab, setPieceTab] = useState('edges');

  // Selection-shape used by cascade-source and the strip.
  const selectionType = selectedEdges.size > 0 ? 'edge'
                      : selectedPieceId      ? 'piece'
                                             : 'none';
  const selectedPiece = useMemo(
    () => (selectedPieceId ? pieces.find((p) => p.id === selectedPieceId) : null),
    [pieces, selectedPieceId]
  );

  // For piece-selection, figure out which layers are applicable (i.e. does
  // this piece actually have any inner or outer edges?).
  const pieceLayerFlags = useMemo(() => {
    if (!selectedPiece) return { hasInner: false, hasOuter: false };
    const outer = listOuterEdges(project);
    const hasOuter = outer.some((e) => e.pieceId === selectedPiece.id);
    const hasInner = sharedEdges.some((e) =>
      e.pieceAId === selectedPiece.id || e.pieceBId === selectedPiece.id);
    return { hasInner, hasOuter };
  }, [selectedPiece, project, sharedEdges]);

  const selectionShape = useMemo(() => {
    if (selectionType === 'edge') return { type: 'edge', pairKeys: [...selectedEdges] };
    if (selectionType === 'piece') return {
      type: 'piece',
      pieceId: selectedPieceId,
      hasInner: pieceLayerFlags.hasInner,
      hasOuter: pieceLayerFlags.hasOuter,
    };
    return { type: 'none' };
  }, [selectionType, selectedEdges, selectedPieceId, pieceLayerFlags]);

  const tierStates = useMemo(
    () => computeTierStates(project.edges, selectionShape),
    [project.edges, selectionShape]
  );

  // Reset the expanded tier whenever the selection fundamentally changes —
  // a fresh selection should land on its own tier (Piece / Edge / Default)
  // rather than inherit a stale Inner/Outer expansion from a prior context.
  useEffect(() => {
    setExpandedTier(null);
  }, [selectionType, selectedPieceId]);

  const currentTier = selectionType === 'edge'  ? 'edge'
                    : selectionType === 'piece' ? 'piece'
                                                : 'default';

  // Strip pill click handler. Clicking the current tier collapses any
  // expanded inline sub-card; clicking a different tier expands it.
  const handlePickTier = (tier) => {
    if (tier === currentTier) {
      setExpandedTier(null);
      return;
    }
    setExpandedTier(tier);
  };

  // For PieceInspector: any inline-expanded edge tier forces the Edges tab
  // (otherwise the expanded sub-card wouldn't be visible to the user).
  useEffect(() => {
    if (selectionType !== 'piece' || !expandedTier) return;
    if (expandedTier === 'inner' || expandedTier === 'outer' || expandedTier === 'default') {
      if (pieceTab === 'content') setPieceTab('edges');
    }
  }, [expandedTier, selectionType, pieceTab]);

  const hasAnyOverride =
    Object.keys(project.edges.byEdge || {}).length > 0 ||
    Object.keys(project.edges.byPiece || {}).length > 0;
  const hasAnyCellOverride =
    Object.keys(project?.cells?.default?.effects || {}).length > 0 ||
    Object.keys(project?.cells?.byPiece || {}).length > 0;

  return (
    <div className="inspector">
      <CascadeStrip
        states={tierStates}
        currentTier={expandedTier || currentTier}
        onSelectTier={handlePickTier}
      />

      {selectionType === 'none' && (
        <ProjectDefaultsCard
          project={project}
          expandedTier={expandedTier}
          setDefaultEdgeEffect={setDefaultEdgeEffect}
          setDefaultEdgeConfig={setDefaultEdgeConfig}
          setDefaultEdgeEffects={setDefaultEdgeEffects}
          setLayerEffect={setLayerEffect}
          setLayerConfig={setLayerConfig}
          clearLayer={clearLayer}
          setLayerEffects={setLayerEffects}
          setDefaultCellEffects={setDefaultCellEffects}
        />
      )}

      {selectionType === 'piece' && selectedPiece && (
        <PieceInspector
          piece={selectedPiece}
          project={project}
          activeTab={pieceTab}
          onChangeTab={setPieceTab}
          expandedTier={expandedTier}
          onClearSelection={onClearPieceSelection}
          setPieceContent={setPieceContent}
          updatePieceContent={updatePieceContent}
          setCellEffects={setCellEffects}
          setDefaultCellEffects={setDefaultCellEffects}
          setPieceEdgeEffect={setPieceEdgeEffect}
          setPieceEdgeConfig={setPieceEdgeConfig}
          setPieceEdgeEffects={setPieceEdgeEffects}
          clearPieceEdgeOverride={clearPieceEdgeOverride}
          setDefaultEdgeEffect={setDefaultEdgeEffect}
          setDefaultEdgeConfig={setDefaultEdgeConfig}
          setDefaultEdgeEffects={setDefaultEdgeEffects}
          setLayerEffect={setLayerEffect}
          setLayerConfig={setLayerConfig}
          clearLayer={clearLayer}
          setLayerEffects={setLayerEffects}
        />
      )}

      {selectionType === 'edge' && (
        <EdgeInspector
          selected={selectedEdges}
          project={project}
          pieces={pieces}
          sharedEdges={sharedEdges}
          expandedTier={expandedTier}
          onClearSelection={onClearEdgeSelection}
          setEdgeEffect={setEdgeEffect}
          setEdgeConfig={setEdgeConfig}
          clearEdgeOverride={clearEdgeOverride}
          setEdgeEffects={setEdgeEffects}
          setDefaultEdgeEffect={setDefaultEdgeEffect}
          setDefaultEdgeConfig={setDefaultEdgeConfig}
          setDefaultEdgeEffects={setDefaultEdgeEffects}
          setLayerEffect={setLayerEffect}
          setLayerConfig={setLayerConfig}
          clearLayer={clearLayer}
          setLayerEffects={setLayerEffects}
          setPieceEdgeEffect={setPieceEdgeEffect}
          setPieceEdgeConfig={setPieceEdgeConfig}
          setPieceEdgeEffects={setPieceEdgeEffects}
          clearPieceEdgeOverride={clearPieceEdgeOverride}
        />
      )}

      {(hasAnyOverride || hasAnyCellOverride) && (
        <div className="action-stack">
          <button type="button" className="action-btn action-btn--ghost"
            onClick={() => { resetEdgeOverrides(); resetAllCellEffects(); }}>
            Clear all overrides
          </button>
        </div>
      )}
    </div>
  );
}
