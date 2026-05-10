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

  const handleSelectEdge = useCallback((pairKey, evt) => {
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

  // Esc clears selection in whichever mode is active.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (mode === 'edges') setSelectedEdges(new Set());
      else                  setSelectedPieceId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

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
            onClearSelection={() => setSelectedEdges(new Set())}
            onSelectAll={() => setSelectedEdges(new Set(allEdges.map((e) => e.pairKey)))}
            setDefaultEdgeEffect={setDefaultEdgeEffect}
            setDefaultEdgeConfig={setDefaultEdgeConfig}
            setEdgeEffect={setEdgeEffect}
            setEdgeConfig={setEdgeConfig}
            clearEdgeOverride={clearEdgeOverride}
            resetEdgeOverrides={resetEdgeOverrides}
            setLayerEffect={setLayerEffect}
            setLayerConfig={setLayerConfig}
            clearLayer={clearLayer}
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
          onSelectPiece={setSelectedPieceId}
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
