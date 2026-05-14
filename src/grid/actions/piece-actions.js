// Pure action factory for per-piece colour and content mutations. Both maps
// (pieceColors, pieceContent) are keyed by groupId and updated immutably.
export function pieceActions(setProject) {
  return {
    setPieceColor(pieceId, color) {
      setProject((p) => {
        if (!p) return p;
        const colors = { ...(p.pieceColors || {}) };
        if (color == null) delete colors[pieceId];
        else colors[pieceId] = color;
        return { ...p, pieceColors: colors };
      });
    },

    clearPieceColors() {
      setProject((p) => (p ? { ...p, pieceColors: {} } : p));
    },

    setPieceContent(pieceId, content) {
      setProject((p) => {
        if (!p) return p;
        const all = { ...(p.pieceContent || {}) };
        if (content == null) delete all[pieceId];
        else all[pieceId] = content;
        return { ...p, pieceContent: all };
      });
    },

    updatePieceContent(pieceId, patch) {
      setProject((p) => {
        if (!p) return p;
        const all = { ...(p.pieceContent || {}) };
        const cur = all[pieceId] || {};
        all[pieceId] = { ...cur, ...patch };
        return { ...p, pieceContent: all };
      });
    },

    clearPieceContent() {
      setProject((p) => (p ? { ...p, pieceContent: {} } : p));
    },

    // --- Cell effects tier (v2) ---
    // Project shape: `cells: { default: { effects }, byPiece: { [id]: { effects } } }`
    // The picker computes the new map (with auto-swap conflict resolution)
    // and writes it whole — simpler than per-entry CRUD. Two-tier cascade
    // resolves in compile.js#resolveCellEffects.
    setDefaultCellEffects(effects) {
      setProject((p) => {
        if (!p) return p;
        const cells = p.cells || { default: {}, byPiece: {} };
        return {
          ...p,
          cells: { ...cells, default: { ...(cells.default || {}), effects: effects || {} } },
        };
      });
    },

    setCellEffects(pieceId, effects) {
      setProject((p) => {
        if (!p) return p;
        const cells = p.cells || { default: {}, byPiece: {} };
        const byPiece = { ...(cells.byPiece || {}) };
        const isEmpty = !effects || Object.keys(effects).length === 0;
        if (isEmpty) {
          delete byPiece[pieceId];
        } else {
          byPiece[pieceId] = { ...(byPiece[pieceId] || {}), effects };
        }
        return { ...p, cells: { ...cells, byPiece } };
      });
    },
  };
}
