// localStorage persistence for projects. Auto-loads on init; writes on save.

import { makeFreshGrid } from './grid.js';

const PROJECTS_KEY = 'puzzle-studio:projects';
const CURRENT_KEY  = 'puzzle-studio:currentId';

let _pid = 0;
const newProjectId = () => `p-${Date.now().toString(36)}-${++_pid}`;

export function newProject(name = 'Untitled') {
  const now = Date.now();
  return {
    id: newProjectId(),
    name,
    createdAt: now,
    updatedAt: now,
    grid: makeFreshGrid(2, 2),
    edges: {
      default: { effect: 'puzzle' },
      byEdge: {},
    },
    pieceColors: {},
    pieceContent: {},
  };
}

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

// --- Import / Export --------------------------------------------------------

export function exportJSON(project) {
  const data = JSON.stringify(project, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(project.name || 'project').replace(/\s+/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const obj = JSON.parse(e.target.result);
        if (!obj?.grid?.groups || !Array.isArray(obj.grid.groups)) {
          throw new Error('Invalid project file');
        }
        // Re-id the imported project so it doesn't collide with existing ones.
        resolve({ ...obj, id: newProjectId(), updatedAt: Date.now() });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
