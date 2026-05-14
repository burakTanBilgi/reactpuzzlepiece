// Pure action factory for edge effect/config mutations. The cascade is
// `byEdge[pairKey] > inner/outer layer > default` — these setters write into
// the matching tier; resolution at read time happens in compile.js.
export function edgeActions(setProject) {
  const mutateEdges = (updater) =>
    setProject((p) => (p ? { ...p, edges: updater(p.edges) } : p));

  return {
    // --- Default tier ---
    setDefaultEdgeEffect(effect, config) {
      mutateEdges((e) => ({ ...e, default: { effect, ...(config ? { config } : {}) } }));
    },

    setDefaultEdgeConfig(patch) {
      mutateEdges((e) => ({
        ...e,
        default: { ...e.default, config: { ...(e.default.config || {}), ...patch } },
      }));
    },

    // --- Per-edge tier (highest priority) ---
    setEdgeEffect(pairKey, effect, config) {
      mutateEdges((e) => ({
        ...e,
        byEdge: { ...e.byEdge, [pairKey]: { effect, ...(config ? { config } : {}) } },
      }));
    },

    setEdgeConfig(pairKey, patch) {
      mutateEdges((e) => {
        const cur = e.byEdge[pairKey] || { effect: e.default.effect };
        return {
          ...e,
          byEdge: { ...e.byEdge, [pairKey]: { ...cur, config: { ...(cur.config || {}), ...patch } } },
        };
      });
    },

    clearEdgeOverride(pairKey) {
      mutateEdges((e) => {
        const next = { ...e.byEdge };
        delete next[pairKey];
        return { ...e, byEdge: next };
      });
    },

    // Clear every override below the layer/default tier — both per-edge
    // (byEdge) and per-cell (byPiece). The "Clear all overrides" button
    // surfaces this as a single user-facing action.
    resetEdgeOverrides() {
      mutateEdges((e) => ({ ...e, byEdge: {}, byPiece: {} }));
    },

    // --- Layer tier (inner / outer) ---
    setLayerEffect(kind, effect, config) {
      mutateEdges((e) => ({ ...e, [kind]: { effect, ...(config ? { config } : {}) } }));
    },

    setLayerConfig(kind, patch) {
      mutateEdges((e) => {
        const cur = e[kind] || { effect: e.default?.effect ?? 'puzzle' };
        return { ...e, [kind]: { ...cur, config: { ...(cur.config || {}), ...patch } } };
      });
    },

    clearLayer(kind) {
      mutateEdges((e) => ({ ...e, [kind]: null }));
    },

    // --- Cell tier (byPiece) — applies to every edge of the piece ---
    setPieceEdgeEffect(pieceId, effect, config) {
      mutateEdges((e) => ({
        ...e,
        byPiece: { ...(e.byPiece || {}), [pieceId]: { effect, ...(config ? { config } : {}) } },
      }));
    },

    setPieceEdgeConfig(pieceId, patch) {
      mutateEdges((e) => {
        const cur = e.byPiece?.[pieceId] || { effect: e.default?.effect ?? 'puzzle' };
        return {
          ...e,
          byPiece: {
            ...(e.byPiece || {}),
            [pieceId]: { ...cur, config: { ...(cur.config || {}), ...patch } },
          },
        };
      });
    },

    clearPieceEdgeOverride(pieceId) {
      mutateEdges((e) => {
        const next = { ...(e.byPiece || {}) };
        delete next[pieceId];
        return { ...e, byPiece: next };
      });
    },
  };
}
