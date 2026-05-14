import { useMemo } from 'react';
import EdgeTierEditor from './EdgeTierEditor.jsx';
import { piecesOfEdge } from '../../../grid/compile.js';
import { DEFAULT_WAVE, MIXED } from '../edges/constants.js';

// Inspector view for one or more selected edges. The "current" tier is
// per-edge (byEdge[pairKey]). Lower tiers (default, inner/outer, piece) are
// shown inline when the user clicks their cascade-strip pill via
// `expandedTier`.
export default function EdgeInspector({
  selected, // Set<pairKey>
  project,
  pieces,
  sharedEdges,
  expandedTier, // 'default' | 'inner' | 'outer' | 'piece' | null
  onClearSelection,
  // per-edge tier setters
  setEdgeEffect, setEdgeConfig, clearEdgeOverride, setEdgeEffects,
  // default tier
  setDefaultEdgeEffect, setDefaultEdgeConfig, setDefaultEdgeEffects,
  // layer tier
  setLayerEffect, setLayerConfig, clearLayer, setLayerEffects,
  // piece tier
  setPieceEdgeEffect, setPieceEdgeConfig, setPieceEdgeEffects, clearPieceEdgeOverride,
}) {
  const piecesById = useMemo(() => new Map(pieces.map((p) => [p.id, p])), [pieces]);

  const edges = project.edges;
  const defaultEdge = edges.default;
  const defaultEdgeEffect = defaultEdge.effect;
  const defaultEdgeConfig = defaultEdge.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = defaultEdge.effects || {};

  const pairKeys = useMemo(() => [...selected], [selected]);
  const firstPk = pairKeys[0];
  const isOuter = firstPk?.includes('||outer-');
  const layerKind = isOuter ? 'outer' : 'inner';
  const layer = edges[layerKind];

  // First touching piece (used for piece-tier editing from edge selection).
  const firstPiece = useMemo(() => {
    if (!firstPk) return null;
    const [pid] = piecesOfEdge(firstPk);
    return piecesById.get(pid) || null;
  }, [firstPk, piecesById]);

  const resolveOne = (pk) => {
    const ov = edges.byEdge[pk];
    const isO = pk.includes('||outer-');
    const lay = isO ? edges.outer : edges.inner;
    let cell = null;
    for (const pid of piecesOfEdge(pk)) {
      if (edges.byPiece?.[pid]) { cell = edges.byPiece[pid]; break; }
    }
    return {
      effect: ov?.effect ?? cell?.effect ?? lay?.effect ?? defaultEdgeEffect,
      cfg:    ov?.config ?? cell?.config ?? lay?.config ?? defaultEdgeConfig,
    };
  };

  // Fold each selected edge's resolved values into one combo; properties
  // that disagree across the selection are tagged MIXED.
  const combo = useMemo(() => {
    if (pairKeys.length === 0) return null;
    let effect = null;
    let cfg = null;
    let first = true;
    for (const pk of pairKeys) {
      const { effect: e, cfg: c } = resolveOne(pk);
      if (first) { effect = e; cfg = c; first = false; }
      else {
        if (e !== effect) effect = MIXED;
        if (cfg?.frequency   !== c?.frequency)   cfg = { ...cfg, frequency:   MIXED };
        if (cfg?.amplitude   !== c?.amplitude)   cfg = { ...cfg, amplitude:   MIXED };
        if (cfg?.inverted    !== c?.inverted)    cfg = { ...cfg, inverted:    MIXED };
        if (cfg?.color       !== c?.color)       cfg = { ...cfg, color:       MIXED };
        if (cfg?.opacity     !== c?.opacity)     cfg = { ...cfg, opacity:     MIXED };
        if (cfg?.strokeWidth !== c?.strokeWidth) cfg = { ...cfg, strokeWidth: MIXED };
      }
    }
    return { effect, cfg };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairKeys, edges.byEdge, edges.byPiece, edges.inner, edges.outer, defaultEdgeEffect, defaultEdgeConfig]);

  // Effects-picker baseline = what cascade resolves up to (but not including) byEdge.
  const ownEffectsFirst = edges.byEdge[firstPk]?.effects || {};
  const inheritedEffectsFirst = useMemo(() => {
    if (!firstPk) return {};
    const lay = isOuter ? edges.outer : edges.inner;
    const cellTiers = piecesOfEdge(firstPk)
      .map((id) => edges.byPiece?.[id]?.effects)
      .filter(Boolean);
    const out = {};
    for (const m of [edges.default?.effects, lay?.effects, ...cellTiers]) {
      if (!m) continue;
      for (const [k, v] of Object.entries(m)) {
        if (v === null) delete out[k];
        else out[k] = v;
      }
    }
    return out;
  }, [firstPk, isOuter, edges]);

  // Multi-edge effects: detect mixed across edges' own maps.
  const effectsMixed = pairKeys.length > 1 && pairKeys.some((pk) =>
    JSON.stringify(edges.byEdge[pk]?.effects || {}) !== JSON.stringify(ownEffectsFirst)
  );

  const applyEdgeEffect = (name) => {
    const cfg = name === 'wave'
      ? (combo?.cfg && combo.cfg.frequency !== MIXED && combo.cfg.amplitude !== MIXED
          ? combo.cfg : defaultEdgeConfig)
      : undefined;
    for (const pk of pairKeys) setEdgeEffect(pk, name, cfg);
  };
  const applyEdgeConfig = (patch) => {
    for (const pk of pairKeys) setEdgeConfig(pk, patch);
  };
  const applyEdgeEffects = (map) => {
    for (const pk of pairKeys) setEdgeEffects(pk, map);
  };
  const resetSelected = () => {
    for (const pk of pairKeys) clearEdgeOverride(pk);
  };

  // Header label (single edge: "A ↔ B" or "Outer · A")
  const headerSub = (() => {
    if (pairKeys.length !== 1) return `${pairKeys.length} edges`;
    if (isOuter) {
      const piece = firstPiece;
      return `Outer · ${piece?.label || piece?.id || ''}`;
    }
    const e = sharedEdges.find((x) => x.pairKey === firstPk);
    if (!e) return '';
    const a = piecesById.get(e.pieceAId)?.label || e.pieceAId;
    const b = piecesById.get(e.pieceBId)?.label || e.pieceBId;
    return `${a} ↔ ${b}`;
  })();

  return (
    <>
      <div className="inspector-header">
        <div>
          <span className="inspector-header__kind">Edge</span>
          <span className="inspector-header__title">
            {pairKeys.length === 1 ? 'Selected edge' : `${pairKeys.length} edges`}
          </span>
          {headerSub && <div className="inspector-header__sub">{headerSub}</div>}
        </div>
        <button type="button" className="link-btn" onClick={onClearSelection}>clear</button>
      </div>

      <EdgeTierEditor
        title="This edge"
        accent
        effect={combo?.effect}
        config={combo?.cfg}
        ownEffects={ownEffectsFirst}
        inheritedEffects={inheritedEffectsFirst}
        mixed={effectsMixed}
        onSetEffect={applyEdgeEffect}
        onPatchConfig={applyEdgeConfig}
        onChangeEffects={applyEdgeEffects}
        onClear={resetSelected}
      />

      {expandedTier === 'piece' && firstPiece && (
        <EdgeTierEditor
          title={`Piece · ${firstPiece.label || firstPiece.id}`}
          effect={edges.byPiece?.[firstPiece.id]?.effect ?? defaultEdgeEffect}
          config={edges.byPiece?.[firstPiece.id]?.config ?? defaultEdgeConfig}
          ownEffects={edges.byPiece?.[firstPiece.id]?.effects || {}}
          inheritedEffects={defaultEdgeEffects}
          onSetEffect={(name) => setPieceEdgeEffect(firstPiece.id, name, name === 'wave'
            ? (edges.byPiece?.[firstPiece.id]?.config ?? defaultEdgeConfig) : undefined)}
          onPatchConfig={(patch) => setPieceEdgeConfig(firstPiece.id, patch)}
          onChangeEffects={(map) => setPieceEdgeEffects(firstPiece.id, map)}
          onClear={edges.byPiece?.[firstPiece.id] ? () => clearPieceEdgeOverride(firstPiece.id) : null}
        />
      )}

      {(expandedTier === 'inner' || expandedTier === 'outer') && (
        <EdgeTierEditor
          title={expandedTier === 'inner' ? 'Inner edges' : 'Outer edges'}
          effect={edges[expandedTier]?.effect ?? defaultEdgeEffect}
          config={edges[expandedTier]?.config ?? defaultEdgeConfig}
          ownEffects={edges[expandedTier]?.effects || {}}
          inheritedEffects={defaultEdgeEffects}
          onSetEffect={(name) => setLayerEffect(expandedTier, name, name === 'wave'
            ? (edges[expandedTier]?.config ?? defaultEdgeConfig) : undefined)}
          onPatchConfig={(patch) => setLayerConfig(expandedTier, patch)}
          onChangeEffects={(map) => setLayerEffects(expandedTier, map)}
          onClear={edges[expandedTier] ? () => clearLayer(expandedTier) : null}
        />
      )}

      {expandedTier === 'default' && (
        <EdgeTierEditor
          title="Default edges"
          effect={defaultEdgeEffect}
          config={defaultEdgeConfig}
          ownEffects={defaultEdgeEffects}
          inheritedEffects={{}}
          onSetEffect={(name) => setDefaultEdgeEffect(name, name === 'wave' ? defaultEdgeConfig : undefined)}
          onPatchConfig={setDefaultEdgeConfig}
          onChangeEffects={setDefaultEdgeEffects}
        />
      )}
    </>
  );
}
