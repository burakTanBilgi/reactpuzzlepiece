import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { compileProject, listSharedEdges } from './compile.js';
import { newProject } from './project.js';
import {
  deleteProject as deleteFromStore,
  loadCurrentId,
  loadProjects,
  saveCurrentId,
  saveProject,
  saveProjects,
} from './browser-storage.js';
import { exportJSON, importJSON } from './file-io.js';
import { gridActions } from './actions/grid-actions.js';
import { edgeActions } from './actions/edge-actions.js';
import { pieceActions } from './actions/piece-actions.js';
import { backgroundActions } from './actions/background-actions.js';
import { cloudLoadProjects, cloudSaveProject, cloudDeleteProject } from './cloud-storage.js';

const AUTOSAVE_MS = 500;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function makeUuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback (RFC 4122 v4-shaped) — rarely hit.
  const hex = (n) => Math.floor(Math.random() * 16 ** n).toString(16).padStart(n, '0');
  return `${hex(8)}-${hex(4)}-${hex(4)}-${hex(4)}-${hex(12)}`;
}

function ensureUuid(project) {
  if (project.id && UUID_RE.test(project.id)) return project;
  return { ...project, id: makeUuid() };
}

const firstSyncKey = (userId) => `hakoniwa:cloud:user:${userId}`;

function isFirstSync(userId) {
  try { return !localStorage.getItem(firstSyncKey(userId)); } catch { return true; }
}

function markSynced(userId) {
  try { localStorage.setItem(firstSyncKey(userId), '1'); } catch { /* ignore */ }
}

// Top-level project hook. Owns the current project + the list of stored
// projects and auto-saves on mutation. Mutation actions are composed
// from pure factories under ./actions/ — the hook just wires React
// state into them.
//
// When `userId` is non-null, the hook layers cloud sync on top:
//   * First-time sign-in for that user: upload every local project.
//   * Returning user: load from cloud and overwrite the local cache.
//   * Autosave: every debounced local save is followed by a cloud
//     upsert; `syncStatus` reflects the in-flight state.
// localStorage stays as the fast cache so first paint never blocks.
export function useProject(userId = null) {
  const [project,    setProject]    = useState(loadInitialProject);
  const [projects,   setProjects]   = useState(() => loadProjects());
  const [syncStatus, setSyncStatus] = useState(userId ? 'syncing' : 'offline');
  const saveTimer   = useRef(null);
  const prevUserRef = useRef(undefined);   // undefined sentinel = first mount
  const skipAutosaveRef = useRef(false);   // suppress the first save after a cloud-pull

  // Reconcile cloud + local whenever the signed-in user changes.
  useEffect(() => {
    if (!userId) {
      // Sign-out (or boot without a user). Skip the cleanup on the very
      // first mount so we don't wipe localStorage just because no user
      // has logged in yet.
      if (prevUserRef.current) {
        saveProjects([]);
        setProjects([]);
        setProject(newProject('Untitled'));
      }
      prevUserRef.current = userId;
      setSyncStatus('offline');
      return;
    }

    let cancelled = false;
    setSyncStatus('syncing');
    prevUserRef.current = userId;

    (async () => {
      try {
        if (isFirstSync(userId)) {
          // First time this user signs in on this device: push every
          // existing local project up. Migrate any non-uuid ids first
          // so they fit the cloud's `id uuid PK` column.
          const locals = loadProjects();
          let migrated = locals;
          let needsRewrite = false;
          migrated = locals.map((p) => {
            if (UUID_RE.test(p.id)) return p;
            needsRewrite = true;
            return ensureUuid(p);
          });
          if (needsRewrite) {
            saveProjects(migrated);
            // If the open project's id was rewritten, point the local
            // cache at the new id so nothing dangles.
            if (project && !UUID_RE.test(project.id)) {
              const match = migrated.find((p) => p.createdAt === project.createdAt && p.name === project.name);
              if (match) {
                setProject(match);
                saveCurrentId(match.id);
              }
            }
            setProjects(migrated);
          }
          for (const p of migrated) {
            await cloudSaveProject(userId, p);
          }
          markSynced(userId);
        } else {
          const cloud = await cloudLoadProjects(userId);
          if (cancelled) return;
          if (cloud.length > 0) {
            saveProjects(cloud);
            setProjects(cloud);
            const currentId = project?.id || loadCurrentId();
            const cloudCurrent = cloud.find((p) => p.id === currentId);
            const next = cloudCurrent || cloud[cloud.length - 1];
            // Skip the next autosave: we just downloaded this exact
            // project, no need to immediately re-upload it.
            skipAutosaveRef.current = true;
            setProject(next);
            saveCurrentId(next.id);
          }
        }
        if (!cancelled) setSyncStatus('synced');
      } catch (e) {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.warn('[cloud-sync] reconcile failed:', e);
          setSyncStatus('error');
        }
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Auto-save (debounced) — writes local first (fast path), then upserts
  // to cloud when signed in.
  useEffect(() => {
    if (!project) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const updated = saveProject(project);
      setProjects(loadProjects());
      saveCurrentId(updated.id);
      if (!userId) return;
      if (skipAutosaveRef.current) { skipAutosaveRef.current = false; return; }
      setSyncStatus('syncing');
      try {
        await cloudSaveProject(userId, updated);
        setSyncStatus('synced');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[cloud-sync] upsert failed:', e);
        setSyncStatus('error');
      }
    }, AUTOSAVE_MS);
    return () => clearTimeout(saveTimer.current);
  }, [project, userId]);

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
  // These touch both React state and the storage layer, so they live
  // here rather than in a pure action factory.
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

  const removeProject = useCallback(async (id) => {
    deleteFromStore(id);
    const list = loadProjects();
    setProjects(list);
    if (userId) {
      try { await cloudDeleteProject(userId, id); }
      catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[cloud-sync] delete failed:', e);
      }
    }
    if (project?.id === id) {
      if (list.length > 0) setProject(list[list.length - 1]);
      else setProject(newProject('Untitled'));
    }
  }, [project?.id, userId]);

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
    syncStatus,
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
