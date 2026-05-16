# src/ui — Application Shell & Pages

State-based routing (no react-router). `App.jsx` owns the page state, the theme, and passes `project` (from `useProject`) to all pages. Non-landing pages are `React.lazy`-loaded so the initial bundle ships only the LandingPage + nav.

## Pages
- `LandingPage` — front-door hero with brand mark, tagline, primary CTAs, feature cards, and a "Continue to docs ↓" link at the bottom. Default first-visit page. Entrance fade-in + animated wave/grid motif behind the hero.
- `DocsPage` — interactive tutorial. Sidebar of sections (`components/docs/*Section.jsx`) with live demos in `components/docs/demos/`.
- `ProjectsPage` — project library + JSON import. Opening a project tile auto-navigates to `Preview`.
- `PreviewPage` — large preview of the current project, rename input, navigation buttons to Grid and Edit, and the **export menu** (JSON / single-file / ZIP).
- `GridEditorPage` — cell grid wrapped in `ViewPanel` for pan/zoom: drag-select, merge/unmerge (preserves piece colors), resize, color picker, **CSV/TSV paste & file import**, click/drag row & column headers to delete, and **multi-piece background images** (upload or Ctrl+V → fills the current selection). The left rail is a viewport-locked stack of `AccordionCard`s — Selection / Color / Backgrounds / Dimensions / Import / Tips — with one open at a time. Selecting cells while a passive card (Dimensions / Tips / Import) is open auto-snaps to Selection.
- `EditPage` — single selection-driven editor. One canvas (`EdgeEditorCanvas` inside `ViewPanel`) with both edge hit-rects AND piece clicks always live; one side-panel `Inspector` that adapts to selection (project defaults / piece / edge). Selection state lives on `EditPage`; edge and piece selections are mutually exclusive. Above the inspector is a pair of icon toggles (`.fx-icon-btn`) that independently silence the canvas's hover- and click-driven previews (`edge-canvas--no-hover-fx` / `edge-canvas--no-click-fx` modifier classes). Legacy `?page=edges` / `?page=cells` localStorage values migrate to `edit`.

## Components
- `PageNav` — top bar: brand (`箱` mark + "Hakoniwa"), theme toggle, page tabs (Landing / Docs / Projects / Preview / Grid / Edit).
- `GridCanvas` — interactive SVG grid (drag-select, hover, color reflection, row/col headers with click-or-drag delete).
- `EdgeEditorCanvas` — `PuzzleBoard` + SVG overlay with clip-path-based edge highlights (tight along edge, `PERP_PAD=60` perpendicular for knobs/waves). Renders override badges (style-only dot, anim-only dot, or two-tone for both) on edges with `byEdge` entries and a dashed inset outline on pieces with `byPiece` entries. Wrapper carries `edge-canvas--no-hover-fx` / `edge-canvas--no-click-fx` when the toggle group in the rail disables those preview channels.
- `AccordionCard` — reusable single-open accordion primitive. Closed cards render header-only at 32 px (`flex: 0 0 auto`); the open card takes `flex: 1 1 0; min-height: 0` so it consumes the remaining rail height. Its body is the only place vertical scroll is permitted in the rail.
- `components/inspector/` — the Edit page's selection-driven side panel.
  - `Inspector.jsx` — orchestrator. Renders the sticky `CascadeStrip` plus an `.inspector-acc` flex column of `AccordionCard`s, one per applicable tier (`Default` always; `Inner` / `Outer` when applicable; `Piece` when a piece is selected or as the touching piece of a selected edge; `Edge` when an edge is selected). Cascade-pill clicks and accordion-header clicks share the same `expandedTier` state. `openTier = expandedTier || currentTier` so something is always open. PieceInspector's tab state (`activeTab`) also lives here so it survives intra-selection edits.
  - `CascadeStrip.jsx` — 4-pill cascade visualization (`Default → Inner → Outer → Piece → Edge`). Pill state: filled (override set) / hollow (inheriting) / dashed (N/A for current selection). Clicking a pill sets `expandedTier`, opening the matching accordion card.
  - `SourcePill.jsx` — `(from X)` per-property badge for cascade source.
  - `InspectorSubcard.jsx`, `InspectorTabs.jsx` — visual primitives.
  - `EdgeTierEditor.jsx`, `CellTierEditor.jsx` — reusable per-tier editors. EdgeTierEditor renders two visually separated sub-cards (`Shape & stroke` + `Animations`); the cascade tier picks the setters. Inspector inlines these directly inside the Inner / Outer / Piece-from-edge accordion bodies.
  - `cascade-source.js` — pure helpers `computeTierStates`, `tierHasOverride`, `resolveEdgePropSource`, `tierLabel`.
  - `PieceInspector.jsx` — body of the Piece accordion. Tabbed Content / Body / Edges editor for the selected piece. The Content tab type-to-fills empty cells: when the piece has no content, a window keydown listener captures the first printable keystroke and seeds `{ type: 'text', text: <key> }`, then focuses the textarea.
  - `EdgeInspector.jsx` — body of the Edge accordion. Single/multi edge editor with MIXED detection.
  - `ProjectDefaultsCard.jsx` — body of the Default accordion. Default edges + default body editors only; lower-tier cards are siblings now, not inline.
- `components/edges/{StyleControls.jsx, constants.js}` — `StyleControls` is the per-tier stroke style row (color / opacity / width) reused by every edge tier editor.
- `BackgroundsPanel` — body of the Grid page's Backgrounds accordion: upload / paste image, list existing backgrounds with thumbnail + fit selector + delete.
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
- `App.css` — shell only: scrollbars, `.app`, `fadeIn`. Imports the shared kit + every per-component / per-page sheet (including `AccordionCard.css`).
- `ui-kit.css` — primitives: `.card`, `.action-btn`, `.chip`, `.slider-control`, `.modal*`, `.form-row`. Buttons get a subtle press-scale + reduced-motion guard so micro-interactions feel alive without distracting.
- `side-tools.css` — viewport-locked sidebar layout shared by Grid + Edit. `display: flex; min-height: 0; overflow: hidden` — the rail itself never scrolls; AccordionCard bodies handle their own overflow.

Per-component CSS lives next to its component (e.g. `components/PageNav.css`); per-page CSS lives next to its page (e.g. `pages/EditPage.css`). The puzzle module's `PuzzleBoard.css` is co-located with the rendering code for portability.

## Theme
- `data-theme="light"` on `<html>` switches palette; persisted in `localStorage` under `hakoniwa:theme` (with one-time migration from the legacy `puzzle-studio:theme` key).
- All colors derive from CSS custom properties in `src/index.css` — no theme-specific class names in components.
