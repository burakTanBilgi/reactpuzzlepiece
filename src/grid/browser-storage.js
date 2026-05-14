// localStorage persistence for projects. Browser-only — server-side callers
// must use the in-memory project shape from project.js directly.

const PROJECTS_KEY = 'hakoniwa:projects';
const CURRENT_KEY  = 'hakoniwa:currentId';

// One-time migration from the previous (puzzle-studio) namespace.
const LEGACY_PROJECTS_KEY = 'puzzle-studio:projects';
const LEGACY_CURRENT_KEY  = 'puzzle-studio:currentId';

function migrateLegacyKeys() {
  try {
    if (!localStorage.getItem(PROJECTS_KEY)) {
      const legacy = localStorage.getItem(LEGACY_PROJECTS_KEY);
      if (legacy) localStorage.setItem(PROJECTS_KEY, legacy);
    }
    if (!localStorage.getItem(CURRENT_KEY)) {
      const legacy = localStorage.getItem(LEGACY_CURRENT_KEY);
      if (legacy) localStorage.setItem(CURRENT_KEY, legacy);
    }
  } catch { /* ignore */ }
}
migrateLegacyKeys();

export function loadProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProjects(list) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
  } catch {
    // ignore quota errors silently
  }
}

export function saveProject(project) {
  const list = loadProjects();
  const idx = list.findIndex((p) => p.id === project.id);
  const updated = { ...project, updatedAt: Date.now() };
  if (idx >= 0) list[idx] = updated;
  else list.push(updated);
  saveProjects(list);
  return updated;
}

export function deleteProject(id) {
  saveProjects(loadProjects().filter((p) => p.id !== id));
}

export function loadCurrentId() {
  try { return localStorage.getItem(CURRENT_KEY); } catch { return null; }
}

export function saveCurrentId(id) {
  try { localStorage.setItem(CURRENT_KEY, id); } catch { /* ignore */ }
}
