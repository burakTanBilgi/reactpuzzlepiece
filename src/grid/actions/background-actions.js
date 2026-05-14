// Pure action factory for project-level background images.
import { nextBgId } from '../ids.js';

export function backgroundActions(setProject) {
  return {
    addBackground({ src, rect, fit = 'cover' }) {
      setProject((p) => {
        if (!p) return p;
        const next = [...(p.backgrounds || []), { id: nextBgId(), src, rect, fit }];
        return { ...p, backgrounds: next };
      });
    },

    updateBackground(id, patch) {
      setProject((p) => {
        if (!p) return p;
        const list = (p.backgrounds || []).map((b) => (b.id === id ? { ...b, ...patch } : b));
        return { ...p, backgrounds: list };
      });
    },

    removeBackground(id) {
      setProject((p) => {
        if (!p) return p;
        const list = (p.backgrounds || []).filter((b) => b.id !== id);
        return { ...p, backgrounds: list };
      });
    },
  };
}
