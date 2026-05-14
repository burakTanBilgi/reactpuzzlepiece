import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { compileProject, listSharedEdges } from './compile.js';
import { newProject } from './project.js';
import {
  deleteProject as deleteFromStore,
  loadCurrentId,
  loadProjects,
  saveCurrentId,
  saveProject,
} from './browser-storage.js';
import { exportJSON, importJSON } from './file-io.js';
import { gridActions } from './actions/grid-actions.js';
import { edgeActions } from './actions/edge-actions.js';
import { pieceActions } from './actions/piece-actions.js';
import { backgroundActions } from './actions/background-actions.js';

const AUTOSAVE_MS = 500;

// Top-level project hook. Owns the current project + the list of stored
// projects and auto-saves on mutation. Mutation actions are composed from
// pure factories under ./actions/ — the hook just wires React state into
// them.
export function useProject() {
  const [project, setProject] = useState(loadInitialProject);
  const [projects, setProjects] = useState(() => loadProjects());
  const saveTimer = useRef(null);

  // Auto-save (debounced).
  useEffect(() => {
    if (!project) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const updated = saveProject(project);
      setProjects(loadProjects());
      saveCurrentId(updated.id);
    }, AUTOSAVE_MS);
    return () => clearTimeout(saveTimer.current);
  }, [project]);

  // --- Selectors ---
  const pieces      = useMemo(() => (project ? compileProject(project)    : []), [project]);
  const sharedEdges = useMemo(() => (project ? listSharedEdges(project)   : []), [project]);

  // --- Mutators (composed from pure factories) ---
  // setProject is stable from useState, so the factories only need to run once.
  const actions = useMemo(() => ({
    ...gridActions(setProject),
    ...edgeActions(setProject),
    ...pieceActions(setProject),
    ...backgroundActions(setProject),
  }), []);

  // --- Project metadata ---
  const setName = useCallback((name) => {
    setProject((p) => (p ? { ...p, name } : p));
  }, []);

  // --- Project lifecycle ---
  // These touch both React state and the storage layer, so they live here
  // rather than in a pure action factory.
  const openProject = useCallback((id) => {
    const list = loadProjects();
    const p = list.find((x) => x.id === id);
    if (p) {
      setProject(p);
      saveCurrentId(p.id);
    }
  }, []);

  const createNew = useCallback(() => {
    setProject(newProject('Untitled'));
  }, []);

  const removeProject = useCallback((id) => {
    deleteFromStore(id);
    const list = loadProjects();
    setProjects(list);
    // If the user deleted the open one, jump to the most recent or a fresh one.
    if (project?.id === id) {
      if (list.length > 0) setProject(list[list.length - 1]);
      else setProject(newProject('Untitled'));
    }
  }, [project?.id]);

  const exportCurrent = useCallback(() => {
    if (project) exportJSON(project);
  }, [project]);

  const importFromFile = useCallback(async (file) => {
    const imported = await importJSON(file);
    setProject(imported);
  }, []);

  return {
    project,
    projects,
    pieces,
    sharedEdges,
    setName,
    ...actions,
    openProject,
    createNew,
    removeProject,
    exportCurrent,
    importFromFile,
  };
}

function loadInitialProject() {
  const all = loadProjects();
  const currentId = loadCurrentId();
  if (currentId) {
    const found = all.find((p) => p.id === currentId);
    if (found) return found;
  }
  if (all.length > 0) return all[all.length - 1];
  return newProject('Untitled');
}
