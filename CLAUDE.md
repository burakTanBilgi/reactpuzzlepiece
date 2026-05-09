# CLAUDE.md — React Puzzle Piece

## Project Purpose

A React + Vite web application for designing grid-based layouts where sections are separated by stylized connectors (default: puzzle piece tabs/sockets). Intended as a visual design tool for building website layouts that can be exported as SVG, JSON, or React components.

## Architecture

```
src/
  main.jsx              — ReactDOM entry
  App.jsx               — Top-level shell: wires usePuzzleBoard → PuzzleBoard + controls UI
  App.css               — Layout, sidebar, toolbar styles
  index.css             — Global CSS variables, dark theme base
  puzzle/               — Self-contained module (zero imports from outside)
    geometry.js         — Pure SVG path math (no React)
    board.js            — Pure immutable board state helpers
    usePuzzleBoard.js   — React hook: state machine over board helpers
    PuzzleBoard.jsx     — <svg> root rendering all pieces
    PuzzlePiece.jsx     — <g><path/></g> for one piece
    PuzzleBoard.css     — Themeable CSS custom properties
    index.js            — Public API re-exports
  utils/                — (planned) import/export utilities
```

The `src/puzzle/` folder is a **portable drop-in module** — no imports from outside itself, works in any React 18+ project.

## Data Model

```js
// KnobType
'tab' | 'socket' | 'flat'

// Side (three supported shapes)
'flat'                                   // no knobs
{ count: number; type: KnobType }        // N evenly-spaced uniform knobs
Array<{ pos: number; type: KnobType }>   // explicit mixed knobs (pos ∈ [0,1])

// Piece
{
  id: string,
  x: number, y: number,    // top-left in SVG coordinate space
  w: number, h: number,    // dimensions (min 80px each axis)
  label?: string,
  fill?: string,           // CSS color for piece background (planned)
  content?: {              // rich content inside piece (planned)
    type: 'text' | 'image',
    value: string,         // text content or image data URL
    style?: object,
  },
  sides: {
    top?: Side,
    right?: Side,
    bottom?: Side,
    left?: Side,
  }
}
```

## Key Invariants

- All board mutation functions in `board.js` are **pure**: take a `pieces` array, return a new array. Never mutate in place.
- Adjacency is **computed geometrically** (`findNeighbors` in `board.js`) — no explicit grid structure.
- Pieces are rendered as a single closed SVG `<path>` computed by `computePiecePath` in `geometry.js`.
- `KNOB_R = 30` — all pieces must be at least `2 * KNOB_R = 60px` wide/tall. Hard minimum is `MIN_DIM = 80`.
- Tab vs socket: tabs protrude outward (arc `sweep-flag=1`), sockets indent inward (`sweep-flag=0`).
- `collapseKnobs` normalizes an explicit knob array back to `{ count, type }` when all knobs are uniform.

## Conventions

- **No TypeScript** — plain JS + JSDoc comments where types need documenting.
- **No external UI libraries** — custom CSS only.
- **No state management libraries** — plain `useState` / `useMemo` / `useCallback`.
- **Immutable state** — every board helper returns a new array/object.
- **Minimal dependencies** — add a package only when it provides non-trivial value (e.g. `xlsx` for Excel parsing).
- Comments only when the *why* is non-obvious; never narrate what the code does.

## Feature Roadmap

See [PLAN.md](./PLAN.md) for the full phased implementation plan.

| Phase | Feature | Status |
|---|---|---|
| 1 | CLAUDE.md + PLAN.md | ✅ Done |
| 2 | Effect/Connector System (puzzle, wave, straight…) | Planned |
| 3 | Piece Content (text + images clipped to shape) | Planned |
| 4 | UI/UX Redesign (toolbar, dual sidebars, themes) | Planned |
| 5 | Excel Import (merged cells → merged pieces) | Planned |
| 6 | Export: JSON (bidirectional), SVG, React component | Planned |
| 7 | Mobile readiness (Pointer Events, pinch-to-zoom) | Future |

## Build & Dev

```bash
npm install
npm run dev      # Vite dev server
npm run build    # Output to /build (not /dist)
npm run preview  # Preview production build
```

Deployed on Netlify with SPA redirect (`netlify.toml`).
