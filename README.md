# React Puzzle Piece Playground

An interactive Vite + React prototype for experimenting with jigsaw-style
puzzle pieces. Pieces are drawn with a single inline SVG path (no composite
shapes, no internal seams), and can be clicked and edited at runtime — you
can add or remove knobs on any side, and split neighbors into sub-pieces.

Clicking a piece's **body** selects that piece. Clicking a **tab** flips
which side owns that knob — the tab becomes part of the neighbor on the
other side of the connection, and the neighbor's matching socket moves
back onto the clicked piece. Click the same knob again from the new
owner to flip it back.

## Visual rules

- No `transform: scale` on hover.
- No drop-shadow, box-shadow, or glow effects.
- The hover/selection state is a continuous neon outline that traces the
  entire outer shape, including around every tab and inside every socket.
- The outline is seamless — there are no internal lines at the bases of
  tabs or sockets, because each piece is a **single inline SVG path**.

## Project layout

```
src/
  puzzle/                 ← all puzzle functionality lives here
    geometry.js           ← pure SVG path + bounding-box math
    board.js              ← pure state helpers (neighbors, splits, changes)
    usePuzzleBoard.js     ← React hook bundling the whole state machine
    PuzzlePiece.jsx       ← <g><path/></g> for a single piece
    PuzzleBoard.jsx       ← <svg> that lays out every piece
    PuzzleBoard.css       ← piece + board styling (themable via CSS vars)
    index.js              ← public API re-exports
  App.jsx                 ← demo UI that drives the hook
  App.css
  index.css
  main.jsx
```

Every file inside `src/puzzle/` is self-contained; nothing in the folder
imports from outside the folder. That makes it easy to reason about the
puzzle logic in isolation, and easy to copy into another project.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

## Deploy

A `netlify.toml` is included at the repo root. Point Netlify at this repo
and it will run `npm run build` and publish the `build/` output. SPA
redirects are configured so client-side routing works out of the box.

---

## Integrating the puzzle pieces into another React project

The `src/puzzle/` folder is a drop-in module. You don't need anything else
from this repo to use it.

### 1. Copy the folder

Copy `src/puzzle/` into your own project — for example to
`src/components/puzzle/` — and make sure you have React 18+ installed.
There are no other runtime dependencies.

### 2. Import and render

The quickest path is the `usePuzzleBoard` hook plus the `PuzzleBoard`
component:

```jsx
import { PuzzleBoard, usePuzzleBoard } from './components/puzzle';

export function Demo() {
  const { pieces, selectedId, setSelectedId, flipKnob } = usePuzzleBoard();

  return (
    <PuzzleBoard
      pieces={pieces}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onKnobClick={flipKnob}
    />
  );
}
```

That's a fully interactive four-piece board with hover, selection, and
edits: clicking a piece's **body** selects it (via `onSelect`), and
clicking a **tab** flips the knob's ownership across the connection (via
`onKnobClick`). `flipKnob` from the hook is the default handler, but
`onKnobClick` is just `(pieceId, side, pos) => void` so you can pass any
handler you want — for example to navigate selection instead of flipping.

### 3. Drive edits from your UI

Everything the hook exposes:

```js
const {
  pieces,           // current Piece[] (source of truth)
  setPieces,        // escape hatch if you need to replace the array

  selectedId,       // id of the selected piece, or null
  setSelectedId,    // click-to-select handler for <PuzzleBoard/>
  selected,         // the selected Piece object (or null)

  cascade,          // bool: should side edits split neighbors?
  setCascade,

  sideInfo,         // per-side metadata for the selected piece:
                    //   { top, right, bottom, left } each with
                    //   { data, count, type, neighbors, maxCount,
                    //     canCascade, partial }
                    // `count`/`type` are normalized from `data` and work
                    // for both uniform and mixed sides.

  setSideCount,     // (side, newCount) => void — slider/stepper edits
  flipKnob,         // (pieceId, side, pos) => void — wire to onKnobClick
  reset,            // (optionalInitial?, optionalSelectedId?) => void
} = usePuzzleBoard();
```

Hook up a slider (or any control) by calling `setSideCount`:

```jsx
<input
  type="range"
  min={0}
  max={sideInfo.right.maxCount}
  value={sideInfo.right.count}
  onChange={(e) => setSideCount('right', Number(e.target.value))}
/>
```

### 4. Customize the starting layout

Pass anything that describes your starting pieces:

```jsx
import { usePuzzleBoard, initialFourPieces } from './components/puzzle';

const board = usePuzzleBoard({
  // a function is called once on mount, or pass an array directly
  initial: () => initialFourPieces(/* sideSize */ 300),
  initialSelected: 'tl',
  initialCascade: true,
});
```

A piece is just:

```ts
type KnobType = 'tab' | 'socket' | 'flat';

type Side =
  | { count: number; type: KnobType }     // evenly-spaced, uniform
  | Array<{ pos: number; type: KnobType }> // explicit positions; can mix types
  | 'flat';                                // shorthand for no knobs

type Piece = {
  id: string;
  x: number;           // top-left X
  y: number;           // top-left Y
  w: number;           // width  (must be > 2 * KNOB_R)
  h: number;           // height (must be > 2 * KNOB_R)
  label?: string;
  sides: { top?: Side; right?: Side; bottom?: Side; left?: Side };
};
```

Most of the time you'll use the uniform `{ count, type }` form. Clicking
a tab on a multi-knob side (`flipKnob`) can produce a mixed side that's
stored as the array form; the renderer handles both seamlessly. Use the
`sideCount(side)` and `sideType(side)` helpers when you need to read a
side without caring about which form it's in.

Pieces must fit together geometrically — a tab on one piece's side needs a
matching socket at the same coordinates on the neighbor's opposite side.
`initialFourPieces` shows a minimal valid example.

### 5. Skip the hook if you want

The hook is optional. Every piece of logic is also exported as a pure
function, so you can manage state yourself (Redux, Zustand, XState…):

```js
import {
  changeSide,
  splitNeighborsOnSide,
  flipKnob,
  findNeighbors,
  coversNeighbors,
  maxKnobsForSide,
  initialFourPieces,
} from './components/puzzle';

let pieces = initialFourPieces();
pieces = changeSide(pieces, 'tl', 'right', 3, { cascade: true });
// Flip the middle knob of TL's right edge onto its neighbor:
pieces = flipKnob(pieces, 'tl', 'right', 0.5);
```

And if you only want rendering, use the components directly with whatever
state source you like:

```jsx
import { PuzzleBoard } from './components/puzzle';

<PuzzleBoard pieces={myPieces} selectedId={myId} onSelect={selectPiece} />
```

### 6. Theming

`PuzzleBoard.css` reads a few CSS custom properties with sensible fallbacks.
Override any of them on any ancestor (usually `:root`) to re-theme:

```css
:root {
  --puzzle-fill:            #1a1a1f;
  --puzzle-fill-hover:      #22232a;
  --puzzle-fill-selected:   #2a2c36;
  --puzzle-stroke:          #40444d;
  --puzzle-stroke-hover:    #8ab4f8;
  --puzzle-label:           #aab1bd;
  --puzzle-label-selected:  #ffffff;
}
```

The stylesheet only targets `.puzzle-board`, `.piece`, `.piece__path`, and
`.piece__label`, so it won't collide with anything else in your app.

### 7. Public API reference

Components:

- `PuzzleBoard` — renders the whole board as one `<svg>`.
- `PuzzlePiece` — renders one piece as a `<g>`; use it directly if you
  want to compose your own `<svg>`.

React hook:

- `usePuzzleBoard(options?)` — state machine for a full board.

Geometry (pure, framework-free):

- `computePiecePath(piece)` → SVG `d` string.
- `computePieceBbox(piece)` → `{ minX, minY, maxX, maxY }`.
- `computeKnobs(piece)` → `[{ side, type, pos, cx, cy }, …]`.
- `knobHitCenter(side, cx, cy)` → `{ hx, hy }` for overlaying hit regions.
- `normalizeSide(side)`, `evenlySpaced(count, type)`.
- Constants: `KNOB_R`, `KNOB_D`, `FLAT`, `TAB`, `SOCKET`.

Board (pure, framework-free):

- `initialFourPieces(size?)`.
- `findNeighbors`, `findNeighborAtKnob`, `coversNeighbors`, `edgesMatch`,
  `piecesInRegion`.
- `sideFor`, `sideCount`, `sideType`, `maxKnobsForSide`, `resolveType`.
- `updatePiece`, `setPieceSide`.
- `splitNeighborsOnSide`, `changeSide`, `flipKnob`.
- Constants: `BIG`, `MIN_DIM`, `EPS`, `SIDES`, `OPPOSITE`.
- Helpers: `oppositeType`, `makeId`.

### Tab clicks flip knob ownership

Every tab on a rendered piece gets an invisible circular hit region
(`.piece__knob-hit`) positioned over its protrusion. Clicking it fires
`onKnobClick(pieceId, side, pos)` on `PuzzleBoard`.

The default handler (`flipKnob` from `usePuzzleBoard`) swaps the knob's
ownership across the connection: whoever had the tab now has the socket,
and vice versa. Concretely, if TL's right side has one tab that meets
TR's left-side socket, clicking that tab produces a TL with a socket on
the right and a TR with a tab on the left — the knob now belongs to TR.

On multi-knob sides this operates on **just that one knob**, so a side
can end up with mixed tab/socket knobs. The rendering, hit regions, and
neighbor mating all keep working because normalized knob arrays are a
first-class side form.

If you want a different behavior (e.g. "click a tab to select the
neighbor"), pass your own `onKnobClick` instead:

```jsx
<PuzzleBoard
  pieces={pieces}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onKnobClick={(ownerId, side, pos) => {
    const owner = pieces.find((p) => p.id === ownerId);
    const neighbor = findNeighborAtKnob(pieces, owner, side, pos);
    if (neighbor) setSelectedId(neighbor.id);
  }}
/>
```

Re-theme the hover tint on the hit region with the
`--puzzle-knob-hit-hover` CSS variable.
