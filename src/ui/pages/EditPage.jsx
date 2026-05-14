import { useCallback, useEffect, useMemo, useState } from 'react';
import { listOuterEdges } from '../../grid/compile.js';
import EdgesPanel    from '../components/EdgesPanel.jsx';
import ContentPanel  from '../components/ContentPanel.jsx';
import EditCanvas    from '../components/EditCanvas.jsx';
import ViewPanel     from '../components/ViewPanel.jsx';

const MODES = [
  { id: 'edges',   label: 'Edges',   icon: '∿' },
  { id: 'content', label: 'Content', icon: '✎' },
];

const DEFAULT_WAVE = { frequency: 0.025, amplitude: 12, phase: 0 };

// Combined editor: same canvas, two editing modes selected from the side panel.
//
// Selections (both shared across both modes; mutually exclusive within Edges
// mode so the side panel can show one card at a time):
//   - selectedEdges    : Set<pairKey>  — edge picks for the per-edge tier
//   - selectedPieceId  : string | null — piece pick for the cell tier
//                                        (Edges mode) or for content editing
//                                        (Content mode).
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
  } = project;

  const [mode, setMode] = useState('edges');
  const [selectedEdges, setSelectedEdges] = useState(() => new Set());
  const [selectedPieceId, setSelectedPieceId] = useState(null);

  const isOverridden = useCallback(
    (pairKey) => !!p?.edges.byEdge[pairKey],
    [p?.edges.byEdge]
  );

  // Edge clicks clear any existing piece selection — the two are mutually
  // exclusive in Edges mode so the side panel can show one card at a time.
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

  // Esc clears both selections regardless of mode.
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
  const selectedPiece = selectedPieceId ? pieces.find((pc) => pc.id === selectedPieceId) : null;

  return (
    <div className="page-edit">
      <aside className="side-tools">
        <ModeSwitch mode={mode} onChange={setMode} />

        {mode === 'edges' ? (
          <EdgesPanel
            project={p}
            pieces={pieces}
            sharedEdges={sharedEdges}
            allEdges={allEdges}
            selected={selectedEdges}
            onClearEdgeSelection={() => setSelectedEdges(new Set())}
            selectedPiece={selectedPiece}
            onClearPieceSelection={() => setSelectedPieceId(null)}
            setDefaultEdgeEffect={setDefaultEdgeEffect}
            setDefaultEdgeConfig={setDefaultEdgeConfig}
            setEdgeEffect={setEdgeEffect}
            setEdgeConfig={setEdgeConfig}
            clearEdgeOverride={clearEdgeOverride}
            resetEdgeOverrides={resetEdgeOverrides}
            setLayerEffect={setLayerEffect}
            setLayerConfig={setLayerConfig}
            clearLayer={clearLayer}
            setPieceEdgeEffect={setPieceEdgeEffect}
            setPieceEdgeConfig={setPieceEdgeConfig}
            clearPieceEdgeOverride={clearPieceEdgeOverride}
          />
        ) : (
          <ContentPanel
            selectedPiece={selectedPiece}
            onClearSelection={() => setSelectedPieceId(null)}
            setPieceContent={setPieceContent}
            updatePieceContent={updatePieceContent}
          />
        )}
      </aside>

      <ViewPanel>
        <EditCanvas
          mode={mode}
          pieces={pieces}
          effect={defaultEffect}
          effectConfig={defaultConfig}
          allEdges={allEdges}
          selectedEdgeIds={selectedEdges}
          onSelectEdge={handleSelectEdge}
          isOverridden={isOverridden}
          selectedPieceId={selectedPieceId}
          onSelectPiece={handleSelectPiece}
        />
      </ViewPanel>
    </div>
  );
}

// Tabby toggle — visually similar to PageNav's tab strip but scoped to side panel.
function ModeSwitch({ mode, onChange }) {
  return (
    <div className="mode-switch" role="tablist" aria-label="Edit mode">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="tab"
          aria-selected={mode === m.id}
          className={`mode-switch__btn ${mode === m.id ? 'mode-switch__btn--active' : ''}`}
          onClick={() => onChange(m.id)}
        >
          <span className="mode-switch__icon" aria-hidden>{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
