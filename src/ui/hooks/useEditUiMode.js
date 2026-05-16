import { useCallback, useEffect, useState } from 'react';

// Single source of truth for the Edit page's UI mode + the cross-cutting
// preset-tiles toggle. Both values are mirrored to localStorage so a
// reload preserves the user's choice.
//
// Mode values:
//   'canvas'  — Direction A (canvas-first popovers; default)
//   'layers'  — Direction E (layers panel + properties pane)
//   'flat'    — Direction B (reserved, picker disables it for now)
//   'modes'   — Direction C (reserved, picker disables it for now)
//
// `tiles` is the global preset-tiles preference (Direction D). Modes
// can consult it to swap sliders for preset tile grids when desired.

const MODE_KEY  = 'hakoniwa:editUiMode';
const TILES_KEY = 'hakoniwa:editUiTiles';

const VALID_MODES = new Set(['canvas', 'layers', 'flat', 'modes']);

function readMode() {
  try {
    const raw = localStorage.getItem(MODE_KEY);
    return VALID_MODES.has(raw) ? raw : 'canvas';
  } catch { return 'canvas'; }
}

function readTiles() {
  try {
    return localStorage.getItem(TILES_KEY) === '1';
  } catch { return false; }
}

export function useEditUiMode() {
  const [mode, setModeState] = useState(readMode);
  const [tiles, setTilesState] = useState(readTiles);

  useEffect(() => {
    try { localStorage.setItem(MODE_KEY, mode); } catch { /* ignore */ }
  }, [mode]);

  useEffect(() => {
    try { localStorage.setItem(TILES_KEY, tiles ? '1' : '0'); } catch { /* ignore */ }
  }, [tiles]);

  const setMode = useCallback((next) => {
    if (VALID_MODES.has(next)) setModeState(next);
  }, []);

  const setTiles = useCallback((next) => setTilesState(!!next), []);

  return { mode, setMode, tiles, setTiles };
}
