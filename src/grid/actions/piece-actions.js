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

    // --- Cell hover-animation tier ---
    // Lives in `cells: { default, byPiece }`. Two-tier cascade resolves in
    // compile.js#resolveCellAnimation. Pass null/'none' to clear.
    setDefaultCellHoverAnimation(animation) {
      const value = animation === 'none' ? null : animation;
      setProject((p) => {
        if (!p) return p;
        const cells = p.cells || { default: {}, byPiece: {} };
        return {
          ...p,
          cells: { ...cells, default: { ...(cells.default || {}), hoverAnimation: value } },
        };
      });
    },

    setCellHoverAnimation(pieceId, animation) {
      const value = animation === 'none' ? null : animation;
      setProject((p) => {
        if (!p) return p;
        const cells = p.cells || { default: {}, byPiece: {} };
        const byPiece = { ...(cells.byPiece || {}) };
        if (value == null) {
          delete byPiece[pieceId];
        } else {
          byPiece[pieceId] = { ...(byPiece[pieceId] || {}), hoverAnimation: value };
        }
        return { ...p, cells: { ...cells, byPiece } };
      });
    },
  };
}
