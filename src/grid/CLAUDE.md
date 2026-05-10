# src/grid — Data Model, State & I/O

Owns the project data model. Pieces are **derived** from a `Project` via `compileProject`; never mutated directly.

## Files
- `grid.js` — pure cell-grid helpers: `makeFreshGrid`, `resizeGrid`, `mergeCells`, `unmergeCells`, `groupBoundsMap`. `MAX_GRID = 50`.
- `compile.js` — `compileProject(project) → Piece[]`, `listSharedEdges(project)`, `listOuterEdges(project)`.
- `storage.js` — localStorage helpers: `loadProjects`, `saveProject`, `deleteProject`, `exportJSON`, `importJSON`, `newProject`.
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
}
```

## ContentSpec

```js
type ContentSpec =
  | { type: 'text', text: string, align?: 'left'|'center'|'right',
      fontSize?: number, fontWeight?: number, color?: string }
  | { type: 'image', src: string /* data: URL */, fit?: 'cover'|'contain'|'fill' };
```

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
