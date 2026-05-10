# src/puzzle — Rendering Module

Self-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's "Module bundle (ZIP)" export.

## Public API (`index.js`)
- `PuzzleBoard` — root `<svg>` rendering all pieces.
- `PuzzlePiece` — single piece as `<g>`. Body = fill-only `<path>`; outline = one `<path>` per segment (so each edge can carry its own color / opacity / width). Optional content (text/image) and backgrounds are clipped to the body path.
- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string (the body).
- `computeSidePath(piece, allPieces, side, effect, config)` — one continuous side path (used by edge editor overlay).
- `computeSideSegments(piece, allPieces, side, effect, config)` — `[{ pairKey, neighborId, d, style }]` per segment, each `d` is M-prefixed and standalone. Used by `PuzzlePiece` to render per-edge styled strokes.
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

## Render layers (per piece, in z-order)
1. **Body** (`.piece__body`) — fill-only closed path. The fill is the piece color (or theme `--puzzle-fill`).
2. **Backgrounds** (optional) — multi-piece images, clipped to the body. Same image rendered in every overlapping piece; SVG clipping does the slicing for free.
3. **Content** (optional) — text or image, clipped to the body.
4. **Edges** (`.piece__edge`) — one `<path>` per segment, drawn last so the outline sits on top. Each segment carries its own resolved `{ color, opacity, strokeWidth }` from the edge config, with theme defaults via CSS vars.

For shared edges, both pieces render their own copy of the segment stroke. Because the resolution chain is symmetric (same `pairKey` resolves the same way from either side), the two copies overlap exactly — no visible double-stroke.

## Content rendering details
- `<defs><clipPath><path d={body}/></clipPath></defs>` per piece (created when content or backgrounds exist).
- **Backgrounds**: `<image>` at the full background coords; clipPath cuts each to the piece's outline.
- **Text**: greedy word-wrap + `<text><tspan>` per line.
- **Image content**: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).
