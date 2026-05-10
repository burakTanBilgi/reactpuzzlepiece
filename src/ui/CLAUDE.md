# src/ui — Application Shell & Pages

State-based routing (no react-router). `App.jsx` owns the page state, the theme, and passes `project` (from `useProject`) to all pages.

## Pages
- `LandingPage` — project library, import (JSON), export menu (JSON / single-file / ZIP).
- `GridEditorPage` — cell grid: drag-select, merge/unmerge, resize, color picker, **CSV/TSV paste & file import**.
- `EdgeEditorPage` — edge effect picker, per-edge overrides, selection panel.
- `ContentEditorPage` — click any piece → fill it with text or image (with cover/contain/fill).

## Components
- `PageNav` — top bar: theme toggle (sun/moon, leftmost), brand, page tabs (Home / Grid / Edges / Content).
- `GridCanvas` — interactive SVG grid (drag-select, hover, color reflection).
- `EdgeEditorCanvas` — `PuzzleBoard` + SVG overlay with clip-path-based edge highlights (tight along edge, `PERP_PAD=60` perpendicular for knobs/waves).
- `ContentCanvas` — `PuzzleBoard` configured with `onSelect` for piece selection.
- `ImportDialog` — modal: paste textarea + auto-merge toggle + sample button.
- `ViewPanel` — scrollable/zoomable wrapper used by edge & content editors.
- `PreviewSvg` — read-only thumbnail rendered from a Project (uses `pieceColors`).

## Styles (`styles/`)
- `App.css` — page layouts, nav, cards, tiles, modals, color picker, export menu.

The puzzle module's `PuzzleBoard.css` is co-located with the rendering code for portability.

## Theme
- `data-theme="light"` on `<html>` switches palette; persisted in `localStorage` under `puzzle-studio:theme`.
- All colors derive from CSS custom properties in `src/index.css` — no theme-specific class names in components.
