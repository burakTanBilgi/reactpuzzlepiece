import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mergeCells, resizeGrid, unmergeCells } from './grid.js';
import { compileProject, listSharedEdges } from './compile.js';
import {
  deleteProject as deleteFromStore,
  importJSON,
  exportJSON,
  loadCurrentId,
  loadProjects,
  newProject,
  saveCurrentId,
  saveProject,
} from './storage.js';

const AUTOSAVE_MS = 500;

// Top-level project hook. Owns the current project + the list of stored
// projects, auto-saves on mutation, and exposes mutation actions.
export function useProject() {
  const [project, setProject] = useState(() => loadInitialProject());
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
  const pieces = useMemo(() => (project ? compileProject(project) : []), [project]);
  const sharedEdges = useMemo(() => (project ? listSharedEdges(project) : []), [project]);

  // --- Mutators ---
  const mutateGrid = useCallback((updater) => {
    setProject((p) => (p ? { ...p, grid: updater(p.grid) } : p));
  }, []);

  const mutateEdges = useCallback((updater) => {
    setProject((p) => (p ? { ...p, edges: updater(p.edges) } : p));
  }, []);

  const setName = useCallback((name) => {
    setProject((p) => (p ? { ...p, name } : p));
  }, []);

  const setGrid = useCallback(({ rows, cols }) => {
    mutateGrid((g) => resizeGrid(g, rows ?? g.rows, cols ?? g.cols));
  }, [mutateGrid]);

  const merge = useCallback((cellRefs) => {
    mutateGrid((g) => mergeCells(g, cellRefs));
  }, [mutateGrid]);

  const unmerge = useCallback((cellRefs) => {
    mutateGrid((g) => unmergeCells(g, cellRefs));
  }, [mutateGrid]);

  const setDefaultEdgeEffect = useCallback((effect, config) => {
    mutateEdges((e) => ({ ...e, default: { effect, ...(config ? { config } : {}) } }));
  }, [mutateEdges]);

  const setDefaultEdgeConfig = useCallback((patch) => {
    mutateEdges((e) => ({
      ...e,
      default: {
        ...e.default,
        config: { ...(e.default.config || {}), ...patch },
      },
    }));
  }, [mutateEdges]);

  const setEdgeEffect = useCallback((pairKey, effect, config) => {
    mutateEdges((e) => ({
      ...e,
      byEdge: {
        ...e.byEdge,
        [pairKey]: { effect, ...(config ? { config } : {}) },
      },
    }));
  }, [mutateEdges]);

  const setEdgeConfig = useCallback((pairKey, patch) => {
    mutateEdges((e) => {
      const cur = e.byEdge[pairKey] || { effect: e.default.effect };
      return {
        ...e,
        byEdge: {
          ...e.byEdge,
          [pairKey]: { ...cur, config: { ...(cur.config || {}), ...patch } },
        },
      };
    });
  }, [mutateEdges]);

  const clearEdgeOverride = useCallback((pairKey) => {
    mutateEdges((e) => {
      const next = { ...e.byEdge };
      delete next[pairKey];
      return { ...e, byEdge: next };
    });
  }, [mutateEdges]);

  const resetEdgeOverrides = useCallback(() => {
    mutateEdges((e) => ({ ...e, byEdge: {} }));
  }, [mutateEdges]);

  const setPieceColor = useCallback((pieceId, color) => {
    setProject((p) => {
      if (!p) return p;
      const colors = { ...(p.pieceColors || {}) };
      if (color == null) delete colors[pieceId];
      else colors[pieceId] = color;
      return { ...p, pieceColors: colors };
    });
  }, []);

  const clearPieceColors = useCallback(() => {
    setProject((p) => (p ? { ...p, pieceColors: {} } : p));
  }, []);

  const setPieceContent = useCallback((pieceId, content) => {
    setProject((p) => {
      if (!p) return p;
      const all = { ...(p.pieceContent || {}) };
      if (content == null) delete all[pieceId];
      else all[pieceId] = content;
      return { ...p, pieceContent: all };
    });
  }, []);

  const updatePieceContent = useCallback((pieceId, patch) => {
    setProject((p) => {
      if (!p) return p;
      const all = { ...(p.pieceContent || {}) };
      const cur = all[pieceId] || {};
      all[pieceId] = { ...cur, ...patch };
      return { ...p, pieceContent: all };
    });
  }, []);

  const clearPieceContent = useCallback(() => {
    setProject((p) => (p ? { ...p, pieceContent: {} } : p));
  }, []);

  // Replace the entire grid (used by CSV/TSV import).
  const replaceGrid = useCallback((grid, content) => {
    setProject((p) => {
      if (!p) return p;
      return {
        ...p,
        grid,
        // Reset edges/colors/content since piece IDs are new.
        edges: { default: p.edges?.default ?? { effect: 'puzzle' }, byEdge: {} },
        pieceColors: {},
        pieceContent: content || {},
      };
    });
  }, []);

  // --- Project lifecycle ---
  const openProject = useCallback((id) => {
    const list = loadProjects();
    const p = list.find((x) => x.id === id);
    if (p) {
      setProject(p);
      saveCurrentId(p.id);
    }
  }, []);

  const createNew = useCallback(() => {
    const p = newProject('Untitled');
    setProject(p);
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
    setGrid,
    merge,
    unmerge,
    setDefaultEdgeEffect,
    setDefaultEdgeConfig,
    setEdgeEffect,
    setEdgeConfig,
    clearEdgeOverride,
    resetEdgeOverrides,
    setPieceColor,
    clearPieceColors,
    setPieceContent,
    updatePieceContent,
    clearPieceContent,
    replaceGrid,
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
