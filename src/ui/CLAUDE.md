# src/ui — Application Shell & Pages

State-based routing (no react-router). `App.jsx` owns the page state, the theme, and passes `project` (from `useProject`) to all pages.

## Pages
- `LandingPage` — front-door hero with brand mark, tagline, primary CTAs, feature cards, and a "Continue to docs ↓" link at the bottom. Default first-visit page.
- `DocsPage` — interactive tutorial. Sidebar of sections (`components/docs/*Section.jsx`) with live demos in `components/docs/demos/`.
- `ProjectsPage` — project library + JSON import. Opening a project tile auto-navigates to `Preview`.
- `PreviewPage` — large preview of the current project, rename input, navigation buttons to Grid and Edit, and the **export menu** (JSON / single-file / ZIP).
- `GridEditorPage` — cell grid wrapped in `ViewPanel` for pan/zoom: drag-select, merge/unmerge, resize, color picker, **CSV/TSV paste & file import**, click/drag row & column headers to delete, and **multi-piece background images** (upload or Ctrl+V → fills the current selection).
- `EditPage` — combined editor for the **`Edges`** and **`Cells`** top-nav tabs. Both routes mount the same `EditPage` from a single JSX slot in `App.jsx` with a `mode` prop, so React reconciles and selection state survives tab switches.
  - `Edges` mode (`EdgesPanel`) — full edge cascade (default → inner/outer → cell → per-edge), edge selection + cell-tier piece selection (mutually exclusive), per-tier hover-animation chip row.
  - `Cells` mode (`CellsPanel`) — text/image content per selected piece + per-piece hover-animation override, sitting under a project-wide default cell-hover card.

  Same canvas (`EditCanvas` inside `ViewPanel`) in both modes — only the overlay/interaction layer changes (`EdgeEditorCanvas` vs `CellsCanvas`).

## Components
- `PageNav` — top bar: brand (`箱` mark + "Hakoniwa"), theme toggle, page tabs (Landing / Docs / Projects / Preview / Grid / Edges / Cells).
- `GridCanvas` — interactive SVG grid (drag-select, hover, color reflection, row/col headers with click-or-drag delete).
- `EditCanvas` — thin shell that picks `EdgeEditorCanvas` or `CellsCanvas` based on mode (`'edges'` vs `'cells'`).
- `EdgeEditorCanvas` — `PuzzleBoard` + SVG overlay with clip-path-based edge highlights (tight along edge, `PERP_PAD=60` perpendicular for knobs/waves).
- `CellsCanvas` — `PuzzleBoard` configured with `onSelect` for piece selection (was `ContentCanvas` before the Cells rename).
- `EdgesPanel`, `CellsPanel` — side-panel UIs for the two Edit modes; pure presentation. `EdgesPanel` is a thin orchestrator over `components/edges/{HintCard, LayerCard, SelectedEdgeCard, SelectedPieceCard, StyleControls}.jsx`. Each tier card carries a hover-animation chip row that rides through the existing edge `config` cascade. `CellsPanel` shows a project-wide default cell-hover card plus a per-piece content + hover override card.
- `BackgroundsPanel` — Grid-page side card: upload / paste image, list existing backgrounds with thumbnail + fit selector + delete.
- `ImportDialog` — modal: paste textarea + auto-merge toggle + sample button.
- `SliderRow` — slider + typeable numeric text input. Click value to type, Enter/blur commits, Esc cancels, ↑/↓ steps.
- `ViewPanel` — scrollable/zoomable wrapper. Wheel zooms (no modifier), middle-drag or Ctrl+drag pans. Used by Grid and Edit pages.
- `PreviewSvg` — read-only thumbnail rendered from a Project (uses `pieceColors`).
- `components/interactions/{animations.js, AnimationChips.jsx}` — single source of truth for cell + edge hover-effect catalogues plus the shared chip-row component used by both panels.

## Utils & hooks
- `utils/formatTime.js` — relative-time formatter shared by Projects + Preview pages.
- `utils/computeViewBox.js` — pure: derive an SVG viewBox snug around all pieces (with knob/wave padding). Shared by `EdgeEditorCanvas` and (formerly) `ContentCanvas`.
- `utils/fitOptions.js` — single source of truth for the cover/contain/stretch image-fit options (used by `BackgroundsPanel` + `CellsPanel`).
- `hooks/useFileInput.js` — boilerplate-killer for "hidden `<input type=file>` + a button to open it"; spread `inputProps` and call `open()`.

## Styles (`styles/`)
- `App.css` — shell only: scrollbars, `.app`, `fadeIn`. Imports the shared kit + every per-component / per-page sheet.
- `ui-kit.css` — primitives: `.card`, `.action-btn`, `.chip`, `.slider-control`, `.modal*`, `.form-row`, etc.
- `side-tools.css` — sidebar layout shared by Grid + Edit.

Per-component CSS lives next to its component (e.g. `components/PageNav.css`); per-page CSS lives next to its page (e.g. `pages/EditPage.css`). The puzzle module's `PuzzleBoard.css` is co-located with the rendering code for portability.

## Theme
- `data-theme="light"` on `<html>` switches palette; persisted in `localStorage` under `hakoniwa:theme` (with one-time migration from the legacy `puzzle-studio:theme` key).
- All colors derive from CSS custom properties in `src/index.css` — no theme-specific class names in components.
