# src/puzzle — Rendering Module

Self-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's "Module bundle (ZIP)" export.

## Public API (`index.js`)
- `PuzzleBoard` — root `<svg>` rendering all pieces.
- `PuzzlePiece` — single piece as `<g>` with one `<path>` plus optional clipped content (text or image).
- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string.
- `computeSidePath(piece, allPieces, side, effect, config)` — single side path (used by edge editor overlay).
- `computePieceBbox(piece, allPieces, effect, config)` — bounding box including knob/wave extent.
- `EFFECT_NAMES` — `['puzzle', 'wave', 'straight']`.
- Exports `KNOB_R`, `EFFECTS`, `normalizeSide`, etc. for advanced use.

## Key Constants
- `KNOB_R = 30` — pieces need at least `2 * KNOB_R = 60px` per side.

## Effects (`effects/`)
Each effect exports `{ buildSide, hidesKnobs? }`. `buildSide` returns an SVG path fragment (no leading `M`). Currently: `puzzleEffect`, `waveEffect`, `straightEffect`.

## Piece Shape (used by `PuzzleBoard`)
```js
{
  id, x, y, w, h, label?,
  fill?: string,                                // optional override fill color
  content?: ContentSpec,                        // optional text/image content
  backgrounds?: Array<{ id, src, fit, x, y, w, h }>,  // multi-piece images (px space)
  sides: { top?, right?, bottom?, left? },      // Side = 'flat' | {count,type} | [{pos,type}]
  edgeEffects:        { [side]: { [neighborId]: effectName } },
  edgeEffectConfigs:  { [side]: { [neighborId]: config } },
}
```

## Content rendering
`PuzzlePiece.jsx` clips text/images and backgrounds to the piece outline:
- `<defs><clipPath><path d={path}/></clipPath></defs>` per piece (created when content or backgrounds exist).
- **Backgrounds** render first as `<image>` at the full background coords; the piece's clipPath cuts each one down to that piece's outline. Multiple pieces can share the same background object — every overlapping piece shows its own slice with no per-piece slicing math.
- **Content** (text or image) renders on top of any backgrounds.
  - Text: greedy word-wrap + `<text><tspan>` per line.
  - Image: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).
