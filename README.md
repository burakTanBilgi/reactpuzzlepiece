# React Puzzle Piece Prototype

A tiny Vite + React prototype that renders two horizontal puzzle pieces side-by-side.
Piece 1 has a tab on the right; Piece 2 has a matching socket on the left.

## Visual rules

- **No scale** on hover (no `transform: scale`).
- **No drop-shadow / box-shadow / glow**.
- Hover effect is **only** a continuous neon outline tracing the full outer shape
  (including around the tab and inside the socket).
- The outline is seamless — there are no internal straight lines across the base
  of the tab or socket, because each piece is drawn as a **single inline SVG path**.

## How it works

Each piece is an inline `<svg>` with one `<path>` built from `M`, `L`, and `A`
(arc) commands. The arc is the tab/socket, so the stroke simply follows the
path — there's no composite-shape hack (no pseudo-element circles stitched onto
a rectangle), which is what would otherwise produce those internal seams.

The two pieces are laid out in a flex row; the second piece has
`margin-left: -30px` so Piece 1's tab physically overlaps into Piece 2's socket.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Files

- `src/PuzzlePiece.jsx` — unified component, accepts `type` (`"tab-right"` or
  `"socket-left"`) and `label`.
- `src/PuzzlePiece.css` — stroke hover styling.
- `src/App.jsx` — renders the 2-piece row.
- `src/App.css` — row layout + negative-margin overlap.
