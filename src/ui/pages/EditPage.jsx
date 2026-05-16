import { useCallback, useEffect, useMemo, useState } from 'react';
import { listOuterEdges } from '../../grid/compile.js';
import Inspector       from '../components/inspector/Inspector.jsx';
import EdgeEditorCanvas from '../components/EdgeEditorCanvas.jsx';
import ViewPanel       from '../components/ViewPanel.jsx';
import WaveBrandMark   from '../components/meta/WaveBrandMark.jsx';

const DEFAULT_WAVE = { frequency: 0.025, amplitude: 12, phase: 0 };

// Single Edit page: one canvas, one selection-driven Inspector. Selection
// state is mutually exclusive — clicking a piece clears any edge selection
// and vice versa. The Inspector reads from this state to decide which view
// to render (project defaults / piece / edge).
export default function EditPage({ project }) {
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
    setLayerEffect,
    setLayerConfig,
    clearLayer,
    setPieceEdgeEffect,
    setPieceEdgeConfig,
    clearPieceEdgeOverride,
    setPieceContent,
    updatePieceContent,
    setDefaultCellEffects,
    setCellEffects,
    resetAllCellEffects,
    setDefaultEdgeEffects,
    setLayerEffects,
    setPieceEdgeEffects,
    setEdgeEffects,
  } = project;

  const [selectedEdges, setSelectedEdges] = useState(() => new Set());
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [hoverFxEnabled, setHoverFxEnabled] = useState(true);
  const [clickFxEnabled, setClickFxEnabled] = useState(true);

  // Edge clicks clear any existing piece selection (mutually exclusive so
  // the inspector shows one selection at a time).
  const handleSelectEdge = useCallback((pairKey, evt) => {
    setSelectedPieceId(null);
    setSelectedEdges((cur) => {
      const next = new Set(cur);
      if (evt?.shiftKey || evt?.ctrlKey || evt?.metaKey) {
        if (next.has(pairKey)) next.delete(pairKey); else next.add(pairKey);
      } else {
        if (next.size === 1 && next.has(pairKey)) next.clear();
        else { next.clear(); next.add(pairKey); }
      }
      return next;
    });
  }, []);

  // Piece clicks clear any existing edge selection.
  const handleSelectPiece = useCallback((pieceId) => {
    setSelectedEdges(new Set());
    setSelectedPieceId(pieceId);
  }, []);

  // Esc clears both selections.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setSelectedEdges(new Set());
      setSelectedPieceId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const allEdges = useMemo(() => {
    if (!p) return [];
    return [...sharedEdges, ...listOuterEdges(p)];
  }, [p, sharedEdges]);

  if (!p) return null;

  const defaultEffect = p.edges.default.effect;
  const defaultConfig = p.edges.default.config ?? DEFAULT_WAVE;

  return (
    <div className="page-edit">
      <aside className="side-tools">
        <div className="side-tools__brand">
          <WaveBrandMark size="sm" />
        </div>

        <div className="fx-toggle-group" role="group" aria-label="Interaction previews">
          <button
            type="button"
            className={`fx-icon-btn${hoverFxEnabled ? '' : ' fx-icon-btn--off'}`}
            onClick={() => setHoverFxEnabled((v) => !v)}
            title={`Hover previews: ${hoverFxEnabled ? 'on (click to disable)' : 'off (click to enable)'}`}
            aria-label={`Toggle hover previews (currently ${hoverFxEnabled ? 'on' : 'off'})`}
            aria-pressed={hoverFxEnabled}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                d="M3 2 L3 11 L6 8 L8 12 L9.4 11.4 L7.4 8 L11 8 Z"
                fill="currentColor"
              />
              <path
                d="M2 14 Q4.5 12.5 7 14 T12.5 14"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={`fx-icon-btn${clickFxEnabled ? '' : ' fx-icon-btn--off'}`}
            onClick={() => setClickFxEnabled((v) => !v)}
            title={`Click previews: ${clickFxEnabled ? 'on (click to disable)' : 'off (click to enable)'}`}
            aria-label={`Toggle click previews (currently ${clickFxEnabled ? 'on' : 'off'})`}
            aria-pressed={clickFxEnabled}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                d="M3 2 L3 11 L6 8 L8 12 L9.4 11.4 L7.4 8 L11 8 Z"
                fill="currentColor"
              />
              <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <line x1="12.5" y1="3.5" x2="14.5" y2="1.5" />
                <line x1="13" y1="6"   x2="15.4" y2="6" />
                <line x1="12.5" y1="8.5" x2="14.5" y2="10.5" />
              </g>
            </svg>
          </button>
        </div>

        <Inspector
          project={p}
          pieces={pieces}
          sharedEdges={sharedEdges}
          selectedEdges={selectedEdges}
          selectedPieceId={selectedPieceId}
          onClearEdgeSelection={() => setSelectedEdges(new Set())}
          onClearPieceSelection={() => setSelectedPieceId(null)}
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
          resetEdgeOverrides={resetEdgeOverrides}
          resetAllCellEffects={resetAllCellEffects}
        />
      </aside>

      <ViewPanel>
        <EdgeEditorCanvas
          pieces={pieces}
          effect={defaultEffect}
          effectConfig={defaultConfig}
          allEdges={allEdges}
          selectedEdgeIds={selectedEdges}
          onSelectEdge={handleSelectEdge}
          selectedPieceId={selectedPieceId}
          onSelectPiece={handleSelectPiece}
          edgesByEdge={p.edges.byEdge}
          edgesByPiece={p.edges.byPiece}
          hoverFxEnabled={hoverFxEnabled}
          clickFxEnabled={clickFxEnabled}
        />
      </ViewPanel>
    </div>
  );
}
