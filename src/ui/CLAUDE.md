# src/ui — Application Shell & Pages

State-based routing (no react-router). `App.jsx` owns the page state, the theme, and passes `project` (from `useProject`) to all pages.

## Pages
- `LandingPage` — front-door hero with brand mark, tagline, primary CTAs, feature cards, and a "Continue to docs ↓" link at the bottom. Default first-visit page.
- `DocsPage` — interactive tutorial. Sidebar of sections (`components/docs/*Section.jsx`) with live demos in `components/docs/demos/`.
- `ProjectsPage` — project library + JSON import. Opening a project tile auto-navigates to `Preview`.
- `PreviewPage` — large preview of the current project, rename input, navigation buttons to Grid and Edit, and the **export menu** (JSON / single-file / ZIP).
- `GridEditorPage` — cell grid wrapped in `ViewPanel` for pan/zoom: drag-select, merge/unmerge, resize, color picker, **CSV/TSV paste & file import**, click/drag row & column headers to delete, and **multi-piece background images** (upload or Ctrl+V → fills the current selection).
- `EditPage` — single selection-driven editor. Replaces the old Edges / Cells split. One canvas (`EdgeEditorCanvas` inside `ViewPanel`) with both edge hit-rects AND piece clicks always live; one side-panel `Inspector` that adapts to selection (project defaults / piece / edge). Selection state lives on `EditPage` so the canvas can read it; edge and piece selections are mutually exclusive. Legacy `?page=edges` / `?page=cells` localStorage values migrate to `edit`.

## Components
- `PageNav` — top bar: brand (`箱` mark + "Hakoniwa"), theme toggle, page tabs (Landing / Docs / Projects / Preview / Grid / Edit).
- `GridCanvas` — interactive SVG grid (drag-select, hover, color reflection, row/col headers with click-or-drag delete).
- `EdgeEditorCanvas` — `PuzzleBoard` + SVG overlay with clip-path-based edge highlights (tight along edge, `PERP_PAD=60` perpendicular for knobs/waves). Renders override badges (style-only dot, anim-only dot, or two-tone for both) on edges with `byEdge` entries and a dashed inset outline on pieces with `byPiece` entries.
- `components/inspector/` — the Edit page's selection-driven side panel.
  - `Inspector.jsx` — orchestrator. Picks between `ProjectDefaultsCard` (no selection), `PieceInspector` (piece selected), `EdgeInspector` (edge(s) selected). Owns `expandedTier` and the PieceInspector `activeTab` state so they survive intra-selection edits but reset when the selection changes.
  - `CascadeStrip.jsx` — sticky 4-pill cascade visualization (`Default → Inner → Outer → Piece → Edge`). Pill state: filled (override set) / hollow (inheriting) / dashed (N/A for current selection). Click expands an inline tier sub-card via `expandedTier`.
  - `SourcePill.jsx` — `(from X)` per-property badge for cascade source.
  - `InspectorSubcard.jsx`, `InspectorTabs.jsx` — visual primitives.
  - `EdgeTierEditor.jsx`, `CellTierEditor.jsx` — reusable per-tier editors. EdgeTierEditor renders two visually separated sub-cards (`Shape & stroke` + `Animations`); the cascade tier picks the setters.
  - `cascade-source.js` — pure helpers `computeTierStates`, `tierHasOverride`, `resolveEdgePropSource`, `tierLabel`.
  - `PieceInspector.jsx` — tabbed Content / Body / Edges editor for the selected piece. Eliminates the dual piece-editor surface the old Edges + Cells modes had.
  - `EdgeInspector.jsx` — single/multi edge editor with MIXED detection; inline tier expansion for Default / Inner / Outer / Piece via the cascade strip.
  - `ProjectDefaultsCard.jsx` — no-selection view: default edges + default body + optional inline Inner/Outer expanders.
- `components/edges/{StyleControls.jsx, constants.js}` — kept after the rewrite; `StyleControls` is the per-tier stroke style row (color / opacity / width) reused by every edge tier editor.
- `BackgroundsPanel` — Grid-page side card: upload / paste image, list existing backgrounds with thumbnail + fit selector + delete.
- `ImportDialog` — modal: paste textarea + auto-merge toggle + sample button.
- `SliderRow` — slider + typeable numeric text input. Click value to type, Enter/blur commits, Esc cancels, ↑/↓ steps.
- `ViewPanel` — scrollable/zoomable wrapper. Wheel zooms (no modifier), middle-drag or Ctrl+drag pans. Used by Grid and Edit pages.
- `PreviewSvg` — read-only thumbnail rendered from a Project (uses `pieceColors`).
- `components/interactions/EffectsPicker.jsx` — multi-select effects editor (chip row + collapsible per-effect editor with trigger / scope / config). Used by every tier card across the Inspector for animation editing.

## Utils & hooks
- `utils/formatTime.js` — relative-time formatter shared by Projects + Preview pages.
- `utils/computeViewBox.js` — pure: derive an SVG viewBox snug around all pieces (with knob/wave padding). Used by `EdgeEditorCanvas`.
- `utils/fitOptions.js` — single source of truth for the cover/contain/stretch image-fit options (used by `BackgroundsPanel` + `PieceInspector`).
- `hooks/useFileInput.js` — boilerplate-killer for "hidden `<input type=file>` + a button to open it"; spread `inputProps` and call `open()`.

## Styles (`styles/`)
- `App.css` — shell only: scrollbars, `.app`, `fadeIn`. Imports the shared kit + every per-component / per-page sheet.
- `ui-kit.css` — primitives: `.card`, `.action-btn`, `.chip`, `.slider-control`, `.modal*`, `.form-row`, etc.
- `side-tools.css` — sidebar layout shared by Grid + Edit.

Per-component CSS lives next to its component (e.g. `components/PageNav.css`); per-page CSS lives next to its page (e.g. `pages/EditPage.css`). The puzzle module's `PuzzleBoard.css` is co-located with the rendering code for portability.

## Theme
- `data-theme="light"` on `<html>` switches palette; persisted in `localStorage` under `hakoniwa:theme` (with one-time migration from the legacy `puzzle-studio:theme` key).
- All colors derive from CSS custom properties in `src/index.css` — no theme-specific class names in components.
