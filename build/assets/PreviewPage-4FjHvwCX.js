import{c as S,e as z,f as _,g as E,h as P,r as b,j as s,d as A,W as w}from"./index-Dy5NuvdT.js";import{P as C,f as j}from"./formatTime-BfOh1obu.js";const N="# src/puzzle — Rendering Module\n\nSelf-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's \"Module bundle (ZIP)\" export.\n\n## Public API (`index.js`)\n- `PuzzleBoard` — root `<svg>` rendering all pieces.\n- `PuzzlePiece` — single piece as `<g>`. Body = fill-only `<path>`; outline = one `<path>` per segment (so each edge can carry its own color / opacity / width). Optional content (text/image) and backgrounds are clipped to the body path.\n- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string (the body).\n- `computeSidePath(piece, allPieces, side, effect, config)` — one continuous side path (used by edge editor overlay).\n- `computeSideSegments(piece, allPieces, side, effect, config)` — `[{ pairKey, neighborId, d, style }]` per segment, each `d` is M-prefixed and standalone. Used by `PuzzlePiece` to render per-edge styled strokes.\n- `computePieceBbox(piece, allPieces, effect, config)` — bounding box including knob/wave extent.\n- `EFFECT_NAMES` — `['puzzle', 'wave', 'straight']`.\n- Exports `KNOB_R`, `EFFECTS`, `normalizeSide`, etc. for advanced use.\n\n## Key Constants\n- `KNOB_R = 30` — pieces need at least `2 * KNOB_R = 60px` per side.\n\n## Effects (`effects/`)\nEach effect exports `{ buildSide, hidesKnobs? }`. `buildSide` returns an SVG path fragment (no leading `M`). Currently: `puzzleEffect`, `waveEffect`, `straightEffect`.\n\n## Piece Shape (used by `PuzzleBoard`)\n```js\n{\n  id, x, y, w, h, label?,\n  fill?: string,                                // optional override fill color\n  content?: ContentSpec,                        // optional text/image content\n  backgrounds?: Array<{ id, src, fit, x, y, w, h }>,  // multi-piece images (px space)\n  sides: { top?, right?, bottom?, left? },      // Side = 'flat' | {count,type} | [{pos,type}]\n  edgeEffects:        { [side]: { [neighborId]: effectName } },\n  edgeEffectConfigs:  { [side]: { [neighborId]: config } },\n}\n```\n\n## Render layers (per piece, in z-order)\n1. **Body** (`.piece__body`) — fill-only closed path. The fill is the piece color (or theme `--puzzle-fill`).\n2. **Backgrounds** (optional) — multi-piece images, clipped to the body. Same image rendered in every overlapping piece; SVG clipping does the slicing for free.\n3. **Content** (optional) — text or image, clipped to the body.\n4. **Edges** (`.piece__edge`) — one `<path>` per segment, drawn last so the outline sits on top. Each segment carries its own resolved `{ color, opacity, strokeWidth }` from the edge config, with theme defaults via CSS vars.\n\nFor shared edges, both pieces render their own copy of the segment stroke. Because the resolution chain is symmetric (same `pairKey` resolves the same way from either side), the two copies overlap exactly — no visible double-stroke.\n\n## Content rendering details\n- `<defs><clipPath><path d={body}/></clipPath></defs>` per piece (created when content or backgrounds exist).\n- **Backgrounds**: `<image>` at the full background coords; clipPath cuts each to the piece's outline.\n- **Text**: greedy word-wrap + `<text><tspan>` per line.\n- **Image content**: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).\n",M=`/*
 * Puzzle board styles.
 *
 * These rules use a few CSS custom properties so the module blends into
 * whatever design system is consuming it. Each one has a fallback, so it
 * works unmodified in a vanilla React app too. Override any variable on
 * \`:root\` (or an ancestor) to re-theme:
 *
 *   --puzzle-fill, --puzzle-fill-hover, --puzzle-fill-selected
 *   --puzzle-stroke, --puzzle-stroke-hover
 *   --puzzle-label, --puzzle-label-selected
 *
 * Each piece is rendered as:
 *   .piece__body  — fill only (the closed outline, no stroke)
 *   .piece__edge  — stroke only, one path per segment, so each segment can
 *                   have its own color / opacity / stroke-width via inline
 *                   style. Falls back to --puzzle-stroke when nothing is set.
 */

.puzzle-board {
  display: block;
  overflow: visible;
}

.piece {
  cursor: pointer;
}

/* Body: fill only. The visible outline comes from .piece__edge. */
.piece__body {
  fill: var(--puzzle-fill, var(--surface, #161b22));
  stroke: none;
  transition: fill 150ms ease;
}

/* Selected state — editor-only signal. NOT user-configurable; kept here
 * so the studio can show which piece is being edited. The hover signal,
 * by contrast, is now a user-pickable effect (\`highlight\`) — see the
 * effect block at the bottom of this file. */
.piece--selected .piece__body {
  fill: var(--puzzle-fill-selected, var(--surface-3, #232b38));
}

/* One path per segment — drawn on top of the body so the outline can be
 * styled independently per edge. Inline style overrides take precedence. */
.piece__edge {
  fill: none;
  stroke: var(--puzzle-stroke, var(--stroke-soft, #3a414d));
  stroke-width: 1.25;
  stroke-linejoin: round;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  transition: stroke 150ms ease, stroke-width 150ms ease;
}

/* Selection-state edge styling intentionally omitted: it competed with
 * user-configured edge effects (Highlight / Thicken) and made it
 * impossible to tell whether a configured effect was actually firing.
 * Selection signal stays via \`.piece--selected .piece__body\` (fill shift)
 * which targets a different paint layer entirely. */

/* Backward-compat: anything still using .piece__path keeps working. */
.piece__path {
  fill: var(--puzzle-fill, var(--surface, #161b22));
  stroke: var(--puzzle-stroke, var(--stroke-soft, #3a414d));
  stroke-width: 1.25;
  stroke-linejoin: round;
  transition: stroke 150ms ease, stroke-width 150ms ease, fill 150ms ease;
}

.piece__label {
  fill: var(--puzzle-label, var(--text-muted, #8a94a6));
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-anchor: middle;
  dominant-baseline: central;
  user-select: none;
  pointer-events: none;
  font-family: inherit;
}

.piece--selected .piece__label {
  fill: var(--puzzle-label-selected, var(--text, #e6edf3));
}

/* Invisible hit region placed over each tab. Clicking navigates to the
 * neighbor across the connection. A subtle tint appears on hover so the
 * interaction is discoverable. */
.piece__knob-hit {
  fill: transparent;
  cursor: pointer;
  transition: fill 120ms ease;
}

.piece__knob-hit:hover {
  fill: var(
    --puzzle-knob-hit-hover,
    var(--stroke-hover-soft, rgba(66, 133, 244, 0.25))
  );
}

.piece__content {
  fill: var(--puzzle-content, var(--text, #e6edf3));
  font-family: inherit;
  user-select: none;
  pointer-events: none;
}

/* === Interaction effects v2 ================================================
   Each entry in the effects catalogue (see src/puzzle/effects-catalog.js)
   maps to ONE class per supported trigger:

     .piece--anim-{id}--{trigger}            (cell tier — root <g>)
     .piece__edge--anim-{id}--{trigger}      (edge tier — segment <path>)

   Triggers:
     hover  — applies while the piece is :hover
     click  — applies while the piece is :active
     idle   — applies when the piece is NOT :hover (continuous)
     always — applies in every state (continuous)

   Per-effect intensity rides through CSS custom properties (--anim-*)
   that PuzzlePiece writes inline on each <g>/<path>. Effects in different
   exclusivity groups compose because they target different CSS properties
   (transform / filter / fill / stroke) so there's no overwrite war.
   Same-group effects (e.g., scale-up + scale-down) cannot coexist —
   the picker auto-swaps them.
*/

.piece[class*="piece--anim-"] {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease, opacity 200ms ease;
}

.piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}

/* --- Cell · highlight (fill shift) ------------------------------------- */
.piece--anim-highlight--hover:hover  .piece__body,
.piece--anim-highlight--click:active .piece__body,
.piece--anim-highlight--always       .piece__body {
  fill: var(--puzzle-fill-hover, var(--surface-2, #1b222d));
}

/* --- Cell · lift (translate up) ---------------------------------------- */
.piece--anim-lift--hover:hover  { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.piece--anim-lift--click:active { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.piece--anim-lift--always       { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }

/* --- Cell · scale-up --------------------------------------------------- */
.piece--anim-scale-up--hover:hover  { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.piece--anim-scale-up--click:active { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.piece--anim-scale-up--always       { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }

/* --- Cell · scale-down ------------------------------------------------- */
.piece--anim-scale-down--hover:hover  { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.piece--anim-scale-down--click:active { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.piece--anim-scale-down--always       { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }

/* --- Cell · glow (drop-shadow on body) --------------------------------- */
.piece--anim-glow--hover:hover  .piece__body,
.piece--anim-glow--click:active .piece__body,
.piece--anim-glow--always       .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) var(--primary-tint, rgba(214, 139, 84, 0.55)))
          drop-shadow(0 0 calc(var(--anim-glow-radius, 6px) * 2) var(--primary-tint, rgba(214, 139, 84, 0.4)));
}
.piece--anim-glow--idle:not(:hover) .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) var(--primary-tint, rgba(214, 139, 84, 0.55)));
}

/* --- Cell · pulse (continuous breathing) ------------------------------- */
.piece--anim-pulse--idle,
.piece--anim-pulse--always {
  animation: piece-anim-pulse var(--anim-pulse-speed, 2.6s) ease-in-out infinite;
}
.piece--anim-pulse--idle:hover { animation-play-state: paused; }

@keyframes piece-anim-pulse {
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%      { opacity: 0.92; transform: scale(0.985); }
}

/* Edge effects come in two trigger scopes:
     * \`--{trigger}-on-piece\` (default) — fires from the parent piece's
       :hover/:active. Bigger hit target; user feels "the whole piece".
     * \`--{trigger}-on-edge\` — fires from the edge stroke itself. Precise
       per-edge feel. Edges with this scope get \`pointer-events: stroke\`
       (set by PuzzlePiece) so the visible stroke region is hoverable. */

/* --- Edge · highlight (stroke recolour + thicken) ---------------------- */
.piece:hover  .piece__edge--anim-highlight--hover-on-piece,
.piece:active .piece__edge--anim-highlight--click-on-piece,
              .piece__edge--anim-highlight--always-on-piece,
.piece__edge--anim-highlight--hover-on-edge:hover,
.piece__edge--anim-highlight--click-on-edge:active,
.piece__edge--anim-highlight--always-on-edge {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
}

/* --- Edge · glow ------------------------------------------------------- */
.piece:hover  .piece__edge--anim-glow--hover-on-piece,
.piece:active .piece__edge--anim-glow--click-on-piece,
              .piece__edge--anim-glow--always-on-piece,
.piece__edge--anim-glow--hover-on-edge:hover,
.piece__edge--anim-glow--click-on-edge:active,
.piece__edge--anim-glow--always-on-edge {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.piece:not(:hover) .piece__edge--anim-glow--idle-on-piece,
.piece__edge--anim-glow--idle-on-edge:not(:hover) {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* --- Edge · thicken ---------------------------------------------------- */
.piece:hover  .piece__edge--anim-thicken--hover-on-piece,
.piece:active .piece__edge--anim-thicken--click-on-piece,
              .piece__edge--anim-thicken--always-on-piece,
.piece__edge--anim-thicken--hover-on-edge:hover,
.piece__edge--anim-thicken--click-on-edge:active,
.piece__edge--anim-thicken--always-on-edge {
  stroke-width: var(--anim-edge-thicken-width, 3.5px);
}

/* --- Edge · wiggle (transient transform shake) ------------------------- */
.piece:hover  .piece__edge--anim-wiggle--hover-on-piece,
.piece:active .piece__edge--anim-wiggle--click-on-piece,
.piece__edge--anim-wiggle--hover-on-edge:hover,
.piece__edge--anim-wiggle--click-on-edge:active {
  animation: piece-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes piece-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(var(--anim-edge-wiggle-intensity, 0.6px), calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  40%  { transform: translate(calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  60%  { transform: translate(calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px)), var(--anim-edge-wiggle-intensity, 0.6px)); }
  80%  { transform: translate(calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  100% { transform: translate(0, 0); }
}

/* --- Edge · flash (transient stroke pulse) ----------------------------- */
.piece:hover  .piece__edge--anim-flash--hover-on-piece,
.piece:active .piece__edge--anim-flash--click-on-piece,
.piece__edge--anim-flash--hover-on-edge:hover,
.piece__edge--anim-flash--click-on-edge:active {
  animation: piece-edge-flash var(--anim-edge-flash-duration, 700ms) ease-out;
}
@keyframes piece-edge-flash {
  0%   { stroke: var(--primary-2, #d68b54);
         filter: drop-shadow(0 0 6px var(--primary-tint, rgba(214,139,84,0.6))); }
  100% { /* falls back to inline style / .piece__edge default */ }
}

/* Respect prefers-reduced-motion — collapse all transitions / animations
 * to no-ops. Static visuals (highlight fill shift, thicken width) still
 * work because they're not transitions. */
@media (prefers-reduced-motion: reduce) {
  .piece[class*="piece--anim-"],
  .piece__edge[class*="piece__edge--anim-"] {
    animation: none !important;
    transition: none !important;
  }
  .piece[class*="piece--anim-lift--"],
  .piece[class*="piece--anim-scale-up--"],
  .piece[class*="piece--anim-scale-down--"] { transform: none; }
}
`,T=`import { useMemo, useState } from 'react';
import PuzzlePiece from './PuzzlePiece.jsx';
import { computePieceBbox, computePiecePath } from './geometry.js';
import './PuzzleBoard.css';

const STROKE_PAD = 60;  // padding for wave effects (max amplitude ~40 + margin)

// Renders every piece as a <path> inside a single <svg>, so the outlines
// stay seamless and hover/selection can control z-order trivially.
//
// Props:
//   pieces       — Piece[] from the board state
//   selectedId   — id of the currently-selected piece (optional)
//   effect       — connector effect name: 'puzzle' | 'wave' | 'straight' (default: 'puzzle')
//   onSelect     — called with a piece id when its body is clicked
//   onKnobClick  — called with (pieceId, side, pos) when a tab is clicked.
//                  Typical handler is \`board.flipKnob\` from usePuzzleBoard,
//                  which flips tab/socket ownership across the connection.
export default function PuzzleBoard({
  pieces,
  selectedId,
  effect = 'puzzle',
  effectConfig,
  onSelect,
  onKnobClick,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const enriched = useMemo(
    () =>
      pieces.map((p) => ({
        ...p,
        path: computePiecePath(p, pieces, effect, effectConfig),
        bbox: computePieceBbox(p, pieces, effect, effectConfig),
      })),
    [pieces, effect, effectConfig]
  );

  const bbox = useMemo(() => {
    return enriched.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.bbox.minX),
        minY: Math.min(acc.minY, p.bbox.minY),
        maxX: Math.max(acc.maxX, p.bbox.maxX),
        maxY: Math.max(acc.maxY, p.bbox.maxY),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
  }, [enriched]);

  const vbX = bbox.minX - STROKE_PAD;
  const vbY = bbox.minY - STROKE_PAD;
  const vbW = bbox.maxX - bbox.minX + STROKE_PAD * 2;
  const vbH = bbox.maxY - bbox.minY + STROKE_PAD * 2;

  // Selected + hovered pieces render last so their stroke sits on top.
  const ordered = useMemo(() => {
    if (hoveredId == null && selectedId == null) return enriched;
    const promoteIds = [];
    if (selectedId != null) promoteIds.push(selectedId);
    if (hoveredId != null && hoveredId !== selectedId) promoteIds.push(hoveredId);
    const out = enriched.filter((p) => !promoteIds.includes(p.id));
    for (const id of promoteIds) {
      const top = enriched.find((p) => p.id === id);
      if (top) out.push(top);
    }
    return out;
  }, [enriched, hoveredId, selectedId]);

  const handleHoverStart = (id) => setHoveredId(id);
  const handleHoverEnd = (id) =>
    setHoveredId((current) => (current === id ? null : current));

  const handleKnobClick = onKnobClick
    ? (ownerId, side, pos) => onKnobClick(ownerId, side, pos)
    : undefined;

  return (
    <svg
      className="puzzle-board"
      viewBox={\`\${vbX} \${vbY} \${vbW} \${vbH}\`}
      width={vbW}
      height={vbH}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ordered.map((p) => (
        <PuzzlePiece
          key={p.id}
          piece={p}
          path={p.path}
          allPieces={pieces}
          effect={effect}
          isHovered={hoveredId === p.id}
          isSelected={selectedId === p.id}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onSelect={onSelect}
          onKnobClick={handleKnobClick}
        />
      ))}
    </svg>
  );
}
`,F=`import { KNOB_R, TAB, computeActiveKnobs, computeSideSegments, knobHitCenter } from './geometry.js';
import { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';

const SIDES = ['top', 'right', 'bottom', 'left'];

// Single puzzle piece rendered as <g> with one <path> for the outline,
// plus optional content (text/image) clipped to that path.

const HIT_R = KNOB_R * 0.75;

export default function PuzzlePiece({
  piece,
  path,
  allPieces,
  effect = 'puzzle',
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  onKnobClick,
}) {
  const { id, x, y, w, h, label, fill, content, backgrounds, cellEffects } = piece;
  const knobs = computeActiveKnobs(piece, allPieces, effect);
  const clipId = \`pc-clip-\${id}\`;
  const maskId = \`pc-mask-\${id}\`;
  const hasContent = !!content && (content.text || content.src);
  const hasBackgrounds = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBackgrounds;
  const cellAnim = cellEffectAttrs(cellEffects);

  // Per-segment edge strokes. Compute once per side so each segment can carry
  // its own color / opacity / stroke-width while the body stays one path.
  const segments = SIDES.flatMap((side) =>
    computeSideSegments(piece, allPieces, side, effect)
  );

  // Knockout pass: any segment whose user-set opacity is 0 should remove the
  // body where it sits — i.e. a transparent strip the same width as the
  // (otherwise invisible) stroke would have been. Without this, opacity:0
  // looks identical to width:0 (the body fills the slot anyway).
  //
  // Implemented as an SVG <mask>: the body path is white (= keep) and each
  // knockout segment paints a black stroke at its width (= punch through).
  const knockoutSegments = segments.filter(
    (seg) => seg.style && typeof seg.style.opacity === 'number' && seg.style.opacity <= 0.001
  );
  const hasKnockout = knockoutSegments.length > 0;

  return (
    <g
      className={\`piece \${isHovered ? 'piece--hover' : ''} \${isSelected ? 'piece--selected' : ''} \${cellAnim.className}\`.replace(/\\s+/g, ' ').trim()}
      style={cellAnim.style}
      onMouseEnter={() => onHoverStart?.(id)}
      onMouseLeave={() => onHoverEnd?.(id)}
      onClick={() => onSelect?.(id)}
    >
      <defs>
        {needsClip && (
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        )}
        {hasKnockout && (
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* Start fully opaque inside the body, then carve out each
                opacity-0 segment with a black stroke at its width. */}
            <path d={path} fill="white" />
            {knockoutSegments.map((seg, i) => (
              <path
                key={\`ko-\${seg.pairKey}-\${i}\`}
                d={seg.d}
                fill="none"
                stroke="black"
                strokeWidth={seg.style?.strokeWidth ?? 1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        )}
      </defs>

      {/* Body + visual layers wrapped in the knockout mask when any segment
          requested opacity:0 — the mask leaves transparent strips along
          those edges so the page background shows through. */}
      <g {...(hasKnockout ? { mask: \`url(#\${maskId})\` } : null)}>
        {/* Body: fill only — the visible stroke comes from per-segment paths
            rendered on top, so each edge can be styled independently. */}
        <path d={path} className="piece__body" style={fill ? { fill } : undefined} />

        {hasBackgrounds && (
          <g clipPath={\`url(#\${clipId})\`} pointerEvents="none">
            {backgrounds.map((bg) => (
              <BackgroundImage key={bg.id} bg={bg} />
            ))}
          </g>
        )}

        {hasContent && (
          <g clipPath={\`url(#\${clipId})\`} pointerEvents="none">
            <PieceContent piece={piece} />
          </g>
        )}

        {!hasContent && !hasBackgrounds && label && (
          <text x={x + w / 2} y={y + h / 2} className="piece__label">
            {label}
          </text>
        )}
      </g>

      {/* Per-segment edge strokes (rendered after content so the outline sits
          on top). Opacity:0 strokes are still emitted but don't paint — the
          mask above is what creates the visible transparent strip.

          The wrapper's pointer-events: when ANY segment carries an
          edge-scope effect we open it up to \`stroke\` so the stroke region
          can receive :hover/:active. Otherwise stays 'none' so clicks
          fall through to the parent piece (selection unaffected). */}
      {(() => {
        const segAttrs = segments.map((seg) => edgeEffectAttrs(seg.style?.effects));
        const anyEdgeScope = segAttrs.some((ea) => ea.hasEdgeScope);
        return (
          <g className="piece__edges" pointerEvents={anyEdgeScope ? 'stroke' : 'none'}>
            {segments.map((seg, i) => {
              const s = seg.style;
              const inlineStyle = s ? {
                ...(s.color != null       ? { stroke: s.color } : null),
                ...(s.opacity != null     ? { strokeOpacity: s.opacity } : null),
                ...(s.strokeWidth != null ? { strokeWidth: s.strokeWidth } : null),
              } : undefined;
              const ea = segAttrs[i];
              const mergedStyle = ea.style || inlineStyle
                ? { ...(inlineStyle || {}), ...(ea.style || {}) }
                : undefined;
              return (
                <path
                  key={\`\${seg.pairKey}-\${i}\`}
                  d={seg.d}
                  className={\`piece__edge \${ea.className}\`.trim()}
                  style={mergedStyle}
                />
              );
            })}
          </g>
        );
      })()}

      {onKnobClick &&
        knobs
          .filter((k) => k.type === TAB)
          .map((k) => {
            const { hx, hy } = knobHitCenter(k.side, k.cx, k.cy);
            return (
              <circle
                key={\`\${k.side}-\${k.pos}\`}
                cx={hx}
                cy={hy}
                r={HIT_R}
                className="piece__knob-hit"
                onClick={(e) => {
                  e.stopPropagation();
                  onKnobClick(id, k.side, k.pos);
                }}
              />
            );
          })}
    </g>
  );
}

// Render a multi-piece background image. The same image is rendered in every
// overlapping piece at the full background coordinates, and each piece's
// clipPath cuts it to that piece's outline — so the image appears spanned and
// sliced naturally across pieces.
function BackgroundImage({ bg }) {
  const par =
    bg.fit === 'cover'   ? 'xMidYMid slice' :
    bg.fit === 'contain' ? 'xMidYMid meet'  :
    bg.fit === 'fill'    ? 'none'           :
                           'xMidYMid slice';
  return (
    <image
      href={bg.src}
      x={bg.x} y={bg.y} width={bg.w} height={bg.h}
      preserveAspectRatio={par}
    />
  );
}

// Render text or image content inside a piece. Image fit options mirror
// the SVG \`preserveAspectRatio\` attribute:
//   cover → xMidYMid slice  · fills, may crop
//   contain → xMidYMid meet · fits whole image, may letterbox
//   fill → none             · stretches to bounds
//   none → xMidYMid meet at natural size (we still meet for safety)
function PieceContent({ piece }) {
  const { x, y, w, h, content } = piece;
  const PAD = 18;

  if (content.type === 'image' && content.src) {
    const fit = content.fit || 'cover';
    const par =
      fit === 'cover'   ? 'xMidYMid slice' :
      fit === 'contain' ? 'xMidYMid meet'  :
      fit === 'fill'    ? 'none'           :
                          'xMidYMid meet';
    return (
      <image
        href={content.src}
        x={x} y={y} width={w} height={h}
        preserveAspectRatio={par}
      />
    );
  }

  // Text content. Wrap manually since SVG <text> doesn't auto-wrap.
  const text = content.text || '';
  const fontSize = content.fontSize || Math.min(w, h) / 8;
  const align = content.align || 'center';
  const color = content.color || 'var(--text, #e6edf3)';
  const fontWeight = content.fontWeight || 500;

  const lines = wrapText(text, w - PAD * 2, fontSize);
  const lineH = fontSize * 1.25;
  const totalH = lines.length * lineH;
  const startY = y + h / 2 - totalH / 2 + lineH * 0.7;
  const tx = align === 'left' ? x + PAD : align === 'right' ? x + w - PAD : x + w / 2;
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';

  return (
    <text
      className="piece__content"
      style={{ fontSize, fontWeight, fill: color }}
      textAnchor={anchor}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={tx} y={startY + i * lineH}>{line}</tspan>
      ))}
    </text>
  );
}

// Greedy word wrap — approximate width using fontSize * 0.55 per char.
function wrapText(text, maxWidth, fontSize) {
  const charW = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor(maxWidth / charW));
  const out = [];
  for (const para of text.split('\\n')) {
    if (para === '') { out.push(''); continue; }
    const words = para.split(/\\s+/);
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length <= maxChars) line = next;
      else {
        if (line) out.push(line);
        line = word.length <= maxChars ? word : word.slice(0, maxChars);
      }
    }
    if (line) out.push(line);
  }
  return out;
}
`,I=`// Minimal board helpers consumed by \`geometry.js\` for path building.
// (The high-level state model now lives in \`src/grid/\`; pieces are derived
// from a Project via \`compileProject\`.)

export const EPS = 0.01;

// All pieces that share the given side of \`piece\`.
export function findNeighbors(pieces, piece, side) {
  const pid = piece.id;
  if (side === 'right') {
    const x = piece.x + piece.w;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'left') {
    const x = piece.x;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x + p.w - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'bottom') {
    const y = piece.y + piece.h;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  if (side === 'top') {
    const y = piece.y;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y + p.h - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  return [];
}

// Sub-edges of a side, one per neighbor (or one outer span).
export function findEdgeSegments(pieces, piece, side) {
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return [{ startPos: 0, endPos: 1, neighborId: null }];

  const isVertical = side === 'left' || side === 'right';
  const sideLen = isVertical ? piece.h : piece.w;
  const sideStart = isVertical ? piece.y : piece.x;

  const ranges = neighbors
    .map((nb) => {
      const nbStart = isVertical ? nb.y : nb.x;
      const nbEnd = isVertical ? nb.y + nb.h : nb.x + nb.w;
      const overlapStart = Math.max(sideStart, nbStart);
      const overlapEnd = Math.min(sideStart + sideLen, nbEnd);
      return {
        startPos: (overlapStart - sideStart) / sideLen,
        endPos: (overlapEnd - sideStart) / sideLen,
        neighborId: nb.id,
      };
    })
    .sort((a, b) => a.startPos - b.startPos);

  const segments = [];
  let cursor = 0;
  for (const r of ranges) {
    if (r.startPos > cursor + 1e-4) {
      segments.push({ startPos: cursor, endPos: r.startPos, neighborId: null });
    }
    segments.push(r);
    cursor = r.endPos;
  }
  if (cursor < 1 - 1e-4) {
    segments.push({ startPos: cursor, endPos: 1, neighborId: null });
  }
  return segments;
}

// Effect lookup chain for a single segment.
export function effectForSegment(piece, side, neighborId, defaultEffect = 'puzzle') {
  const key = neighborId || '__outer';
  return (
    piece?.edgeEffects?.[side]?.[key] ??
    piece?.sideEffects?.[side] ??
    piece?.effect ??
    defaultEffect
  );
}
`,O=`// Shared helper: turn an effects map (e.g. piece.cellEffects or seg.style.effects)
// into the className + style attrs the renderer needs:
//
//   className — one space-separated \`<scope>--anim-<id>--<trigger>\` per entry
//   style     — CSS custom properties from each entry's config bag
//
// Used by both \`PuzzlePiece\` (live studio) and \`export.js\` (single-file
// JSX export) so the deployed puzzle gets identical classes + vars.
import { CELL_EFFECTS, EDGE_EFFECTS } from './effects-catalog.js';

function computeAttrs(effects, catalogue, scopeClass) {
  if (!effects) return { className: '', style: undefined, hasEdgeScope: false };
  const classes = [];
  const style = {};
  let hasEdgeScope = false;
  for (const entry of Object.values(effects)) {
    if (!entry || !entry.id || !entry.trigger) continue;
    const def = catalogue[entry.id];
    // Edges grow a \`--{trigger}-on-{scope}\` suffix; cells stay scope-free.
    // Legacy entries without \`scope\` are treated as 'piece' (current default).
    const scope = def?.scopes ? (entry.scope ?? def.defaultScope ?? 'piece') : null;
    if (scope === 'edge') hasEdgeScope = true;
    const triggerSuffix = scope ? \`\${entry.trigger}-on-\${scope}\` : entry.trigger;
    classes.push(\`\${scopeClass}--anim-\${entry.id}--\${triggerSuffix}\`);
    if (!def) continue;
    for (const [field, schema] of Object.entries(def.config || {})) {
      if (!schema?.cssVar) continue;
      const raw = entry.config?.[field] ?? schema.default;
      style[schema.cssVar] = \`\${raw}\${schema.unit || ''}\`;
    }
  }
  return {
    className: classes.join(' '),
    style: Object.keys(style).length ? style : undefined,
    hasEdgeScope,
  };
}

export function cellEffectAttrs(effects) {
  return computeAttrs(effects, CELL_EFFECTS, 'piece');
}

export function edgeEffectAttrs(effects) {
  return computeAttrs(effects, EDGE_EFFECTS, 'piece__edge');
}
`,L=`// Effect catalogue — single source of truth for the studio panels, the
// renderer, and the single-file JSX export. Each entry declares:
//
//   label    — display name shown on chips
//   group    — exclusivity group (effects in the same group can't coexist
//              on the same piece/edge tier; auto-swap on pick)
//   triggers — which trigger states the effect supports
//                'hover'  — applies while pointer is over the piece
//                'click'  — applies while pointer is pressed (:active)
//                'idle'   — applies when NOT hovered/pressed (continuous)
//                'always' — applies in every state (continuous)
//   defaultTrigger — pre-selected trigger when the user adds the effect
//   config   — schema for the per-effect intensity sliders. Each field:
//                { default, min, max, step, label, unit, cssVar }
//              \`cssVar\` is the CSS custom property the renderer writes
//              (e.g. '--anim-lift-distance'). \`unit\` (optional) suffixes
//              the value when emitting the var (px, %, s, ms).

export const TRIGGERS = ['hover', 'click', 'idle', 'always'];

export const TRIGGER_LABELS = {
  hover:  'Hover',
  click:  'Click',
  idle:   'Idle',
  always: 'Always',
};

export const CELL_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'fill',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {},
  },
  lift: {
    label: 'Lift',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      distance: { default: 4, min: 1, max: 16, step: 1, label: 'Distance', unit: 'px', cssVar: '--anim-lift-distance' },
    },
  },
  'scale-up': {
    label: 'Scale up',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      amount: { default: 0.04, min: 0.01, max: 0.3, step: 0.01, label: 'Amount', unit: '', cssVar: '--anim-scale-up-amount' },
    },
  },
  'scale-down': {
    label: 'Scale down',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      amount: { default: 0.04, min: 0.01, max: 0.3, step: 0.01, label: 'Amount', unit: '', cssVar: '--anim-scale-down-amount' },
    },
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    config: {
      radius: { default: 6, min: 1, max: 24, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-glow-radius' },
    },
  },
  pulse: {
    label: 'Pulse',
    group: 'transform',
    triggers: ['idle', 'always'],
    defaultTrigger: 'idle',
    config: {
      speed: { default: 2.6, min: 0.5, max: 6, step: 0.1, label: 'Speed', unit: 's', cssVar: '--anim-pulse-speed' },
    },
  },
};

// Edge effects also declare \`scopes\`: where the trigger fires from. 'piece'
// means hovering anywhere on the parent piece activates the effect (current
// default — large hit target). 'edge' means hovering the edge stroke itself
// activates only that edge (precise but small target). Each entry below
// supports both; the picker exposes a "Where" pill on every active row.
const EDGE_SCOPES = ['piece', 'edge'];
export const EDGE_SCOPE_LABELS = { piece: 'Cell', edge: 'Edge' };

export const EDGE_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {},
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      radius: { default: 4, min: 1, max: 16, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-edge-glow-radius' },
    },
  },
  wiggle: {
    label: 'Wiggle',
    group: 'transform',
    triggers: ['hover', 'click'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      intensity: { default: 0.6, min: 0.1, max: 2.5, step: 0.1, label: 'Intensity', unit: 'px', cssVar: '--anim-edge-wiggle-intensity' },
    },
  },
  thicken: {
    label: 'Thicken',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      width: { default: 3.5, min: 1.5, max: 8, step: 0.25, label: 'Width', unit: 'px', cssVar: '--anim-edge-thicken-width' },
    },
  },
  flash: {
    label: 'Flash',
    group: 'animate',
    triggers: ['hover', 'click'],
    defaultTrigger: 'click',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      duration: { default: 700, min: 100, max: 2000, step: 50, label: 'Duration', unit: 'ms', cssVar: '--anim-edge-flash-duration' },
    },
  },
};

// Stable id arrays — used to render chip rows in a deterministic order.
export const CELL_EFFECT_IDS = Object.keys(CELL_EFFECTS);
export const EDGE_EFFECT_IDS = Object.keys(EDGE_EFFECTS);

// Build a fresh effect entry from the catalogue with default trigger,
// scope (edges only), and config. Used by the picker when the user clicks
// a chip to add an effect.
export function makeEffectEntry(catalogue, id, trigger, scope) {
  const def = catalogue[id];
  if (!def) return null;
  const t = trigger ?? def.defaultTrigger ?? def.triggers[0];
  const config = {};
  for (const [field, schema] of Object.entries(def.config || {})) {
    config[field] = schema.default;
  }
  // Cells have no scope concept — only edges do.
  if (def.scopes) {
    const s = scope ?? def.defaultScope ?? def.scopes[0];
    return { id, trigger: t, scope: s, config };
  }
  return { id, trigger: t, config };
}

// Storage key for an entry — must uniquely identify (id, trigger, scope)
// so multiple variants of the same effect can coexist (e.g. glow on hover
// for the cell + glow on idle for the edge). Scope-less keys (id:trigger)
// are valid v1 storage and treated as piece-scope at read time.
export function effectKey(id, trigger, scope) {
  return scope ? \`\${id}:\${trigger}:\${scope}\` : \`\${id}:\${trigger}\`;
}
`,B=`// Puzzle piece effect: classic interlocking tabs and sockets via SVG arcs.

// Build the path commands for ONE side of a piece.
//   startA, endA: absolute coords along the side's axis
//   fixed:        perpendicular coord of the edge (constant along this side)
//   axis:         'x' for horizontal edges (top/bottom), 'y' for vertical
//   knobs:        normalized knob list [{ pos, type }] in piece-relative pos [0,1]
//   pieceStartA:  absolute coord at pos=0 (so pos*pieceLength gives offset)
//   pieceLength:  length of the side
//   outwardSign:  +1 if outward direction along perpendicular axis is positive
//   KNOB_R:       knob radius
//
// Returns SVG path commands (string), starting with an L command and ending
// at (endA, fixed) — the caller has already moved to (startA, fixed).
function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R) {
  const dir = endA >= startA ? 1 : -1;
  const parts = [];

  // Sort knobs by traversal direction (ascending pos for forward, descending for reverse)
  const sortedKnobs = [...knobs].sort((a, b) => (a.pos - b.pos) * dir);

  for (const k of sortedKnobs) {
    // Use signed delta so the position is correct for both forward (dir=+1)
    // and reverse (dir=-1) traversal. pieceStartA + k.pos*pieceLength goes the
    // wrong direction when startA > endA.
    const knobAxisPos = startA + k.pos * (endA - startA);

    // SVG sweep=1 (CW) curves to the RIGHT of the direction of travel.
    // For a tab (outward bulge):
    //   axis='y' (vertical edge, going down or up): CW curves right (+x) for
    //     downward travel = outward for right edge, and CW curves left (-x) for
    //     upward travel = outward for left edge. Formula: tab → sweep=1. ✓
    //   axis='x' (horizontal edge, going right or left): CW curves down (+y)
    //     for rightward travel = inward for top edge, and CW curves up (-y) for
    //     leftward travel = inward for bottom edge. Formula: tab → sweep=0.
    const sweep = axis === 'y'
      ? (k.type === 'tab' ? 1 : 0)
      : (k.type === 'tab' ? 0 : 1);

    if (axis === 'x') {
      const cx = knobAxisPos;
      parts.push(\`L \${cx - dir * KNOB_R} \${fixed}\`);
      parts.push(\`A \${KNOB_R} \${KNOB_R} 0 0 \${sweep} \${cx + dir * KNOB_R} \${fixed}\`);
    } else {
      const cy = knobAxisPos;
      parts.push(\`L \${fixed} \${cy - dir * KNOB_R}\`);
      parts.push(\`A \${KNOB_R} \${KNOB_R} 0 0 \${sweep} \${fixed} \${cy + dir * KNOB_R}\`);
    }
  }

  // Final segment to side end
  if (axis === 'x') {
    parts.push(\`L \${endA} \${fixed}\`);
  } else {
    parts.push(\`L \${fixed} \${endA}\`);
  }

  return parts.join(' ');
}

export const puzzleEffect = {
  name: 'puzzle',
  displayName: 'Puzzle',
  hidesKnobs: false,
  buildSide,
};
`,$=`// Straight effect: simple straight line, no knobs.

function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, config) {
  if (axis === 'x') return \`L \${endA} \${fixed}\`;
  return \`L \${fixed} \${endA}\`;
}

export const straightEffect = {
  name: 'straight',
  displayName: 'Straight',
  hidesKnobs: true,
  buildSide,
};
`,R=`// Wave effect: pure continuous sine wave along an edge, no knobs.
//
// Alignment guarantee:
//   The wave's vertices are sampled at fixed absolute coordinates anchored to
//   the origin (0, 0). A vertex exists at every multiple of SAMPLE_STEP along
//   the active axis, plus the edge endpoints. Two adjacent pieces sharing an
//   edge will compute the SAME vertex set on that shared edge, regardless of
//   the wave's frequency, because the sample anchors are independent of piece
//   coordinates.

const DEFAULT_CONFIG = {
  frequency: 0.025,   // radians per pixel
  amplitude: 12,      // wave bulge in pixels
  phase: 0,           // global phase shift in radians (rotation)
};

const SAMPLE_STEP = 4; // pixels between samples — anchored to absolute origin

function sampleWave(startA, endA, fixed, axis, config) {
  const { frequency, amplitude, phase } = config;
  const lo = Math.min(startA, endA);
  const hi = Math.max(startA, endA);
  const sideLen = hi - lo;

  const firstAnchor = Math.ceil(lo / SAMPLE_STEP) * SAMPLE_STEP;
  const lastAnchor = Math.floor(hi / SAMPLE_STEP) * SAMPLE_STEP;

  const samples = [startA];
  for (let a = firstAnchor; a <= lastAnchor; a += SAMPLE_STEP) {
    if (a > lo && a < hi) samples.push(a);
  }
  samples.push(endA);

  if (endA < startA) samples.sort((a, b) => b - a);
  else samples.sort((a, b) => a - b);

  // Envelope: tapers to 0 at side endpoints so corners stay anchored.
  // This guarantees the path closes cleanly at piece corners. Two adjacent
  // pieces sharing an edge of the same length and same endpoints will have
  // identical envelopes anchored to identical absolute coordinates, so they
  // produce identical wave curves on the shared edge.
  return samples.map((a) => {
    const t = sideLen > 0 ? (a - lo) / sideLen : 0;
    const envelope = Math.sin(t * Math.PI);
    const offset = envelope * Math.sin(a * frequency + phase) * amplitude;
    return axis === 'x' ? [a, fixed + offset] : [fixed + offset, a];
  });
}

function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, config) {
  const cfg = { ...DEFAULT_CONFIG, ...(config || {}) };
  const pts = sampleWave(startA, endA, fixed, axis, cfg);
  // Skip first point (caller already at start) and emit lines to remaining points.
  return pts.slice(1).map(([px, py]) => \`L \${px} \${py}\`).join(' ');
}

export const waveEffect = {
  name: 'wave',
  displayName: 'Wave',
  defaultConfig: DEFAULT_CONFIG,
  hidesKnobs: true,
  buildSide,
};
`,K=`// Pure geometry helpers for puzzle pieces.
// No React in this file — it can be used anywhere (tests, SSR, workers…).

import { puzzleEffect } from './effects/puzzleEffect.js';
import { waveEffect } from './effects/waveEffect.js';
import { straightEffect } from './effects/straightEffect.js';
import { effectForSegment, findEdgeSegments } from './board.js';

export const KNOB_R = 30;
export const KNOB_D = KNOB_R * 2;

export const FLAT = 'flat';
export const TAB = 'tab';
export const SOCKET = 'socket';

export const EFFECTS = {
  puzzle: puzzleEffect,
  wave: waveEffect,
  straight: straightEffect,
};

export const EFFECT_NAMES = Object.keys(EFFECTS);

const POS_EPS = 1e-4;

export function evenlySpaced(count, type) {
  return Array.from({ length: count }, (_, i) => ({
    pos: (2 * i + 1) / (2 * count),
    type,
  }));
}

export function normalizeSide(side) {
  if (!side || side === FLAT) return [];
  if (side === TAB) return [{ pos: 0.5, type: TAB }];
  if (side === SOCKET) return [{ pos: 0.5, type: SOCKET }];
  if (Array.isArray(side)) {
    return side.map((k) => ({ pos: k.pos, type: k.type }));
  }
  if (typeof side === 'object' && side.count > 0 && side.type) {
    return evenlySpaced(side.count, side.type);
  }
  return [];
}

function hasTab(side) {
  return normalizeSide(side).some((k) => k.type === TAB);
}

// Build the path for one side, splitting into segments based on neighbors and
// applying the effect configured for each segment.
function buildSidePath({
  piece,
  allPieces,
  sideName,
  startA,
  endA,
  fixed,
  axis,
  pieceStartA,
  pieceLength,
  knobs,
  outwardSign,
  defaultEffect,
  effectConfig,
}) {
  const dir = endA >= startA ? 1 : -1;

  // Without pieces context, treat as one segment with the whole-side effect.
  if (!allPieces) {
    const effect = piece.sideEffects?.[sideName] || piece.effect || defaultEffect || 'puzzle';
    const fx = EFFECTS[effect] || EFFECTS.puzzle;
    return fx.buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, effectConfig);
  }

  const segments = findEdgeSegments(allPieces, piece, sideName);
  const ordered = dir > 0 ? segments : [...segments].reverse();
  const parts = [];

  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    // Per-segment config shadows per-side, which shadows global.
    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = pieceStartA + seg.startPos * pieceLength;
    const segEndAbs = pieceStartA + seg.endPos * pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd = dir > 0 ? segEndAbs : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    // Pick the knob whose position is INSIDE this segment (strict, no epsilon
    // on segment boundaries — boundary-point knobs are an artifact of single
    // whole-side knobs and would render twice).
    const segKnobs = knobs
      .filter((k) =>
        k.pos > seg.startPos + POS_EPS &&
        k.pos < seg.endPos - POS_EPS
      )
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    parts.push(
      fx.buildSide(segStart, segEnd, fixed, axis, segKnobs, segStart, segLen, outwardSign, KNOB_R, segConfig)
    );
  }
  return parts.join(' ');
}

// Build a single SVG \`d\` attribute for a piece. Each side may be split into
// segments (one per neighbor), and each segment can use a different effect.
export function computePiecePath(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const parts = [\`M \${x} \${y}\`];

  parts.push(buildSidePath({
    piece, allPieces, sideName: 'top',
    startA: x, endA: x + w, fixed: y, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.top,
    outwardSign: -1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'right',
    startA: y, endA: y + h, fixed: x + w, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.right,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'bottom',
    startA: x + w, endA: x, fixed: y + h, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'left',
    startA: y + h, endA: y, fixed: x, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.left,
    outwardSign: -1, defaultEffect, effectConfig,
  }));

  parts.push('Z');
  return parts.join(' ');
}

export function computeKnobs(piece) {
  const { x, y, w, h } = piece;
  const knobs = [];
  for (const k of normalizeSide(piece.sides?.top)) {
    knobs.push({ side: 'top', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y });
  }
  for (const k of normalizeSide(piece.sides?.right)) {
    knobs.push({ side: 'right', type: k.type, pos: k.pos, cx: x + w, cy: y + k.pos * h });
  }
  for (const k of normalizeSide(piece.sides?.bottom)) {
    knobs.push({ side: 'bottom', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y + h });
  }
  for (const k of normalizeSide(piece.sides?.left)) {
    knobs.push({ side: 'left', type: k.type, pos: k.pos, cx: x, cy: y + k.pos * h });
  }
  return knobs;
}

// Active knobs respect per-segment effect: a knob sitting in a wave/straight
// segment is hidden, but a knob in a puzzle segment on the same side stays.
export function computeActiveKnobs(piece, allPieces, defaultEffect = 'puzzle') {
  return computeKnobs(piece).filter((k) => {
    if (!allPieces) {
      const effect = piece.sideEffects?.[k.side] || piece.effect || defaultEffect;
      return !EFFECTS[effect]?.hidesKnobs;
    }
    const segments = findEdgeSegments(allPieces, piece, k.side);
    const seg = segments.find((s) => k.pos >= s.startPos - POS_EPS && k.pos <= s.endPos + POS_EPS);
    if (!seg) return false;
    const effect = effectForSegment(piece, k.side, seg.neighborId, defaultEffect);
    return !EFFECTS[effect]?.hidesKnobs;
  });
}

const HIT_OFFSET = KNOB_R * 0.5;

export function knobHitCenter(side, cx, cy) {
  if (side === 'top') return { hx: cx, hy: cy - HIT_OFFSET };
  if (side === 'bottom') return { hx: cx, hy: cy + HIT_OFFSET };
  if (side === 'left') return { hx: cx - HIT_OFFSET, hy: cy };
  return { hx: cx + HIT_OFFSET, hy: cy };
}

// Bounding box including effect-specific extents.
// Export buildSidePath for use in overlays that need to render edge paths.
export { buildSidePath };

// Compute the SVG path for a single side of a piece (for edge highlighting overlays).
export function computeSidePath(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const sideConfigs = {
    top: { startA: x, endA: x + w, fixed: y, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.top, outwardSign: -1, startPoint: \`\${x} \${y}\` },
    right: { startA: y, endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.right, outwardSign: +1, startPoint: \`\${x + w} \${y}\` },
    bottom: { startA: x + w, endA: x, fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom, outwardSign: +1, startPoint: \`\${x + w} \${y + h}\` },
    left: { startA: y + h, endA: y, fixed: x, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.left, outwardSign: -1, startPoint: \`\${x} \${y + h}\` },
  };

  const cfg = sideConfigs[sideName];
  if (!cfg) return '';

  const { startPoint, ...buildCfg } = cfg;
  const sidePath = buildSidePath({
    piece, allPieces, sideName,
    ...buildCfg,
    defaultEffect, effectConfig,
  });

  return \`M \${startPoint} \${sidePath}\`;
}


// Per-segment paths for one side. Each entry is a self-contained \`<path d>\`
// so it can be stroked independently (with its own color/opacity/width).
//
//   [{ neighborId, pairKey, d, style: { color?, opacity?, strokeWidth? } }]
//
// \`pairKey\` is the same key the project's edge map uses, so callers don't have
// to know whether the segment is a shared edge or an outer one.
export function computeSideSegments(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = normalizeSide(piece.sides?.[sideName]) || [];

  const sideConfigs = {
    top:    { startA: x,     endA: x + w, fixed: y,     axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: -1, startPoint: [x, y] },
    right:  { startA: y,     endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: +1, startPoint: [x + w, y] },
    bottom: { startA: x + w, endA: x,     fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: +1, startPoint: [x + w, y + h] },
    left:   { startA: y + h, endA: y,     fixed: x,     axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: -1, startPoint: [x, y + h] },
  };
  const cfg = sideConfigs[sideName];
  if (!cfg) return [];

  const dir = cfg.endA >= cfg.startA ? 1 : -1;
  const segments = allPieces
    ? findEdgeSegments(allPieces, piece, sideName)
    : [{ startPos: 0, endPos: 1, neighborId: null }];
  const ordered = dir > 0 ? segments : [...segments].reverse();

  const out = [];
  let cursorA = cfg.startA;          // current position along the side axis
  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = cfg.pieceStartA + seg.startPos * cfg.pieceLength;
    const segEndAbs   = cfg.pieceStartA + seg.endPos   * cfg.pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd   = dir > 0 ? segEndAbs   : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    const segKnobs = sidesNorm
      .filter((k) => k.pos > seg.startPos + POS_EPS && k.pos < seg.endPos - POS_EPS)
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    const inner = fx.buildSide(
      segStart, segEnd, cfg.fixed, cfg.axis,
      segKnobs, segStart, segLen, cfg.outwardSign, KNOB_R, segConfig
    );

    // Build the M command for the start of THIS segment along the axis.
    const sx = cfg.axis === 'x' ? cursorA : cfg.fixed;
    const sy = cfg.axis === 'y' ? cursorA : cfg.fixed;
    const d = \`M \${sx} \${sy} \${inner}\`;

    cursorA += dir * segLen;

    const pairKey = seg.neighborId
      ? edgeKeyOf(piece.id, seg.neighborId)
      : \`\${piece.id}||outer-\${sideName}\`;

    out.push({
      neighborId: seg.neighborId,
      pairKey,
      d,
      style: pickStyle(segConfig),
    });
  }

  return out;
}

// Lightweight edge-key helper (compile.js owns the canonical version).
function edgeKeyOf(a, b) { return a < b ? \`\${a}||\${b}\` : \`\${b}||\${a}\`; }

// Extract stroke-styling fields from a config object. Returns undefined if
// nothing is set so the renderer can know to fall back to CSS defaults.
function pickStyle(cfg) {
  if (!cfg) return undefined;
  const out = {};
  if (cfg.color != null)       out.color = cfg.color;
  if (cfg.opacity != null)     out.opacity = cfg.opacity;
  if (cfg.strokeWidth != null) out.strokeWidth = cfg.strokeWidth;
  // Effects map (v2): { 'glow:hover': { id, trigger, config }, ... }
  // Compiled in compile.js#assignSide via resolveEdgeEffects; the renderer
  // emits one class + matching CSS vars per entry.
  if (cfg.effects && Object.keys(cfg.effects).length) out.effects = cfg.effects;
  return Object.keys(out).length ? out : undefined;
}

export function computePieceBbox(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h, sides = {} } = piece;
  const padForSide = (side) => {
    let pad = 0;
    const segments = allPieces
      ? findEdgeSegments(allPieces, piece, side)
      : [{ neighborId: null }];
    for (const seg of segments) {
      const effect = effectForSegment(piece, side, seg.neighborId, defaultEffect);
      if (effect === 'wave') pad = Math.max(pad, (effectConfig?.amplitude ?? 12) + 2);
      else if (effect === 'puzzle' && hasTab(sides[side])) pad = Math.max(pad, KNOB_R);
    }
    return pad;
  };
  return {
    minX: x - padForSide('left'),
    minY: y - padForSide('top'),
    maxX: x + w + padForSide('right'),
    maxY: y + h + padForSide('bottom'),
  };
}
`,D=`// Public API for the puzzle rendering module.
// State + project management lives in \`src/grid/\`.

export { default as PuzzleBoard } from './PuzzleBoard.jsx';
export { default as PuzzlePiece } from './PuzzlePiece.jsx';

export {
  computePiecePath,
  computeSidePath,
  computeSideSegments,
  computePieceBbox,
  computeKnobs,
  computeActiveKnobs,
  knobHitCenter,
  evenlySpaced,
  normalizeSide,
  buildSidePath,
  KNOB_R,
  KNOB_D,
  FLAT,
  TAB,
  SOCKET,
  EFFECTS,
  EFFECT_NAMES,
} from './geometry.js';

// Interaction-effect catalogue + render helpers. Lives inside the puzzle
// module so the rendering pipeline stays self-contained / portable.
export {
  CELL_EFFECTS, EDGE_EFFECTS,
  CELL_EFFECT_IDS, EDGE_EFFECT_IDS,
  TRIGGERS, TRIGGER_LABELS,
  EDGE_SCOPE_LABELS,
  makeEffectEntry, effectKey,
} from './effects-catalog.js';

export { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';
`,U=(()=>{const e=new Uint32Array(256);for(let i=0;i<256;i++){let n=i;for(let o=0;o<8;o++)n=n&1?3988292384^n>>>1:n>>>1;e[i]=n}return e})();function W(e){let i=4294967295;for(let n=0;n<e.length;n++)i=U[(i^e[n])&255]^i>>>8;return(i^4294967295)>>>0}function v(e){const i=new TextEncoder,n=[],o=[];let d=0;for(const l of e){const f=i.encode(l.name),a=typeof l.content=="string"?i.encode(l.content):l.content,y=W(a),m=new Uint8Array(30+f.length),g=new DataView(m.buffer);g.setUint32(0,67324752,!0),g.setUint16(4,20,!0),g.setUint16(6,0,!0),g.setUint16(8,0,!0),g.setUint16(10,0,!0),g.setUint16(12,33,!0),g.setUint32(14,y,!0),g.setUint32(18,a.length,!0),g.setUint32(22,a.length,!0),g.setUint16(26,f.length,!0),g.setUint16(28,0,!0),m.set(f,30),n.push(m,a);const x=new Uint8Array(46+f.length),r=new DataView(x.buffer);r.setUint32(0,33639248,!0),r.setUint16(4,20,!0),r.setUint16(6,20,!0),r.setUint16(8,0,!0),r.setUint16(10,0,!0),r.setUint16(12,0,!0),r.setUint16(14,33,!0),r.setUint32(16,y,!0),r.setUint32(20,a.length,!0),r.setUint32(24,a.length,!0),r.setUint16(28,f.length,!0),r.setUint16(30,0,!0),r.setUint16(32,0,!0),r.setUint16(34,0,!0),r.setUint16(36,0,!0),r.setUint32(38,0,!0),r.setUint32(42,d,!0),x.set(f,46),o.push(x),d+=m.length+a.length}const h=o.reduce((l,f)=>l+f.length,0),c=d,p=new Uint8Array(22),t=new DataView(p.buffer);return t.setUint32(0,101010256,!0),t.setUint16(4,0,!0),t.setUint16(6,0,!0),t.setUint16(8,e.length,!0),t.setUint16(10,e.length,!0),t.setUint32(12,h,!0),t.setUint32(16,c,!0),t.setUint16(20,0,!0),new Blob([...n,...o,p],{type:"application/zip"})}const H=["top","right","bottom","left"],G=Object.assign({"../puzzle/CLAUDE.md":N,"../puzzle/PuzzleBoard.css":M,"../puzzle/PuzzleBoard.jsx":T,"../puzzle/PuzzlePiece.jsx":F,"../puzzle/board.js":I,"../puzzle/effect-attrs.js":O,"../puzzle/effects-catalog.js":L,"../puzzle/effects/puzzleEffect.js":B,"../puzzle/effects/straightEffect.js":$,"../puzzle/effects/waveEffect.js":R,"../puzzle/geometry.js":K,"../puzzle/index.js":D});function k(e,i){const n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=i,o.click(),URL.revokeObjectURL(n)}function Y(e){var d,h,c,p;const i=S(e),n=((h=(d=e.edges)==null?void 0:d.default)==null?void 0:h.effect)??"puzzle",o=((p=(c=e.edges)==null?void 0:c.default)==null?void 0:p.config)??null;return i.map(t=>{const l=z(t.cellEffects),f=H.flatMap(a=>_(t,i,a,n,o)).map(a=>{var m;const y=E((m=a.style)==null?void 0:m.effects);return{d:a.d,style:a.style?{color:a.style.color??null,opacity:a.style.opacity??null,strokeWidth:a.style.strokeWidth??null}:null,animClassName:y.className,animStyle:y.style??null,hasEdgeScope:y.hasEdgeScope}});return{id:t.id,x:t.x,y:t.y,w:t.w,h:t.h,label:t.label,fill:t.fill??null,content:t.content??null,backgrounds:t.backgrounds??null,animClassName:l.className,animStyle:l.style??null,d:P(t,i,n,o),anyEdgeScope:f.some(a=>a.hasEdgeScope),segments:f}})}const V=`
.hak-puzzle .piece { cursor: default; }
.hak-puzzle .piece[class*="piece--anim-"] {
  transform-box: fill-box; transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease, opacity 200ms ease;
}
.hak-puzzle .piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}

/* Cell · highlight */
.hak-puzzle .piece--anim-highlight--hover:hover  .piece__body,
.hak-puzzle .piece--anim-highlight--click:active .piece__body,
.hak-puzzle .piece--anim-highlight--always       .piece__body { fill: #1b222d; }

/* Cell · lift */
.hak-puzzle .piece--anim-lift--hover:hover  { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.hak-puzzle .piece--anim-lift--click:active { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.hak-puzzle .piece--anim-lift--always       { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }

/* Cell · scale-up */
.hak-puzzle .piece--anim-scale-up--hover:hover  { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-up--click:active { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-up--always       { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }

/* Cell · scale-down */
.hak-puzzle .piece--anim-scale-down--hover:hover  { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-down--click:active { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-down--always       { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }

/* Cell · glow */
.hak-puzzle .piece--anim-glow--hover:hover  .piece__body,
.hak-puzzle .piece--anim-glow--click:active .piece__body,
.hak-puzzle .piece--anim-glow--always       .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) rgba(214, 139, 84, 0.55))
          drop-shadow(0 0 calc(var(--anim-glow-radius, 6px) * 2) rgba(214, 139, 84, 0.4));
}
.hak-puzzle .piece--anim-glow--idle:not(:hover) .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) rgba(214, 139, 84, 0.55));
}

/* Cell · pulse */
.hak-puzzle .piece--anim-pulse--idle,
.hak-puzzle .piece--anim-pulse--always { animation: hak-piece-pulse var(--anim-pulse-speed, 2.6s) ease-in-out infinite; }
.hak-puzzle .piece--anim-pulse--idle:hover { animation-play-state: paused; }
@keyframes hak-piece-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: 0.92; transform: scale(0.985); }
}

/* Edge · highlight */
.hak-puzzle .piece:hover  .piece__edge--anim-highlight--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-highlight--click-on-piece,
.hak-puzzle              .piece__edge--anim-highlight--always-on-piece,
.hak-puzzle .piece__edge--anim-highlight--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-highlight--click-on-edge:active,
.hak-puzzle .piece__edge--anim-highlight--always-on-edge {
  stroke: #4285f4; stroke-width: 2.5;
}

/* Edge · glow */
.hak-puzzle .piece:hover  .piece__edge--anim-glow--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-glow--click-on-piece,
.hak-puzzle              .piece__edge--anim-glow--always-on-piece,
.hak-puzzle .piece__edge--anim-glow--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-glow--click-on-edge:active,
.hak-puzzle .piece__edge--anim-glow--always-on-edge {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.hak-puzzle .piece:not(:hover) .piece__edge--anim-glow--idle-on-piece,
.hak-puzzle .piece__edge--anim-glow--idle-on-edge:not(:hover) {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* Edge · thicken */
.hak-puzzle .piece:hover  .piece__edge--anim-thicken--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-thicken--click-on-piece,
.hak-puzzle              .piece__edge--anim-thicken--always-on-piece,
.hak-puzzle .piece__edge--anim-thicken--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-thicken--click-on-edge:active,
.hak-puzzle .piece__edge--anim-thicken--always-on-edge { stroke-width: var(--anim-edge-thicken-width, 3.5px); }

/* Edge · wiggle */
.hak-puzzle .piece:hover  .piece__edge--anim-wiggle--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-wiggle--click-on-piece,
.hak-puzzle .piece__edge--anim-wiggle--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-wiggle--click-on-edge:active {
  animation: hak-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box; transform-origin: center;
}
@keyframes hak-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(var(--anim-edge-wiggle-intensity, 0.6px), calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  40%  { transform: translate(calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  60%  { transform: translate(calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px)), var(--anim-edge-wiggle-intensity, 0.6px)); }
  80%  { transform: translate(calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  100% { transform: translate(0, 0); }
}

/* Edge · flash */
.hak-puzzle .piece:hover  .piece__edge--anim-flash--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-flash--click-on-piece,
.hak-puzzle .piece__edge--anim-flash--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-flash--click-on-edge:active {
  animation: hak-edge-flash var(--anim-edge-flash-duration, 700ms) ease-out;
}
@keyframes hak-edge-flash {
  0%   { stroke: #d68b54; filter: drop-shadow(0 0 6px rgba(214,139,84,0.6)); }
  100% { /* falls back to inline stroke */ }
}

@media (prefers-reduced-motion: reduce) {
  .hak-puzzle .piece[class*="piece--anim-"],
  .hak-puzzle .piece__edge[class*="piece__edge--anim-"] {
    animation: none !important;
    transition: none !important;
  }
  .hak-puzzle .piece[class*="piece--anim-lift--"],
  .hak-puzzle .piece[class*="piece--anim-scale-up--"],
  .hak-puzzle .piece[class*="piece--anim-scale-down--"] { transform: none; }
}`.trim();function X(e){const i=Y(e),n=Math.min(...i.map(t=>t.x)),o=Math.min(...i.map(t=>t.y)),d=Math.max(...i.map(t=>t.x+t.w)),h=Math.max(...i.map(t=>t.y+t.h)),c=60,p={x:n-c,y:o-c,w:d-n+c*2,h:h-o+c*2};return`// Generated by Hakoniwa.
// Drop this file into any React 18+ project and import the default export:
//
//   import PuzzleExport from './${u(e.name)}.jsx';
//   <PuzzleExport />
//
// No external dependencies beyond React. Hover/click animations are baked in
// via the <style> block below.

import React from 'react';

const PIECES = ${JSON.stringify(i,null,2)};
const VIEWBOX = "${p.x} ${p.y} ${p.w} ${p.h}";
const SIZE = { w: ${p.w}, h: ${p.h} };
const ANIM_CSS = ${JSON.stringify(V)};

export default function PuzzleExport({ width = '100%', height = 'auto', style }) {
  return (
    <svg
      className="hak-puzzle"
      viewBox={VIEWBOX}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', maxWidth: '100%', ...style }}
    >
      <style>{ANIM_CSS}</style>
      {PIECES.map((p) => (
        <Piece key={p.id} piece={p} />
      ))}
    </svg>
  );
}

function Piece({ piece }) {
  const { id, x, y, w, h, label, fill, content, backgrounds, segments, d, animClassName, animStyle, anyEdgeScope } = piece;
  const clipId = 'pcx-' + id.replace(/[^a-zA-Z0-9]/g, '');
  const hasContent = content && (content.text || content.src);
  const hasBgs = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBgs;
  return (
    <g className={('piece ' + (animClassName || '')).trim()} style={animStyle || undefined}>
      {needsClip && (
        <defs>
          <clipPath id={clipId}><path d={d} /></clipPath>
        </defs>
      )}
      <path d={d} className="piece__body" fill={fill || '#1f1d28'} stroke="none" />

      {hasBgs && (
        <g clipPath={\`url(#\${clipId})\`}>
          {backgrounds.map((bg, i) => {
            const fit = bg.fit || 'cover';
            const par = fit === 'cover' ? 'xMidYMid slice'
                      : fit === 'contain' ? 'xMidYMid meet'
                      : fit === 'fill' ? 'none' : 'xMidYMid slice';
            return <image key={i} href={bg.src} x={bg.x} y={bg.y} width={bg.w} height={bg.h} preserveAspectRatio={par} />;
          })}
        </g>
      )}

      {hasContent ? (
        <g clipPath={\`url(#\${clipId})\`}>
          <Content x={x} y={y} w={w} h={h} content={content} />
        </g>
      ) : (!hasBgs && label && (
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central"
          fill="#9d96a8" fontSize={14} fontFamily="system-ui, sans-serif">
          {label}
        </text>
      ))}

      {/* Per-segment edge strokes — one path per edge with its own color /
          opacity / width / animation classes. Edge-scope hover triggers
          require the stroke to receive pointer events; piece-scope ones
          rely on the parent .piece:hover. */}
      <g className="piece__edges" pointerEvents={anyEdgeScope ? 'stroke' : 'none'}>
        {(segments || []).map((seg, i) => {
          const s = seg.style || {};
          const segStyle = { ...(seg.animStyle || {}) };
          return (
            <path
              key={i}
              d={seg.d}
              className={('piece__edge ' + (seg.animClassName || '')).trim()}
              fill="none"
              stroke={s.color || '#423a4f'}
              strokeOpacity={s.opacity != null ? s.opacity : 1}
              strokeWidth={s.strokeWidth != null ? s.strokeWidth : 1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={Object.keys(segStyle).length ? segStyle : undefined}
            />
          );
        })}
      </g>
    </g>
  );
}

function Content({ x, y, w, h, content }) {
  if (content.type === 'image' && content.src) {
    const fit = content.fit || 'cover';
    const par = fit === 'cover' ? 'xMidYMid slice'
              : fit === 'contain' ? 'xMidYMid meet'
              : fit === 'fill' ? 'none'
              : 'xMidYMid meet';
    return <image href={content.src} x={x} y={y} width={w} height={h} preserveAspectRatio={par} />;
  }
  const text = content.text || '';
  const fontSize = content.fontSize || Math.min(w, h) / 8;
  const align = content.align || 'center';
  const color = content.color || '#ede8de';
  const fontWeight = content.fontWeight || 500;
  const PAD = 18;
  const charW = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor((w - PAD * 2) / charW));
  const lines = [];
  for (const para of text.split('\\n')) {
    if (para === '') { lines.push(''); continue; }
    const words = para.split(/\\s+/);
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length <= maxChars) line = next;
      else { if (line) lines.push(line); line = word.length <= maxChars ? word : word.slice(0, maxChars); }
    }
    if (line) lines.push(line);
  }
  const lineH = fontSize * 1.25;
  const startY = y + h / 2 - (lines.length * lineH) / 2 + lineH * 0.7;
  const tx = align === 'left' ? x + PAD : align === 'right' ? x + w - PAD : x + w / 2;
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
  return (
    <text textAnchor={anchor} fill={color} fontSize={fontSize} fontWeight={fontWeight}
      fontFamily="system-ui, sans-serif">
      {lines.map((line, i) => (
        <tspan key={i} x={tx} y={startY + i * lineH}>{line}</tspan>
      ))}
    </text>
  );
}
`}const Z=e=>`# ${e.name||"Puzzle Export"}

Generated by Hakoniwa. A single self-contained React component you can drop into any React 18+ project.

## Install

Copy \`${u(e.name)}.jsx\` into your project. No additional dependencies are required (just React).

## Usage

\`\`\`jsx
import PuzzleExport from './${u(e.name)}.jsx';

export default function App() {
  return (
    <div>
      <PuzzleExport width="100%" />
    </div>
  );
}
\`\`\`

## Props

| Prop     | Type      | Default      | Description                          |
| -------- | --------- | ------------ | ------------------------------------ |
| \`width\`  | number/string | \`'100%'\`     | SVG width attribute.                 |
| \`height\` | number/string | \`'auto'\`     | SVG height attribute.                |
| \`style\`  | object    | —            | Inline style applied to the \`<svg>\`. |

## Notes

- The SVG path geometry is precomputed; the runtime does no math.
- Colors and content (text/images) are baked into the file.
- To re-edit, open the original project JSON in Hakoniwa.
`,q=e=>`# Hakoniwa Export — Module Bundle

This bundle contains everything needed to render and re-edit your puzzle in your own React app.

## Files

\`\`\`
puzzle/                 ← portable rendering module (drop-in)
  PuzzleBoard.jsx       — root SVG component
  PuzzlePiece.jsx       — individual piece
  geometry.js           — pure path math
  effects/              — connector strategies (puzzle, wave, straight)
  index.js              — public API
project.json            — your project data (re-importable into Hakoniwa)
README.md               — this file
${u(e.name)}.jsx       — turn-key wrapper that compiles project.json + renders it
\`\`\`

## Quick start

1. Copy the \`puzzle/\` folder into your project (e.g. \`src/puzzle/\`).
2. Copy \`project.json\` and \`${u(e.name)}.jsx\` next to it.
3. Adjust the import path in \`${u(e.name)}.jsx\` if needed.
4. Use it:

\`\`\`jsx
import Puzzle from './${u(e.name)}.jsx';

export default function App() {
  return <Puzzle />;
}
\`\`\`

## API (puzzle module)

\`\`\`js
import {
  PuzzleBoard,        // <PuzzleBoard pieces={pieces} effect="puzzle" />
  computePiecePath,   // (piece, allPieces, effect, config) → SVG d
  computePieceBbox,   // (piece, allPieces, effect, config) → {minX,minY,maxX,maxY}
  EFFECT_NAMES,       // ['puzzle', 'wave', 'straight']
} from './puzzle';
\`\`\`

The \`puzzle/\` folder has no imports outside itself. It works in any React 18+ project, with no other dependencies.

## Re-editing

Drop \`project.json\` into Hakoniwa (Projects → Import) to continue editing.
`,J=e=>`// Convenience wrapper: imports your project data + renders it with the puzzle module.
import React, { useMemo } from 'react';
import { PuzzleBoard } from './puzzle';
import projectData from './project.json';
import { compileProject } from './compileProject.js';

export default function ${ee(e.name)||"Puzzle"}({ width = '100%' }) {
  const pieces = useMemo(() => compileProject(projectData), []);
  const effect = projectData.edges?.default?.effect ?? 'puzzle';
  const config = projectData.edges?.default?.config;
  return (
    <div style={{ width }}>
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />
    </div>
  );
}
`,Q=`// Standalone compileProject — no imports outside this file.
// Builds piece array from a Project { grid, edges, pieceColors, pieceContent }.
function edgeKey(a, b) { return a < b ? a + '||' + b : b + '||' + a; }

function groupBoundsMap(grid) {
  const map = new Map();
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const id = grid.groups[r][c];
      const b = map.get(id);
      if (!b) map.set(id, { rMin: r, rMax: r, cMin: c, cMax: c });
      else {
        if (r < b.rMin) b.rMin = r; if (r > b.rMax) b.rMax = r;
        if (c < b.cMin) b.cMin = c; if (c > b.cMax) b.cMax = c;
      }
    }
  }
  return map;
}

export function compileProject(project) {
  const { grid, edges, pieceColors = {}, pieceContent = {} } = project;
  const cellSize = grid.cellSize;
  const bounds = groupBoundsMap(grid);
  const pieces = [];
  for (const [id, b] of bounds) {
    pieces.push({
      id,
      x: b.cMin * cellSize, y: b.rMin * cellSize,
      w: (b.cMax - b.cMin + 1) * cellSize, h: (b.rMax - b.rMin + 1) * cellSize,
      label: id.startsWith('g-') ? '#' + id.slice(2) : id.split('-')[0],
      fill: pieceColors[id],
      content: pieceContent[id],
      sides: {}, edgeEffects: {}, edgeEffectConfigs: {},
    });
  }
  // The full edge resolution lives in the puzzle module; for export we let
  // PuzzleBoard receive these pieces and compute paths from neighbors.
  return pieces;
}
`;function u(e){return(e||"puzzle").replace(/[^A-Za-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"puzzle"}function ee(e){return e?e.replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).map(i=>i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join(""):""}function ne(e){const i=u(e.name),n=X(e),o=Z(e),d=v([{name:`${i}.jsx`,content:n},{name:"README.md",content:o}]);k(d,`${i}-component.zip`)}function te(e){const i=u(e.name),n=[];for(const[d,h]of Object.entries(G)){const c=d.replace(/^\.\.\//,"");c.endsWith("CLAUDE.md")||n.push({name:c,content:h})}n.push({name:"project.json",content:JSON.stringify(e,null,2)}),n.push({name:`${i}.jsx`,content:J(e)}),n.push({name:"compileProject.js",content:Q}),n.push({name:"README.md",content:q(e)});const o=v(n);k(o,`${i}-module.zip`)}function oe({project:e,onNav:i}){const{project:n,setName:o,exportCurrent:d}=e,[h,c]=b.useState(!1),[p,t]=b.useState(!1);return n?s.jsxs("div",{className:"page-preview",children:[s.jsx("div",{className:"preview-stage",children:s.jsx("div",{className:"preview-stage__svg",children:s.jsx(C,{project:n,maxSize:620})})}),s.jsxs("aside",{className:"preview-info",children:[s.jsx("div",{className:"preview-info__brand",children:s.jsx(A,{size:"sm"})}),s.jsx("div",{className:"preview-info__export",children:s.jsxs("div",{className:"export-menu",children:[s.jsx("button",{type:"button",className:"action-btn",onClick:()=>t(l=>!l),children:"↓ Export ▾"}),p&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"export-menu__backdrop",onClick:()=>t(!1)}),s.jsxs("div",{className:"export-menu__panel",children:[s.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{d(),t(!1)},children:[s.jsx("strong",{children:"JSON"}),s.jsx("span",{children:"Project file (re-importable)"})]}),s.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{ne(n),t(!1)},children:[s.jsx("strong",{children:"Single-file React"}),s.jsx("span",{children:"One .jsx + README — drop into any React 18+ project"})]}),s.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{te(n),t(!1)},children:[s.jsx("strong",{children:"Module bundle (ZIP)"}),s.jsx("span",{children:"Full puzzle/ folder + project.json + README"})]})]})]})]})}),s.jsx(w,{amplitude:4,height:14}),h?s.jsx("input",{className:"preview-info__name-input",autoFocus:!0,value:n.name??"",onChange:l=>o(l.target.value),onBlur:()=>c(!1),onKeyDown:l=>{l.key==="Enter"&&c(!1)}}):s.jsx("h1",{className:"preview-info__name",onClick:()=>c(!0),children:n.name||"Untitled"}),s.jsxs("p",{className:"preview-info__meta",children:[s.jsxs("span",{children:[n.grid.rows,"×",n.grid.cols," grid"]}),s.jsx("span",{"aria-hidden":!0,children:" · "}),s.jsxs("span",{children:["last edited ",j(n.updatedAt)]})]}),s.jsx(w,{amplitude:4,height:14}),s.jsxs("div",{className:"preview-info__actions",children:[s.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>i("grid"),children:"⊞ Edit grid"}),s.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>i("edit"),children:"✎ Edit pieces"})]}),s.jsx("p",{className:"hint",children:"Edit the grid layout, or open the Edit page to style edges and fill cells with text/images."})]})]}):null}export{oe as default};
