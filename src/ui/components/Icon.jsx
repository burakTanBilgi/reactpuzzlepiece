// Small, dependency-free SVG icon library. Every icon is a 16-unit square,
// drawn with `currentColor` strokes so it inherits the host element's text
// color. Use `<Icon name="merge" />` anywhere — pair with an `aria-hidden`
// host (e.g. inside a button with its own visible text) or pass a `title`
// for screen readers when the icon stands alone.

const VB = '0 0 16 16';

const ICONS = {
  // === Grid actions ===================================================
  merge: (
    <>
      <rect x="2" y="2" width="5" height="5" rx="0.8" />
      <rect x="9" y="2" width="5" height="5" rx="0.8" />
      <rect x="2" y="9" width="5" height="5" rx="0.8" />
      <rect x="9" y="9" width="5" height="5" rx="0.8" />
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.18" />
    </>
  ),
  unmerge: (
    <>
      <rect x="2" y="2" width="12" height="12" rx="1" />
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </>
  ),
  paste: (
    <>
      <rect x="3" y="3" width="10" height="11" rx="1.2" />
      <rect x="5.5" y="1.5" width="5" height="2.5" rx="0.6" fill="currentColor" stroke="none" />
      <line x1="5.5" y1="7.5" x2="10.5" y2="7.5" />
      <line x1="5.5" y1="10" x2="10.5" y2="10" />
    </>
  ),
  upload: (
    <>
      <path d="M8 11 L8 3" />
      <path d="M4.5 6.5 L8 3 L11.5 6.5" />
      <path d="M3 12.5 L3 13.5 Q3 14 3.5 14 L12.5 14 Q13 14 13 13.5 L13 12.5" />
    </>
  ),
  close: (
    <>
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </>
  ),
  trash: (
    <>
      <path d="M3 4.5 L13 4.5" />
      <path d="M6 4.5 L6 3 Q6 2.5 6.5 2.5 L9.5 2.5 Q10 2.5 10 3 L10 4.5" />
      <path d="M4 4.5 L4.6 13 Q4.7 13.7 5.4 13.7 L10.6 13.7 Q11.3 13.7 11.4 13 L12 4.5" />
    </>
  ),
  reset: (
    <>
      <path d="M3 8 A5 5 0 1 0 5.2 4" />
      <path d="M3 2 L3 5 L6 5" />
    </>
  ),

  // === Text alignment =================================================
  'align-left':   (<><line x1="3" y1="4"  x2="13" y2="4" /><line x1="3" y1="8"  x2="9"  y2="8" /><line x1="3" y1="12" x2="11" y2="12" /></>),
  'align-center': (<><line x1="3" y1="4"  x2="13" y2="4" /><line x1="5" y1="8"  x2="11" y2="8" /><line x1="4" y1="12" x2="12" y2="12" /></>),
  'align-right':  (<><line x1="3" y1="4"  x2="13" y2="4" /><line x1="7" y1="8"  x2="13" y2="8" /><line x1="5" y1="12" x2="13" y2="12" /></>),

  // === Connector shape effects ========================================
  // Puzzle: a small interlocking tab between two boxes.
  'eff-puzzle': (
    <>
      <path d="M2 8 L6 8 Q6 5.5 8 5.5 Q10 5.5 10 8 L14 8" />
      <path d="M2 8 L2 13 L14 13 L14 8" />
      <path d="M2 8 L2 3 L14 3 L14 8" />
    </>
  ),
  // Wave: sinuous curve.
  'eff-wave': (
    <path d="M2 8 Q4.5 3.5 7 8 T12 8 T16 8" />
  ),
  // Straight: clean horizontal.
  'eff-straight': (
    <path d="M2 8 L14 8" />
  ),

  // === Cell animation effects =========================================
  // Highlight: a filled rectangle behind a hollow one (the "fill swap").
  'anim-highlight': (
    <>
      <rect x="2" y="2" width="12" height="12" rx="1.5" fill="currentColor" fillOpacity="0.25" stroke="none" />
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
    </>
  ),
  // Lift: an arrow up + ground line.
  'anim-lift': (
    <>
      <rect x="4" y="6" width="8" height="6" rx="1" />
      <path d="M8 6 L8 2" />
      <path d="M5.5 4.5 L8 2 L10.5 4.5" />
    </>
  ),
  // Scale up: small box with outward corner arrows.
  'anim-scale-up': (
    <>
      <rect x="5.5" y="5.5" width="5" height="5" rx="0.8" />
      <path d="M3 3 L5 5 M3 3 L3 5.2 M3 3 L5.2 3" />
      <path d="M13 13 L11 11 M13 13 L13 10.8 M13 13 L10.8 13" />
    </>
  ),
  // Scale down: larger box with inward corner arrows.
  'anim-scale-down': (
    <>
      <rect x="3" y="3" width="10" height="10" rx="1" />
      <path d="M6 6 L8 8 M6 6 L8 6 M6 6 L6 8" />
      <path d="M10 10 L8 8 M10 10 L8 10 M10 10 L10 8" />
    </>
  ),
  // Glow: dot with radiating spokes.
  'anim-glow': (
    <>
      <circle cx="8" cy="8" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="5" strokeDasharray="2 1.5" />
      <line x1="8" y1="1.5" x2="8" y2="3" />
      <line x1="8" y1="13" x2="8" y2="14.5" />
      <line x1="1.5" y1="8" x2="3" y2="8" />
      <line x1="13" y1="8" x2="14.5" y2="8" />
    </>
  ),
  // Pulse: nested concentric circles.
  'anim-pulse': (
    <>
      <circle cx="8" cy="8" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="5" />
      <circle cx="8" cy="8" r="7" strokeOpacity="0.55" />
    </>
  ),

  // === Edge animation effects =========================================
  // Wiggle: zig-zag.
  'anim-wiggle': (
    <path d="M2 8 L5 5 L8 11 L11 5 L14 8" strokeLinejoin="round" />
  ),
  // Thicken: stacked lines (thin → thick).
  'anim-thicken': (
    <>
      <line x1="2" y1="4" x2="14" y2="4" strokeWidth="0.8" />
      <line x1="2" y1="8" x2="14" y2="8" strokeWidth="2" />
      <line x1="2" y1="12" x2="14" y2="12" strokeWidth="3.2" />
    </>
  ),
  // Flash: lightning bolt.
  'anim-flash': (
    <path d="M9 2 L4 9 L7.5 9 L6.5 14 L12 6.5 L8.5 6.5 Z" strokeLinejoin="round" />
  ),

  // === Trigger icons (when an effect fires) ============================
  // Hover: cursor + ripple lines (the same idiom as fx-icon-btn hover).
  'trig-hover': (
    <>
      <path d="M4 2 L4 10 L6.6 7.6 L8.4 11 L9.6 10.5 L7.8 7 L11.2 7 Z" fill="currentColor" stroke="none" />
      <path d="M2 13.5 Q4 12.5 6 13.5 T10 13.5" />
    </>
  ),
  // Click: cursor + radial burst at the tip.
  'trig-click': (
    <>
      <path d="M4 2 L4 10 L6.6 7.6 L8.4 11 L9.6 10.5 L7.8 7 L11.2 7 Z" fill="currentColor" stroke="none" />
      <line x1="12" y1="3" x2="14" y2="1" />
      <line x1="12.5" y1="6" x2="15" y2="6" />
      <line x1="12" y1="9" x2="14" y2="11" />
    </>
  ),
  // Idle: paused / steady — a dashed circle (looping but not yet activated).
  'trig-idle': (
    <>
      <circle cx="8" cy="8" r="5" strokeDasharray="1.5 2" />
      <line x1="6.5" y1="6" x2="6.5" y2="10" strokeWidth="1.6" />
      <line x1="9.5" y1="6" x2="9.5" y2="10" strokeWidth="1.6" />
    </>
  ),
  // Always: filled circle — fires unconditionally.
  'trig-always': (
    <circle cx="8" cy="8" r="4.5" fill="currentColor" stroke="none" />
  ),

  // === Scope icons (where the effect fires from) =======================
  // Cell: rounded square (the whole piece body) with a filled inner square
  // so the icon has visual body, not just an outline.
  'scope-cell': (
    <>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
      <rect x="5.5" y="5.5" width="5" height="5" rx="0.8"
            fill="currentColor" stroke="none" />
    </>
  ),
  // Edge: a single outlined edge.
  'scope-edge': (
    <>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" strokeOpacity="0.35" strokeDasharray="2 1.5" />
      <line x1="2.5" y1="8" x2="13.5" y2="8" strokeWidth="2.2" />
    </>
  ),

  // === Property labels (used as icon-only labels in compact slider rows) ===
  // Color: a stylised paint drop / swatch.
  'prop-color': (
    <>
      <path d="M8 1.8 C 5.4 5.2, 3 7.6, 3 10.2 A 5 5 0 0 0 13 10.2 C 13 7.6, 10.6 5.2, 8 1.8 Z" />
      <circle cx="9.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Opacity: stacked translucent squares (alpha look).
  'prop-opacity': (
    <>
      <rect x="2.5" y="2.5" width="8" height="8" rx="1" strokeOpacity="0.45" />
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" fill="currentColor"
            fillOpacity="0.25" />
    </>
  ),
  // Width: three lines from thin → thick.
  'prop-width': (
    <>
      <line x1="2" y1="4"  x2="14" y2="4"  strokeWidth="0.9" />
      <line x1="2" y1="8"  x2="14" y2="8"  strokeWidth="2" />
      <line x1="2" y1="12" x2="14" y2="12" strokeWidth="3.2" />
    </>
  ),
  // Frequency: tightly packed waves.
  'prop-freq': (
    <>
      <path d="M2 8 Q3.5 5, 5 8 T8 8 T11 8 T14 8" />
    </>
  ),
  // Amplitude: a single tall wave with up/down arrows on its peaks.
  'prop-amp': (
    <>
      <path d="M2 8 Q5 2, 8 8 T14 8" />
      <line x1="5" y1="3.5" x2="5" y2="6" />
      <path d="M3.8 5 L5 3.6 L6.2 5" />
    </>
  ),

  // === Edit-UI mode picker ===========================================
  // 2×2 grid hinting "layout choices".
  'mode-picker': (
    <>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.8" />
      <rect x="9"   y="2.5" width="4.5" height="4.5" rx="0.8" />
      <rect x="2.5" y="9"   width="4.5" height="4.5" rx="0.8" />
      <rect x="9"   y="9"   width="4.5" height="4.5" rx="0.8"
            fill="currentColor" stroke="none" />
    </>
  ),
  // Layers icon — stacked rectangles.
  'layers': (
    <>
      <path d="M8 2 L14 5 L8 8 L2 5 Z" />
      <path d="M2 8 L8 11 L14 8" />
      <path d="M2 11 L8 14 L14 11" />
    </>
  ),

  // === Misc ===========================================================
  'invert': (
    <>
      <path d="M3 6 L10 6 M7 3.5 L10 6 L7 8.5" />
      <path d="M13 10 L6 10 M9 7.5 L6 10 L9 12.5" />
    </>
  ),
  'chevron-down': (
    <path d="M4 6 L8 10 L12 6" strokeLinejoin="round" strokeLinecap="round" />
  ),
  'chevron-right': (
    <path d="M6 4 L10 8 L6 12" strokeLinejoin="round" strokeLinecap="round" />
  ),
};

export default function Icon({ name, size = 14, title, className = '', strokeWidth = 1.4, ...rest }) {
  const glyph = ICONS[name];
  if (!glyph) return null;
  return (
    <svg
      className={`ico ${className}`.trim()}
      width={size}
      height={size}
      viewBox={VB}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {glyph}
    </svg>
  );
}
