# src/grid — Data Model, State & I/O

Owns the project data model. Pieces are **derived** from a `Project` via `compileProject`; never mutated directly.

## Files
- `grid.js` — pure cell-grid helpers: `makeFreshGrid`, `resizeGrid`, `mergeCells`, `unmergeCells`, `groupBoundsMap`. `MAX_GRID = 50`.
- `compile.js` — `compileProject(project) → Piece[]`, `listSharedEdges(project)`, `listOuterEdges(project)`, `resolveEdge(edges, pairKey, kind)` — resolves an edge's effect+config through the priority chain `byEdge[pairKey] > inner/outer layer > default`.
- `storage.js` — localStorage helpers: `loadProjects`, `saveProject`, `deleteProject`, `exportJSON`, `importJSON`, `newProject`. Keys live under the `hakoniwa:` namespace (with one-time migration from the legacy `puzzle-studio:` keys).
- `import.js` — parse CSV/TSV/paste into a `{ grid, pieceContent }` pair (`importTableText`, `parseTable`, `tableToProject`).
- `export.js` — `exportSingleFileJSX(project)` and `exportModuleZip(project)`. Uses Vite's `import.meta.glob` to bundle the `puzzle/` source at build time.
- `zip.js` — minimal pure-JS ZIP encoder (STORE method, no compression). No external deps.
- `useProject.js` — React hook: owns the current project + actions, auto-saves on mutation.

## Project Shape

```js
{
  id, name, createdAt, updatedAt,
  grid: { rows, cols, cellSize, groups: string[][] },
  edges: {
    default: { effect, config? },
    byEdge: { [pairKey]: { effect, config? } },
  },
  pieceColors:  { [groupId]: '#hex' },
  pieceContent: { [groupId]: ContentSpec },
  backgrounds:  Background[],
}

// edges shape:
//   {
//     default: { effect, config? },                  // floor
//     inner:   null | { effect, config? },           // override for shared edges
//     outer:   null | { effect, config? },           // override for outer edges
//     byEdge:  { [pairKey]: { effect, config? } },   // per-edge — top priority
//   }
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

## Export flow (export.js)

- **JSON**: `exportJSON(project)` from `storage.js` — re-importable.
- **Single-file `.jsx`**: precompiles all piece paths and bakes them into one self-contained file. Zero deps beyond React. Bundled with a README into a small ZIP.
- **Module bundle ZIP**: ships the entire `puzzle/` source folder + `project.json` + a tiny wrapper component + a standalone `compileProject.js` + README.
