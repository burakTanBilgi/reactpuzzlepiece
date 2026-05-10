# CLAUDE.md — React Puzzle Piece (Puzzle Studio)

## Project Purpose

A React + Vite design tool for grid-based layouts where sections are separated by stylized connectors (puzzle tabs/sockets, wave, straight). You build a grid, merge cells into pieces, style edges, fill cells with text/images, and export as JSON, a single React file, or a full ZIP module.

## Architecture

```
src/
  main.jsx                    — ReactDOM entry
  index.css                   — Theme tokens (light/dark via [data-theme])
  puzzle/                     — Self-contained rendering module (no outside imports)
    geometry.js               — SVG path math (pure)
    board.js                  — neighbor + segment helpers (pure)
    effects/                  — puzzle, wave, straight effect strategies
    PuzzleBoard.jsx           — root <svg>
    PuzzlePiece.jsx           — one piece + clipped content
    PuzzleBoard.css           — themeable CSS
    index.js                  — public API
    CLAUDE.md                 — module-specific notes
  grid/                       — Data model + state + I/O
    grid.js                   — cell-grid helpers (MAX_GRID = 50)
    compile.js                — Project → Piece[]
    storage.js                — localStorage + JSON import/export
    import.js                 — CSV/TSV/paste → grid + content
    export.js                 — single-file JSX + module ZIP exports
    zip.js                    — minimal pure-JS ZIP encoder (no deps)
    useProject.js             — React hook: state + auto-save
    CLAUDE.md
  ui/                         — App shell + pages + components
    App.jsx                   — page switcher + theme state
    components/               — PageNav, PreviewSvg, ImportDialog, etc.
    pages/                    — Landing / Grid / Edges / Content
    styles/App.css            — page layouts, modals, etc.
    CLAUDE.md
```

The `src/puzzle/` folder is a **portable drop-in module** — no imports from outside itself, works in any React 18+ project. It is also shipped verbatim by the "Module bundle (ZIP)" export.

## Data Model

```js
// Project (the persistent unit)
{
  id, name, createdAt, updatedAt,
  grid: { rows, cols, cellSize, groups: string[][] },   // groupId per cell
  edges: {
    default: { effect, config? },                       // 'puzzle' | 'wave' | 'straight'
    byEdge:  { [pairKey]: { effect, config? } },        // per-edge overrides
  },
  pieceColors:  { [groupId]: '#hex' },
  pieceContent: { [groupId]: ContentSpec },
}

// ContentSpec
type ContentSpec =
  | { type: 'text',  text: string, align?, fontSize?, fontWeight?, color? }
  | { type: 'image', src: string /* data: URL */, fit?: 'cover'|'contain'|'fill' };

// Piece (derived via compileProject)
{
  id, x, y, w, h, label?, fill?, content?,
  sides: { top?, right?, bottom?, left? },
  edgeEffects, edgeEffectConfigs,
}
```

## Key Invariants

- All grid mutation functions in `grid.js` are **pure**: take a grid, return a new grid.
- Pieces are derived from a Project via `compileProject` — never mutated directly.
- Adjacency is computed geometrically in `puzzle/board.js#findNeighbors`.
- `KNOB_R = 30` — pieces must be ≥ `2 * KNOB_R = 60px` per side.
- Tab vs socket: tabs protrude outward (`sweep-flag=1`), sockets indent inward (`sweep-flag=0`).
- All theme colors are CSS custom properties in `src/index.css`. The light theme is `[data-theme='light']`.

## Conventions

- **No TypeScript** — plain JS + JSDoc where types matter.
- **No external UI libraries**, **no state management libraries** — `useState`/`useMemo`/`useCallback` only.
- **Minimal dependencies** — only `react`/`react-dom`. The ZIP encoder, CSV parser, and theme system are all hand-rolled to keep deps slim.
- **Co-located CSS** for portable modules (`puzzle/PuzzleBoard.css`); shared UI styles in `ui/styles/App.css`.
- Comments only when the *why* is non-obvious.

## Pages (state-based routing)

| Page    | What it does                                                           |
| ------- | ---------------------------------------------------------------------- |
| Home    | Project library, JSON import, **export menu** (JSON / single-file / ZIP) |
| Grid    | Cell grid: drag-select, merge/unmerge, resize, color, **paste/CSV import** |
| Edges   | Click any edge to override its effect (puzzle/wave/straight) + config  |
| Content | Click any piece to fill with text or image (cover/contain/stretch)     |

## Export options

- **JSON** — re-importable project state (`storage.js#exportJSON`).
- **Single-file React** (`export.js#exportSingleFileJSX`) — generates one `.jsx` with paths precomputed and content baked in. Zero deps beyond React. Bundled with a README in a small ZIP.
- **Module bundle (ZIP)** (`export.js#exportModuleZip`) — ships the full `puzzle/` folder + `project.json` + a wrapper component + standalone `compileProject.js` + README. Drop-in for serious integration.

## Build & Dev

```bash
npm install
npm run dev      # Vite dev server
npm run build    # Output to /build (not /dist)
npm run preview  # Preview production build
```

Deployed on Netlify with SPA redirect (`netlify.toml`).
