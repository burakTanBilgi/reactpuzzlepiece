# Hakoniwa (箱庭)

A visual design tool for grid-based layouts where sections are separated by stylized connectors — puzzle tabs/sockets, waves, or straight lines. Build a grid, merge cells into pieces, style every edge, fill cells with text or images, and export the result as JSON, a single React file, or a full module bundle.

**Live demo: [hak10iwa.netlify.app](https://hak10iwa.netlify.app)**

Built with React 18 + Vite. Zero runtime dependencies beyond React.

## What's in the app

Five pages, switched in-app (no router):

| Page         | What it does                                                                              |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Docs**     | Interactive tutorial — landing page on first visit, with a section per tab and live demos. |
| **Projects** | Project library + JSON import.                                                            |
| **Preview**  | Large preview of the current project; rename it; jump to Grid or Edit; **export** (JSON · single-file React · full ZIP). |
| **Grid**     | Cell grid: drag-select, merge/unmerge, resize, color pieces, **CSV/TSV paste & import**, click/drag row & column numbers to delete, **place background images** (upload or Ctrl+V) that span across multiple pieces. |
| **Edit**     | Same canvas, two modes selectable in the side panel: **Edges** (effect & config — with default → inner/outer → per-edge override priority chain) and **Content** (fill individual pieces with text or images, cover/contain/stretch). |

Other niceties:

- **Light/dark theme** toggle (top of the nav). Choice persists.
- **Typeable numeric inputs** — every slider value is also a text field; click and type.
- **Auto-save** to `localStorage`; refresh restores your last project.
- All content is clipped to the puzzle outline — text and images respect the piece shape.
- Background images on the Grid page span across multiple pieces (without merging them) — each piece naturally renders its own slice via SVG clipping.
- Wheel scroll zooms the canvas (no modifier needed); middle-drag or Ctrl+drag pans.

## Install & run

```bash
npm install
npm run dev      # Vite dev server
npm run build    # Output to /build (not /dist)
npm run preview  # Preview production build
```

Deployed on Netlify with SPA redirects (see `netlify.toml`).

## Project structure

```
src/
  main.jsx                    React entry
  index.css                   Theme tokens (dark default + [data-theme='light'])

  puzzle/                     Self-contained rendering module — no outside imports
    geometry.js                 Pure SVG path math
    board.js                    Neighbor + segment helpers
    effects/                    puzzle, wave, straight effect strategies
    PuzzleBoard.jsx             <svg> root component
    PuzzlePiece.jsx             One piece + clipped content
    PuzzleBoard.css             Themeable styles
    index.js                    Public API

  grid/                       Data model + state + I/O
    grid.js                     Cell-grid helpers, merge/unmerge, row/col delete
    compile.js                  Project → Piece[]
    storage.js                  localStorage + JSON import/export
    import.js                   CSV/TSV/paste → grid + content
    export.js                   Single-file JSX + module ZIP exports
    zip.js                      Minimal pure-JS ZIP encoder
    useProject.js               React hook: state + auto-save

  ui/                         App shell, pages, components, styles
    App.jsx                     Page switcher + theme + last-page persistence
    components/                 PageNav, GridCanvas, EditCanvas, EdgesPanel, ContentPanel,
                                EdgeEditorCanvas, ContentCanvas, ImportDialog, SliderRow,
                                ViewPanel, PreviewSvg, BackgroundsPanel, docs/*
    pages/                      DocsPage, ProjectsPage, PreviewPage, GridEditorPage, EditPage
    styles/                     App.css (shell), ui-kit.css, side-tools.css
    utils/                      formatTime
```

The `src/puzzle/` folder has **no imports from outside itself** — it's a portable drop-in module. Everything else is the studio that wraps around it.

## Data model

A *project* is the persistent unit. Pieces are derived from it on demand by `compileProject` — never mutated directly.

```ts
type Project = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;

  grid: {
    rows: number;            // 1..50
    cols: number;            // 1..50
    cellSize: number;        // px
    groups: string[][];      // groupId per cell; same id = merged
  };

  edges: {
    default: { effect: 'puzzle' | 'wave' | 'straight'; config?: object };
    inner:   null | { effect; config? };                  // override for shared edges
    outer:   null | { effect; config? };                  // override for outer edges
    byEdge:  { [pairKey: string]: { effect; config? } };  // per-edge overrides
  };
  // Effect resolution chain (highest priority first):
  //   per-edge override > inner/outer layer > default

  pieceColors:  { [groupId: string]: string };            // '#hex'
  pieceContent: { [groupId: string]: ContentSpec };
  backgrounds:  Array<Background>;                        // multi-piece images
};

type ContentSpec =
  | { type: 'text';  text: string;
      align?: 'left' | 'center' | 'right';
      fontSize?: number; fontWeight?: number; color?: string }
  | { type: 'image'; src: string;                          // data: URL
      fit?: 'cover' | 'contain' | 'fill' };

type Background = {
  id: string;
  src: string;                                             // data: URL
  rect: { rMin: number; rMax: number; cMin: number; cMax: number };  // cell range
  fit?: 'cover' | 'contain' | 'fill';
};
```

Edge keys:

- Shared edge between two pieces: `edgeKey(idA, idB)` → `"idA||idB"` (sorted lexicographically).
- Outer edge: `"pieceId||outer-{top|right|bottom|left}"`.

## Importing data (Grid → Import)

The Grid editor accepts CSV, TSV, or pasted spreadsheet data:

```
Logo            Theme   Language   About            How It Works            Sign In            Sign Up
Build Your Custom ERP                                       No Coding Required
Step 1                  Step 2                              Step 3
```

- **Auto-detect** — any tabs in the input → TSV; otherwise CSV (with quoted-field handling).
- **Auto-merge horizontal runs** — each non-empty cell extends rightward over consecutive empty cells, producing a layout-shaped grid. Toggle off in the dialog if you want a 1:1 import.
- Each non-empty cell becomes a piece with `{ type: 'text', text }`.

## Exporting (Preview → Export)

Three options:

1. **JSON** — re-importable project state. Drop it back into the studio anytime.
2. **Single-file React** — generates one self-contained `.jsx` file with paths precomputed and all content baked in. Drop into any React 18+ project. Bundled with a README in a small ZIP.
3. **Module bundle (ZIP)** — ships the entire `puzzle/` source folder plus your `project.json`, a wrapper component, a standalone `compileProject.js`, and a README. Use this when you want the full rendering API in your app.

The ZIP encoder ([`src/grid/zip.js`](./src/grid/zip.js)) is hand-rolled (~80 lines, no compression) so the studio adds no third-party deps.

---

## Using the `puzzle` module in your own React app

The `src/puzzle/` folder is a drop-in module. You don't need anything else from this repo to use it.

### 1. Copy the folder

Copy `src/puzzle/` into your own project, e.g. `src/components/puzzle/`. React 18+ is the only requirement.

### 2. Render pieces

You bring the piece data — typically by calling `compileProject` on a project JSON exported from the studio:

```jsx
import { PuzzleBoard } from './components/puzzle';
import { compileProject } from './grid/compile.js';
import projectData from './my-puzzle.json';

const pieces = compileProject(projectData);
const effect = projectData.edges.default.effect;
const config = projectData.edges.default.config;

export function MyPuzzle() {
  return <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />;
}
```

Or render a static set of pieces directly (no project needed):

```jsx
const pieces = [
  { id: 'a', x: 0,   y: 0, w: 200, h: 200, label: 'A',
    sides: { right: { count: 1, type: 'tab' }, bottom: { count: 1, type: 'tab' } } },
  { id: 'b', x: 200, y: 0, w: 200, h: 200, label: 'B',
    sides: { left:  { count: 1, type: 'socket' }, bottom: { count: 1, type: 'tab' } } },
  // …
];

<PuzzleBoard pieces={pieces} effect="puzzle" />
```

### 3. Handle interaction

`PuzzleBoard` accepts:

```jsx
<PuzzleBoard
  pieces={pieces}
  selectedId={selectedId}              // optional — for highlight
  effect="puzzle"                      // 'puzzle' | 'wave' | 'straight'
  effectConfig={{ amplitude: 12 }}     // wave config
  onSelect={(id) => setSelectedId(id)} // body click
  onKnobClick={(ownerId, side, pos) => {/* tab click */}}
/>
```

### 4. Public API (`puzzle/index.js`)

Components:

- **`PuzzleBoard`** — renders the whole board as one `<svg>`.
- **`PuzzlePiece`** — single piece as `<g>`; useful if you compose your own SVG.

Geometry (pure, framework-free):

- `computePiecePath(piece, allPieces, effect, config)` → SVG `d` string.
- `computeSidePath(piece, allPieces, side, effect, config)` → single side path.
- `computePieceBbox(piece, allPieces, effect, config)` → `{ minX, minY, maxX, maxY }` including knob/wave extent.
- `computeKnobs(piece)` / `computeActiveKnobs(piece, allPieces, effect)` — knob positions.
- `knobHitCenter(side, cx, cy)` — for overlaying click hit-regions.
- `normalizeSide(side)`, `evenlySpaced(count, type)`, `buildSidePath(opts)`.
- Constants: `KNOB_R`, `KNOB_D`, `FLAT`, `TAB`, `SOCKET`, `EFFECTS`, `EFFECT_NAMES`.

### 5. Piece shape

```ts
type KnobType = 'tab' | 'socket' | 'flat';

type Side =
  | { count: number; type: KnobType }       // N evenly-spaced uniform knobs
  | Array<{ pos: number; type: KnobType }>  // explicit positions; can mix
  | 'flat';                                  // shorthand for no knobs

type Piece = {
  id: string;
  x: number; y: number;       // top-left in SVG coordinate space
  w: number; h: number;       // dimensions; min 60px (= 2 * KNOB_R) per side
  label?: string;
  fill?: string;              // optional CSS color override
  content?: ContentSpec;      // optional text/image content (clipped to outline)
  sides: { top?: Side; right?: Side; bottom?: Side; left?: Side };

  // Per-segment effect lookups (compiled by compileProject; optional otherwise)
  edgeEffects?:        { [side]: { [neighborId]: 'puzzle' | 'wave' | 'straight' } };
  edgeEffectConfigs?:  { [side]: { [neighborId]: object } };
};
```

For matching pieces to interlock cleanly, a tab on one side must meet a socket on the neighboring piece's opposite side at the same coordinates.

### 6. Theming

`PuzzleBoard.css` reads CSS custom properties (with sensible fallbacks). Override on `:root` (or any ancestor) to re-theme:

```css
:root {
  --puzzle-fill:           #1f1d28;
  --puzzle-fill-hover:     #2a2434;
  --puzzle-fill-selected:  #332c3f;
  --puzzle-stroke:         #423a4f;
  --puzzle-stroke-hover:   #e6a378;
  --puzzle-label:          #9d96a8;
  --puzzle-label-selected: #ede8de;
  --puzzle-content:        #ede8de;
}
```

The stylesheet only targets `.puzzle-board`, `.piece`, `.piece__path`, `.piece__label`, `.piece__content`, and `.piece__knob-hit`, so it won't collide with anything else in your app.

## Visual rules

- No `transform: scale` on hover.
- No drop-shadow / box-shadow / glow on pieces.
- Selection state is a continuous outline that traces the entire outer shape — including around every tab and inside every socket.
- The outline is seamless: there are no internal lines at the bases of tabs/sockets, because each piece is a **single inline SVG path**.

## Conventions (for contributors)

- **No TypeScript** — plain JS + JSDoc where types matter.
- **No external UI libraries**, **no state management libraries** — `useState` / `useMemo` / `useCallback` only.
- **Minimal dependencies** — only `react` / `react-dom`. The ZIP encoder, CSV parser, and theme system are all hand-rolled.
- **Co-located CSS** for portable modules (e.g. `puzzle/PuzzleBoard.css`); shared studio styles split into per-component / per-page sheets, all imported from `ui/styles/App.css`.
- **Immutable state** — every grid mutation returns a new grid.
- Comments only when the *why* is non-obvious.

For deeper notes see [`CLAUDE.md`](./CLAUDE.md), [`src/puzzle/CLAUDE.md`](./src/puzzle/CLAUDE.md), [`src/grid/CLAUDE.md`](./src/grid/CLAUDE.md), and [`src/ui/CLAUDE.md`](./src/ui/CLAUDE.md).
