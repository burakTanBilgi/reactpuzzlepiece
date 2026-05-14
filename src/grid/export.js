// Export options for a Project:
//   - exportJSON          (project state, see file-io.js)
//   - exportSingleFileJSX (one self-contained .jsx — drop into any React 18+ project)
//   - exportModuleZip     (full puzzle module + README + project.json)

import { compileProject } from './compile.js';
import { computePiecePath, computeSideSegments } from '../puzzle/geometry.js';
import { cellEffectAttrs, edgeEffectAttrs } from '../puzzle/effect-attrs.js';
import { makeZip } from './zip.js';

const SIDES = ['top', 'right', 'bottom', 'left'];

// Vite reads these as raw text at build time so they ship inside the app.
const PUZZLE_SOURCES = import.meta.glob('../puzzle/**/*.{js,jsx,css,md}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Pre-compile a project into renderable pieces with paths baked in. The single
// file emits this snapshot — runtime needs no math.
function snapshot(project) {
  const pieces = compileProject(project);
  const effect = project.edges?.default?.effect ?? 'puzzle';
  const config = project.edges?.default?.config ?? null;
  return pieces.map((p) => {
    const cellAttrs = cellEffectAttrs(p.cellEffects);
    const segs = SIDES.flatMap((side) =>
      computeSideSegments(p, pieces, side, effect, config)
    ).map((seg) => {
      const ea = edgeEffectAttrs(seg.style?.effects);
      return {
        d: seg.d,
        style: seg.style ? {
          color: seg.style.color ?? null,
          opacity: seg.style.opacity ?? null,
          strokeWidth: seg.style.strokeWidth ?? null,
        } : null,
        animClassName: ea.className,
        animStyle: ea.style ?? null,
        hasEdgeScope: ea.hasEdgeScope,
      };
    });
    return {
      id: p.id,
      x: p.x, y: p.y, w: p.w, h: p.h,
      label: p.label,
      fill: p.fill ?? null,
      content: p.content ?? null,
      backgrounds: p.backgrounds ?? null,
      animClassName: cellAttrs.className,
      animStyle: cellAttrs.style ?? null,
      d: computePiecePath(p, pieces, effect, config),
      // Flag the deployed `<g class="piece__edges">` to receive stroke
      // pointer events when ANY segment uses an edge-scope effect — same
      // logic as the studio renderer.
      anyEdgeScope: segs.some((s) => s.hasEdgeScope),
      segments: segs,
    };
  });
}

// CSS rules baked into the single-file JSX export so the deployed puzzle
// carries the same v2 hover/click/idle/always behaviour as the studio.
// Self-contained: no external CSS vars, brand colours inlined. Mirrors the
// catalogue in src/puzzle/effects-catalog.js + puzzle/PuzzleBoard.css.
const EXPORT_ANIM_CSS = `
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
}`.trim();

// Build a single self-contained .jsx file. No imports beyond React.
function buildSingleFile(project) {
  const data = snapshot(project);
  const minX = Math.min(...data.map((p) => p.x));
  const minY = Math.min(...data.map((p) => p.y));
  const maxX = Math.max(...data.map((p) => p.x + p.w));
  const maxY = Math.max(...data.map((p) => p.y + p.h));
  const PAD = 60;
  const vb = {
    x: minX - PAD,
    y: minY - PAD,
    w: maxX - minX + PAD * 2,
    h: maxY - minY + PAD * 2,
  };

  return `// Generated by Hakoniwa.
// Drop this file into any React 18+ project and import the default export:
//
//   import PuzzleExport from './${safeName(project.name)}.jsx';
//   <PuzzleExport />
//
// No external dependencies beyond React. Hover/click animations are baked in
// via the <style> block below.

import React from 'react';

const PIECES = ${JSON.stringify(data, null, 2)};
const VIEWBOX = "${vb.x} ${vb.y} ${vb.w} ${vb.h}";
const SIZE = { w: ${vb.w}, h: ${vb.h} };
const ANIM_CSS = ${JSON.stringify(EXPORT_ANIM_CSS)};

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
`;
}

const SINGLE_FILE_README = (project) => `# ${project.name || 'Puzzle Export'}

Generated by Hakoniwa. A single self-contained React component you can drop into any React 18+ project.

## Install

Copy \`${safeName(project.name)}.jsx\` into your project. No additional dependencies are required (just React).

## Usage

\`\`\`jsx
import PuzzleExport from './${safeName(project.name)}.jsx';

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
`;

const MODULE_README = (project) => `# Hakoniwa Export — Module Bundle

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
${safeName(project.name)}.jsx       — turn-key wrapper that compiles project.json + renders it
\`\`\`

## Quick start

1. Copy the \`puzzle/\` folder into your project (e.g. \`src/puzzle/\`).
2. Copy \`project.json\` and \`${safeName(project.name)}.jsx\` next to it.
3. Adjust the import path in \`${safeName(project.name)}.jsx\` if needed.
4. Use it:

\`\`\`jsx
import Puzzle from './${safeName(project.name)}.jsx';

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
`;

const MODULE_WRAPPER = (project) => `// Convenience wrapper: imports your project data + renders it with the puzzle module.
import React, { useMemo } from 'react';
import { PuzzleBoard } from './puzzle';
import projectData from './project.json';
import { compileProject } from './compileProject.js';

export default function ${pascalCase(project.name) || 'Puzzle'}({ width = '100%' }) {
  const pieces = useMemo(() => compileProject(projectData), []);
  const effect = projectData.edges?.default?.effect ?? 'puzzle';
  const config = projectData.edges?.default?.config;
  return (
    <div style={{ width }}>
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />
    </div>
  );
}
`;

// We also need a tiny standalone compileProject for the wrapper. We bundle a
// trimmed copy that depends only on grid.js helpers.
const COMPILE_PROJECT_STANDALONE = `// Standalone compileProject — no imports outside this file.
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
`;

function safeName(name) {
  return (name || 'puzzle').replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'puzzle';
}

function pascalCase(name) {
  if (!name) return '';
  return name.replace(/[^A-Za-z0-9]+/g, ' ').trim().split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

// --- Public API --------------------------------------------------------------

export function exportSingleFileJSX(project) {
  const name = safeName(project.name);
  const jsx = buildSingleFile(project);
  const readme = SINGLE_FILE_README(project);

  // Two files in one ZIP: the .jsx and a README.md.
  const blob = makeZip([
    { name: `${name}.jsx`, content: jsx },
    { name: 'README.md', content: readme },
  ]);
  downloadBlob(blob, `${name}-component.zip`);
}

export function exportModuleZip(project) {
  const name = safeName(project.name);

  // Bundle every file from src/puzzle/ as raw source.
  const files = [];
  for (const [path, source] of Object.entries(PUZZLE_SOURCES)) {
    // path like '../puzzle/foo/bar.js' → 'puzzle/foo/bar.js'
    const rel = path.replace(/^\.\.\//, '');
    if (rel.endsWith('CLAUDE.md')) continue; // omit dev-only docs
    files.push({ name: rel, content: source });
  }

  files.push({ name: 'project.json', content: JSON.stringify(project, null, 2) });
  files.push({ name: `${name}.jsx`, content: MODULE_WRAPPER(project) });
  files.push({ name: 'compileProject.js', content: COMPILE_PROJECT_STANDALONE });
  files.push({ name: 'README.md', content: MODULE_README(project) });

  const blob = makeZip(files);
  downloadBlob(blob, `${name}-module.zip`);
}
