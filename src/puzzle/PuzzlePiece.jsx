import { KNOB_R, TAB, computeActiveKnobs, computeSideSegments, knobHitCenter } from './geometry.js';

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
  const { id, x, y, w, h, label, fill, content, backgrounds } = piece;
  const knobs = computeActiveKnobs(piece, allPieces, effect);
  const clipId = `pc-clip-${id}`;
  const maskId = `pc-mask-${id}`;
  const hasContent = !!content && (content.text || content.src);
  const hasBackgrounds = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBackgrounds;

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
      className={`piece ${isHovered ? 'piece--hover' : ''} ${isSelected ? 'piece--selected' : ''}`}
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
                key={`ko-${seg.pairKey}-${i}`}
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
      <g {...(hasKnockout ? { mask: `url(#${maskId})` } : null)}>
        {/* Body: fill only — the visible stroke comes from per-segment paths
            rendered on top, so each edge can be styled independently. */}
        <path d={path} className="piece__body" style={fill ? { fill } : undefined} />

        {hasBackgrounds && (
          <g clipPath={`url(#${clipId})`} pointerEvents="none">
            {backgrounds.map((bg) => (
              <BackgroundImage key={bg.id} bg={bg} />
            ))}
          </g>
        )}

        {hasContent && (
          <g clipPath={`url(#${clipId})`} pointerEvents="none">
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
          mask above is what creates the visible transparent strip. */}
      <g className="piece__edges" pointerEvents="none">
        {segments.map((seg, i) => {
          const s = seg.style;
          const style = s ? {
            ...(s.color != null       ? { stroke: s.color } : null),
            ...(s.opacity != null     ? { strokeOpacity: s.opacity } : null),
            ...(s.strokeWidth != null ? { strokeWidth: s.strokeWidth } : null),
          } : undefined;
          return (
            <path
              key={`${seg.pairKey}-${i}`}
              d={seg.d}
              className="piece__edge"
              style={style}
            />
          );
        })}
      </g>

      {onKnobClick &&
        knobs
          .filter((k) => k.type === TAB)
          .map((k) => {
            const { hx, hy } = knobHitCenter(k.side, k.cx, k.cy);
            return (
              <circle
                key={`${k.side}-${k.pos}`}
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
// the SVG `preserveAspectRatio` attribute:
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
  for (const para of text.split('\n')) {
    if (para === '') { out.push(''); continue; }
    const words = para.split(/\s+/);
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
