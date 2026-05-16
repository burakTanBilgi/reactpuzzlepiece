import { useEffect, useMemo, useState } from 'react';
import CascadeStrip from './CascadeStrip.jsx';
import ProjectDefaultsCard from './ProjectDefaultsCard.jsx';
import PieceInspector from './PieceInspector.jsx';
import EdgeInspector from './EdgeInspector.jsx';
import EdgeTierEditor from './EdgeTierEditor.jsx';
import AccordionCard from '../AccordionCard.jsx';
import { computeTierStates } from './cascade-source.js';
import { listOuterEdges } from '../../../grid/compile.js';
import { DEFAULT_WAVE } from '../edges/constants.js';
import './Inspector.css';

// Top-level selection-driven inspector. Owns the cross-cutting UI state
// (which tier accordion card is open, which Content/Body/Edges tab the
// PieceInspector is on). Cards stack always; only one is expanded at a
// time, flex-growing to fill the remaining rail height. The cascade strip
// and the card headers both drive `openTier` — clicking either updates the
// same state.
export default function Inspector({
  project,
  pieces,
  sharedEdges,
  selectedEdges,
  selectedPieceId,
  onClearEdgeSelection,
  onClearPieceSelection,
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

  const selectionType = selectedEdges.size > 0 ? 'edge'
                      : selectedPieceId      ? 'piece'
                                             : 'none';
  const selectedPiece = useMemo(
    () => (selectedPieceId ? pieces.find((p) => p.id === selectedPieceId) : null),
    [pieces, selectedPieceId]
  );

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

  // Reset the explicit pick whenever the selection fundamentally changes —
  // a fresh selection should land on its own tier (Piece / Edge / Default).
  useEffect(() => {
    setExpandedTier(null);
  }, [selectionType, selectedPieceId]);

  const currentTier = selectionType === 'edge'  ? 'edge'
                    : selectionType === 'piece' ? 'piece'
                                                : 'default';
  const openTier = expandedTier || currentTier;

  // Cascade pill clicks toggle the matching accordion card. Re-clicking
  // the current tier (when no explicit pick is active) snaps back to the
  // implied default.
  const handlePickTier = (tier) => {
    setExpandedTier((cur) => (cur === tier ? null : tier));
  };
  // AccordionCard hands us `null` when the user clicks an open header to
  // close it; that simply clears the explicit pick.
  const handleToggleCard = (id) => setExpandedTier(id);

  // For PieceInspector: opening Default/Inner/Outer while a piece is
  // selected forces the Piece-tier card into its Edges tab so the user
  // sees a comparable view.
  useEffect(() => {
    if (selectionType !== 'piece') return;
    if (openTier === 'inner' || openTier === 'outer' || openTier === 'default') {
      if (pieceTab === 'content') setPieceTab('edges');
    }
  }, [openTier, selectionType, pieceTab]);

  const hasAnyOverride =
    Object.keys(project.edges.byEdge || {}).length > 0 ||
    Object.keys(project.edges.byPiece || {}).length > 0;
  const hasAnyCellOverride =
    Object.keys(project?.cells?.default?.effects || {}).length > 0 ||
    Object.keys(project?.cells?.byPiece || {}).length > 0;

  const edges = project.edges;
  const defaultEdgeEffect = edges.default.effect;
  const defaultEdgeConfig = edges.default.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = edges.default.effects || {};

  const showInner = tierStates.inner.applicable;
  const showOuter = tierStates.outer.applicable;

  // First touching piece for an edge selection — drives the optional
  // Piece-tier card and its label.
  const firstPiecePk = selectionType === 'edge' ? [...selectedEdges][0] : null;
  const firstEdgePiece = useMemo(() => {
    if (!firstPiecePk) return null;
    const part = firstPiecePk.split('||')[0];
    return pieces.find((pp) => pp.id === part) || null;
  }, [firstPiecePk, pieces]);

  return (
    <div className="inspector">
      <CascadeStrip
        states={tierStates}
        currentTier={openTier}
        onSelectTier={handlePickTier}
      />

      <div className="inspector-acc">
        <AccordionCard
          id="default"
          title="Default"
          open={openTier === 'default'}
          onToggle={handleToggleCard}
        >
          <ProjectDefaultsCard
            project={project}
            setDefaultEdgeEffect={setDefaultEdgeEffect}
            setDefaultEdgeConfig={setDefaultEdgeConfig}
            setDefaultEdgeEffects={setDefaultEdgeEffects}
            setDefaultCellEffects={setDefaultCellEffects}
          />
        </AccordionCard>

        {showInner && (
          <AccordionCard
            id="inner"
            title="Inner edges"
            badge={tierStates.inner.hasOverride ? '●' : null}
            open={openTier === 'inner'}
            onToggle={handleToggleCard}
          >
            <EdgeTierEditor
              title="Inner edges"
              accent
              effect={edges.inner?.effect ?? defaultEdgeEffect}
              config={edges.inner?.config ?? defaultEdgeConfig}
              ownEffects={edges.inner?.effects || {}}
              inheritedEffects={defaultEdgeEffects}
              onSetEffect={(name) => setLayerEffect('inner', name, name === 'wave'
                ? (edges.inner?.config ?? defaultEdgeConfig) : undefined)}
              onPatchConfig={(patch) => setLayerConfig('inner', patch)}
              onChangeEffects={(map) => setLayerEffects('inner', map)}
              onClear={edges.inner ? () => clearLayer('inner') : null}
            />
          </AccordionCard>
        )}

        {showOuter && (
          <AccordionCard
            id="outer"
            title="Outer edges"
            badge={tierStates.outer.hasOverride ? '●' : null}
            open={openTier === 'outer'}
            onToggle={handleToggleCard}
          >
            <EdgeTierEditor
              title="Outer edges"
              accent
              effect={edges.outer?.effect ?? defaultEdgeEffect}
              config={edges.outer?.config ?? defaultEdgeConfig}
              ownEffects={edges.outer?.effects || {}}
              inheritedEffects={defaultEdgeEffects}
              onSetEffect={(name) => setLayerEffect('outer', name, name === 'wave'
                ? (edges.outer?.config ?? defaultEdgeConfig) : undefined)}
              onPatchConfig={(patch) => setLayerConfig('outer', patch)}
              onChangeEffects={(map) => setLayerEffects('outer', map)}
              onClear={edges.outer ? () => clearLayer('outer') : null}
            />
          </AccordionCard>
        )}

        {selectionType === 'piece' && selectedPiece && (
          <AccordionCard
            id="piece"
            title="Piece"
            badge={selectedPiece.label || selectedPiece.id}
            open={openTier === 'piece'}
            onToggle={handleToggleCard}
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
          </AccordionCard>
        )}

        {selectionType === 'edge' && (
          <>
            {firstEdgePiece && tierStates.piece.applicable && (
              <AccordionCard
                id="piece"
                title="Piece"
                badge={firstEdgePiece.label || firstEdgePiece.id}
                open={openTier === 'piece'}
                onToggle={handleToggleCard}
              >
                <EdgeTierEditor
                  title={`Piece · ${firstEdgePiece.label || firstEdgePiece.id}`}
                  accent
                  effect={edges.byPiece?.[firstEdgePiece.id]?.effect ?? defaultEdgeEffect}
                  config={edges.byPiece?.[firstEdgePiece.id]?.config ?? defaultEdgeConfig}
                  ownEffects={edges.byPiece?.[firstEdgePiece.id]?.effects || {}}
                  inheritedEffects={defaultEdgeEffects}
                  onSetEffect={(name) => setPieceEdgeEffect(firstEdgePiece.id, name, name === 'wave'
                    ? (edges.byPiece?.[firstEdgePiece.id]?.config ?? defaultEdgeConfig) : undefined)}
                  onPatchConfig={(patch) => setPieceEdgeConfig(firstEdgePiece.id, patch)}
                  onChangeEffects={(map) => setPieceEdgeEffects(firstEdgePiece.id, map)}
                  onClear={edges.byPiece?.[firstEdgePiece.id]
                    ? () => clearPieceEdgeOverride(firstEdgePiece.id) : null}
                />
              </AccordionCard>
            )}

            <AccordionCard
              id="edge"
              title="Edge"
              badge={selectedEdges.size > 1 ? `${selectedEdges.size}` : null}
              open={openTier === 'edge'}
              onToggle={handleToggleCard}
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
            </AccordionCard>
          </>
        )}
      </div>

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
