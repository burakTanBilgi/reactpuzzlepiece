# src/ui — Application Shell & Pages

State-based routing (no react-router). `App.jsx` owns the page state, the theme, and passes `project` (from `useProject`) to all pages.

## Pages
- `ProjectsPage` — project library + JSON import. Opening a project tile auto-navigates to `Preview`.
- `PreviewPage` — large preview of the current project, rename input, navigation buttons to Grid and Edit, and the **export menu** (JSON / single-file / ZIP).
- `GridEditorPage` — cell grid wrapped in `ViewPanel` for pan/zoom: drag-select, merge/unmerge, resize, color picker, **CSV/TSV paste & file import**, click/drag row & column headers to delete, and **multi-piece background images** (upload or Ctrl+V → fills the current selection).
- `EditPage` — combined editor with two modes selectable in the side panel:
  - `Edges` mode (`EdgesPanel`) — default effect, per-edge overrides, multi-edge selection.
  - `Content` mode (`ContentPanel`) — text/image content per selected piece, with fit (cover/contain/stretch) and alignment.

  Same canvas (`EditCanvas` inside `ViewPanel`) in both modes — only the overlay/interaction layer changes (`EdgeEditorCanvas` vs `ContentCanvas`). Selection state is preserved per mode across mode switches.

## Components
- `PageNav` — top bar: brand (`箱` mark + "Hakoniwa"), theme toggle, page tabs (Projects / Preview / Grid / Edit).
- `GridCanvas` — interactive SVG grid (drag-select, hover, color reflection, row/col headers with click-or-drag delete).
- `EditCanvas` — thin shell that picks `EdgeEditorCanvas` or `ContentCanvas` based on mode.
- `EdgeEditorCanvas` — `PuzzleBoard` + SVG overlay with clip-path-based edge highlights (tight along edge, `PERP_PAD=60` perpendicular for knobs/waves).
- `ContentCanvas` — `PuzzleBoard` configured with `onSelect` for piece selection.
- `EdgesPanel`, `ContentPanel` — side-panel UIs for the two Edit modes; pure presentation.
- `BackgroundsPanel` — Grid-page side card: upload / paste image, list existing backgrounds with thumbnail + fit selector + delete.
- `ImportDialog` — modal: paste textarea + auto-merge toggle + sample button.
- `SliderRow` — slider + typeable numeric text input. Click value to type, Enter/blur commits, Esc cancels, ↑/↓ steps.
- `ViewPanel` — scrollable/zoomable wrapper. Wheel zooms (no modifier), middle-drag or Ctrl+drag pans. Used by Grid and Edit pages.
- `PreviewSvg` — read-only thumbnail rendered from a Project (uses `pieceColors`).

## Utils
- `utils/formatTime.js` — relative-time formatter shared by Projects + Preview pages.

## Styles (`styles/`)
- `App.css` — shell only: scrollbars, `.app`, `fadeIn`. Imports the shared kit + every per-component / per-page sheet.
- `ui-kit.css` — primitives: `.card`, `.action-btn`, `.chip`, `.slider-control`, `.modal*`, `.form-row`, etc.
- `side-tools.css` — sidebar layout shared by Grid + Edit.

Per-component CSS lives next to its component (e.g. `components/PageNav.css`); per-page CSS lives next to its page (e.g. `pages/EditPage.css`). The puzzle module's `PuzzleBoard.css` is co-located with the rendering code for portability.

## Theme
- `data-theme="light"` on `<html>` switches palette; persisted in `localStorage` under `hakoniwa:theme` (with one-time migration from the legacy `puzzle-studio:theme` key).
- All colors derive from CSS custom properties in `src/index.css` — no theme-specific class names in components.
