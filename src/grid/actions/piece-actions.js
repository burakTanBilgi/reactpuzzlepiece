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
  };
}
