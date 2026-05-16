import { useMemo, useState } from 'react';
import LayersPanel from './LayersPanel.jsx';
import PropertiesPane from './PropertiesPane.jsx';
import { useLayerTree } from '../../hooks/useLayerTree.js';

// Layers Edit UI (Direction E): a vertical layer list on top, a property
// pane on the bottom. The layer list is the navigation across every
// tier + piece + edge in the project; clicking a row picks what the
// pane edits.
//
// Canvas selection (clicking a piece or edge on the canvas itself)
// auto-snaps the layer-list selection to the matching row, so the user
// can drive it either from the panel or from the canvas.
export default function LayersEditUi({
  project,
  pieces,
  sharedEdges,
  selectedEdges,
  selectedPieceId,
  onSelectPiece,
  onSelectEdges,
  // setters forwarded to PropertiesPane
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  setLayerEffect, setLayerConfig, clearLayer, setLayerEffects,
  setPieceEdgeEffect, setPieceEdgeConfig, setPieceEdgeEffects, clearPieceEdgeOverride,
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, setEdgeEffects,
  setPieceContent, updatePieceContent,
  setDefaultCellEffects, setCellEffects,
}) {
  const rows = useLayerTree(project, pieces, sharedEdges);
  const [pieceTab, setPieceTab] = useState('edges');
  const [pickedLayer, setPickedLayer] = useState({ kind: 'default', id: 'default' });

  // Canvas selection drives the focused row when it changes; an explicit
  // pick on the panel itself overrides that.
  const canvasFocus = useMemo(() => {
    if (selectedEdges?.size > 0) {
      const pairKey = [...selectedEdges][0];
      return { kind: 'edge', id: pairKey };
    }
    if (selectedPieceId) {
      return { kind: 'piece', id: selectedPieceId };
    }
    return null;
  }, [selectedEdges, selectedPieceId]);

  // Effective focus: canvas selection wins; otherwise fall back to the
  // panel's explicit pick.
  const focus = canvasFocus || pickedLayer;
  const activeRowId = focus?.id ?? null;

  const handlePickRow = (row) => {
    if (row.kind === 'piece') {
      onSelectPiece?.(row.id);
      setPickedLayer({ kind: 'piece', id: row.id });
      return;
    }
    if (row.kind === 'edge') {
      onSelectEdges?.(new Set([row.pairKey]));
      setPickedLayer({ kind: 'edge', id: row.id });
      return;
    }
    // Tier row → clear canvas selection so the panel takes over.
    onSelectPiece?.(null);
    onSelectEdges?.(new Set());
    setPickedLayer({ kind: row.kind, id: row.id });
  };

  return (
    <div className="layers-edit-ui">
      <div className="layers-edit-ui__panel">
        <LayersPanel
          rows={rows}
          activeRowId={activeRowId}
          onPickRow={handlePickRow}
        />
      </div>
      <div className="layers-edit-ui__props">
        <PropertiesPane
          focus={focus}
          project={project}
          pieces={pieces}
          sharedEdges={sharedEdges}
          pieceTab={pieceTab}
          setPieceTab={setPieceTab}
          onClearPieceSelection={() => { onSelectPiece?.(null); setPickedLayer({ kind: 'default', id: 'default' }); }}
          onClearEdgeSelection={() => { onSelectEdges?.(new Set()); setPickedLayer({ kind: 'default', id: 'default' }); }}
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
          setEdgeEffect={setEdgeEffect}
          setEdgeConfig={setEdgeConfig}
          clearEdgeOverride={clearEdgeOverride}
          setEdgeEffects={setEdgeEffects}
          setPieceContent={setPieceContent}
          updatePieceContent={updatePieceContent}
          setDefaultCellEffects={setDefaultCellEffects}
          setCellEffects={setCellEffects}
        />
      </div>
    </div>
  );
}
