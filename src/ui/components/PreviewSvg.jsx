import { useMemo } from 'react';
import { compileProject } from '../../grid/compile.js';
import { computePieceBbox, computePiecePath } from '../../puzzle';

// Generous padding so outer knobs (KNOB_R=30) and waves (amp up to 40) at the
// top/left edges aren't clipped by the viewBox.
const PAD = 60;

// Read-only SVG thumbnail for a Project. Sized to fit a maxSize box while
// preserving aspect ratio. Mirrors PuzzlePiece's content rendering so the
// preview shows piece colors, text, images, and multi-piece backgrounds.
export default function PreviewSvg({ project, maxSize = 180 }) {
  const { vbX, vbY, vbW, vbH, items } = useMemo(() => {
    if (!project) return { vbX: 0, vbY: 0, vbW: 1, vbH: 1, items: [] };
    const pieces = compileProject(project);
    if (pieces.length === 0) return { vbX: 0, vbY: 0, vbW: 1, vbH: 1, items: [] };

    const defaultEffect = project.edges?.default?.effect ?? 'puzzle';
    const defaultConfig = project.edges?.default?.config;

    const enriched = pieces.map((p) => ({
      ...p,
      d: computePiecePath(p, pieces, defaultEffect, defaultConfig),
      bbox: computePieceBbox(p, pieces, defaultEffect, defaultConfig),
    }));

    const bbox = enriched.reduce(
      (a, p) => ({
        minX: Math.min(a.minX, p.bbox.minX),
        minY: Math.min(a.minY, p.bbox.minY),
        maxX: Math.max(a.maxX, p.bbox.maxX),
        maxY: Math.max(a.maxY, p.bbox.maxY),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );

    return {
      vbX: bbox.minX - PAD,
      vbY: bbox.minY - PAD,
      vbW: bbox.maxX - bbox.minX + PAD * 2,
      vbH: bbox.maxY - bbox.minY + PAD * 2,
      items: enriched,
    };
  }, [project]);

  if (!project || items.length === 0) {
    return <div className="preview-svg preview-svg--empty">empty</div>;
  }

  // Fit into maxSize box.
  const ratio = vbW / vbH;
  const w = ratio >= 1 ? maxSize : maxSize * ratio;
  const h = ratio >= 1 ? maxSize / ratio : maxSize;

  return (
    <svg
      className="preview-svg"
      width={w}
      height={h}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {items.map((p) => {
          const needsClip = (p.backgrounds && p.backgrounds.length > 0) ||
                            (p.content && (p.content.text || p.content.src));
          if (!needsClip) return null;
          return (
            <clipPath key={p.id} id={`pv-clip-${safeId(p.id)}`}>
              <path d={p.d} />
            </clipPath>
          );
        })}
      </defs>

      {items.map((p) => (
        <PreviewPiece key={p.id} piece={p} />
      ))}
    </svg>
  );
}

function PreviewPiece({ piece }) {
  const { id, d, fill, content, backgrounds, x, y, w, h, label } = piece;
  const hasBackgrounds = backgrounds && backgrounds.length > 0;
  const hasContent = !!content && (content.text || content.src);
  const clipUrl = hasBackgrounds || hasContent ? `url(#pv-clip-${safeId(id)})` : undefined;

  return (
    <g>
      <path
        d={d}
        fill={fill || 'var(--surface-2)'}
        stroke="var(--stroke-soft)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {hasBackgrounds && (
        <g clipPath={clipUrl}>
          {backgrounds.map((bg) => (
            <image
              key={bg.id}
              href={bg.src}
              x={bg.x} y={bg.y} width={bg.w} height={bg.h}
              preserveAspectRatio={fitToPar(bg.fit)}
            />
          ))}
        </g>
      )}

      {hasContent && (
        <g clipPath={clipUrl}>
          <PreviewContent x={x} y={y} w={w} h={h} content={content} />
        </g>
      )}

      {!hasContent && !hasBackgrounds && label && (
        <text
          x={x + w / 2} y={y + h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--text-dim)"
          fontSize={Math.max(10, Math.min(w, h) / 8)}
          fontFamily="inherit"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function PreviewContent({ x, y, w, h, content }) {
  if (content.type === 'image' && content.src) {
    return (
      <image
        href={content.src}
        x={x} y={y} width={w} height={h}
        preserveAspectRatio={fitToPar(content.fit)}
      />
    );
  }

  const text = content.text || '';
  const fontSize = content.fontSize || Math.min(w, h) / 8;
  const align = content.align || 'center';
  const color = content.color || 'var(--text)';
  const fontWeight = content.fontWeight || 500;
  const PADX = 18;
  const lines = wrapText(text, w - PADX * 2, fontSize);
  const lineH = fontSize * 1.25;
  const startY = y + h / 2 - (lines.length * lineH) / 2 + lineH * 0.7;
  const tx = align === 'left' ? x + PADX : align === 'right' ? x + w - PADX : x + w / 2;
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';

  return (
    <text
      textAnchor={anchor}
      fill={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily="inherit"
    >
      {lines.map((line, i) => (
        <tspan key={i} x={tx} y={startY + i * lineH}>{line}</tspan>
      ))}
    </text>
  );
}

function fitToPar(fit) {
  if (fit === 'cover')   return 'xMidYMid slice';
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice';
}

// Greedy word wrap mirroring PuzzlePiece for visual parity.
function wrapText(text, maxWidth, fontSize) {
  const charW = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor(maxWidth / charW));
  const out = [];
  for (const para of text.split('\n')) {
    if (para === '') { out.push(''); continue; }
    const words = para.split(/\s+/);
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length <= maxChars) line = next;
      else { if (line) out.push(line); line = word.length <= maxChars ? word : word.slice(0, maxChars); }
    }
    if (line) out.push(line);
  }
  return out;
}

// SVG ids must be valid attribute values; strip anything sketchy from groupIds.
function safeId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '_');
}
