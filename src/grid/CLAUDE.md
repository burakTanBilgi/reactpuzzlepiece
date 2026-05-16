# src/grid — Data Model, State & I/O

Owns the project data model. Pieces are **derived** from a `Project` via `compileProject`; never mutated directly.

## Files

The module is split along two axes — **pure model** (headless, server-safe)
vs. **browser side effects** — and within mutations, **factories** (pure)
vs. the **React hook** that wires them in.

### Pure / headless (Node + Worker safe)
- `project.js` — `newProject(name)` constructor for a blank project.
- `grid.js` — pure cell-grid helpers: `makeFreshGrid`, `resizeGrid`, `mergeCells`, `unmergeCells`, `groupBoundsMap`, `deleteRows`, `deleteCols`. `MAX_GRID = 50`.
- `compile.js` — `compileProject(project) → Piece[]`, `listSharedEdges(project)`, `listOuterEdges(project)`, `resolveEdge(edges, pairKey, kind)` — resolves an edge's effect+config through the priority chain `byEdge[pairKey] > inner/outer layer > default`. The four sides share one `SIDE_AXIS` lookup table — no per-direction copy-paste.
- `import.js` — parse CSV/TSV/paste into a `{ grid, pieceContent }` pair (`importTableText`, `parseTable`, `tableToProject`).
- `ids.js` — single source of truth for id generation (`nextGroupId`, `nextImportId`, `nextProjectId`, `nextBgId`, `idFactory(prefix)`).
- `zip.js` — minimal pure-JS ZIP encoder (STORE method, no compression). No external deps.
- `actions/` — pure mutation factories. Each exports a `xxxActions(setProject) → bag-of-methods` so headless callers (a future API server, tests) can apply the same mutations without React.
  - `grid-actions.js`, `edge-actions.js`, `piece-actions.js`, `background-actions.js`.
  - **`unmerge` preserves piece colors**: when a multi-cell group is split back into singletons, `pieceColors[oldGroupId]` is copied to each new singleton's id (and the orphaned old key dropped). Same logic kicks in for single-cell "unmerges" so a color set on an unmerged cell survives the no-op group-id reissue.

### Browser-only
- `browser-storage.js` — localStorage CRUD (`loadProjects`, `saveProject`, `deleteProject`, `loadCurrentId`, `saveCurrentId`). Keys live under the `hakoniwa:` namespace (with one-time migration from the legacy `puzzle-studio:` keys).
- `file-io.js` — `exportJSON(project)` (download a `.json`) and `importJSON(file)` (read a `.json` upload).
- `export.js` — `exportSingleFileJSX(project)` and `exportModuleZip(project)`. Uses Vite's `import.meta.glob` to bundle the `puzzle/` source at build time.

### React glue
- `useProject.js` — top-level hook. Owns the current project + the projects list, debounces auto-save, composes the action factories above, and adds lifecycle methods (`openProject`, `createNew`, `removeProject`, `exportCurrent`, `importFromFile`).

## Project Shape

```js
{
  id, name, createdAt, updatedAt,
  grid: { rows, cols, cellSize, groups: string[][] },
  edges: {
    default: { effect, config?, effects? },             // effects = v2 animation map
    inner:   null | { effect, config?, effects? },
    outer:   null | { effect, config?, effects? },
    byPiece: { [pieceId]: { effect, config?, effects? } },
    byEdge:  { [pairKey]: { effect, config?, effects? } },
  },
  cells: {
    default: { effects? },                              // project-wide cell effects map
    byPiece: { [pieceId]: { effects? } },               // per-piece override
  },
  pieceColors:  { [groupId]: '#hex' },
  pieceContent: { [groupId]: ContentSpec },
  backgrounds:  Background[],
}

// Resolution chain (highest first): byEdge > byPiece > inner/outer > default
// Helpers in compile.js: `edgeKey(idA, idB)` builds a sorted shared-edge key,
// `piecesOfEdge(pairKey)` reverses it (returns [pieceId] for outer edges or
// [idA, idB] sorted for shared). For shared edges where both pieces have a
// byPiece entry, the lex-smaller id wins.
//
// `config` carries effect-specific keys (frequency, amplitude, inverted) AND
// stroke-style keys (color, opacity, strokeWidth) — they all cascade through
// the same chain.
//
// `effects` is the v2 animation map, shaped as:
//   { '<id>:<trigger>': { id, trigger, scope?, config } }
// Multiple entries can coexist as long as they target different
// exclusivity groups in the catalogue (src/puzzle/effects-catalog.js).
// Cell effects cascade two-deep: byPiece[id].effects > default.effects.
// Edge effects cascade through all five tiers like the rest of `config`.
// `newProject()` seeds `'highlight:hover'` on both cells.default and
// edges.default so a fresh project shows hover feedback out of the box.
```

## ContentSpec

```js
type ContentSpec =
  | { type: 'text', text: string, align?: 'left'|'center'|'right',
      fontSize?: number, fontWeight?: number, color?: string }
  | { type: 'image', src: string /* data: URL */, fit?: 'cover'|'contain'|'fill' };
```

## Background

A multi-piece image. Stored project-level and rendered sliced across whichever
pieces happen to overlap its cell rect — pieces stay separate (no merging).

```js
type Background = {
  id, src,                                                 // src is a data: URL
  rect: { rMin, rMax, cMin, cMax },                        // cell coordinates
  fit?: 'cover' | 'contain' | 'fill',                      // default 'cover'
};
```

`compileProject` attaches an array of `{ id, src, fit, x, y, w, h }` to each
piece (in pixel space) for every overlapping background. `PuzzlePiece` renders
each background `<image>` at the full background coordinates and clips it to
the piece's outline — SVG handles the slicing automatically.

## Edge keys
- Shared edge: `edgeKey(idA, idB)` → `"idA||idB"` (sorted lexicographically).
- Outer edge: `"pieceId||outer-{top|right|bottom|left}"`.

## Import flow (import.js)
1. Detect TSV (any tabs) vs CSV.
2. Parse into 2D string array.
3. `tableToProject({ autoMerge: true })` extends each non-empty cell rightward over empty cells until the next non-empty cell — produces a layout-shaped grid.
4. Each non-empty cell becomes a piece with `{ type: 'text', text }`.

## Export flow

- **JSON**: `exportJSON(project)` from `file-io.js` — re-importable.
- **Single-file `.jsx`** (`export.js#exportSingleFileJSX`): precompiles all piece paths and bakes them into one self-contained file. Zero deps beyond React. Bundled with a README into a small ZIP.
- **Module bundle ZIP** (`export.js#exportModuleZip`): ships the entire `puzzle/` source folder + `project.json` + a tiny wrapper component + a standalone `compileProject.js` + README.
