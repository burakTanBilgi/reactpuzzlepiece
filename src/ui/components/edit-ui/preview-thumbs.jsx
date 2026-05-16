// Tiny SVG mockups used in the EditModePicker popover to give each
// mode option a glanceable thumbnail. Pure presentational — no props,
// no state. ~60×40 viewbox, line-art only.

export function ThumbCanvas() {
  return (
    <svg className="mode-thumb" viewBox="0 0 60 40" aria-hidden="true">
      <rect x="0.5" y="0.5" width="59" height="39" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      {/* tiny nav rail on the left */}
      <rect x="2" y="2" width="6" height="36" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="5" cy="6"  r="1.2" fill="currentColor" />
      <circle cx="5" cy="11" r="1.2" fill="currentColor" />
      {/* canvas pieces */}
      <rect x="14" y="8"  width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="30" y="8"  width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="14" y="20" width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="30" y="20" width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      {/* popover */}
      <rect x="46" y="6" width="12" height="14" rx="1.5" fill="currentColor" fillOpacity="0.5" />
      <line x1="40" y1="14" x2="46" y2="14" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="1 1" />
    </svg>
  );
}

export function ThumbLayers() {
  return (
    <svg className="mode-thumb" viewBox="0 0 60 40" aria-hidden="true">
      <rect x="0.5" y="0.5" width="59" height="39" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      {/* layers panel */}
      <rect x="2" y="2" width="22" height="36" rx="1.5" fill="currentColor" fillOpacity="0.12" />
      <line x1="5" y1="7"  x2="22" y2="7"  stroke="currentColor" strokeOpacity="0.6" />
      <line x1="7" y1="11" x2="22" y2="11" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="7" y1="15" x2="22" y2="15" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.6" />
      <line x1="5" y1="19" x2="22" y2="19" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="7" y1="23" x2="22" y2="23" stroke="currentColor" strokeOpacity="0.4" />
      {/* properties pane */}
      <rect x="26" y="2"  width="32" height="36" rx="1.5" fill="currentColor" fillOpacity="0.05" />
      <rect x="28" y="6"  width="14" height="6" rx="0.8" fill="currentColor" fillOpacity="0.3" />
      <rect x="28" y="15" width="28" height="3" rx="0.8" fill="currentColor" fillOpacity="0.25" />
      <rect x="28" y="21" width="28" height="3" rx="0.8" fill="currentColor" fillOpacity="0.25" />
      <rect x="28" y="27" width="28" height="3" rx="0.8" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

export function ThumbFlat() {
  return (
    <svg className="mode-thumb" viewBox="0 0 60 40" aria-hidden="true">
      <rect x="0.5" y="0.5" width="59" height="39" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="2" y="2" width="22" height="36" rx="1.5" fill="currentColor" fillOpacity="0.12" />
      {/* flat rows */}
      <rect x="4" y="5"  width="18" height="4" rx="0.6" fill="currentColor" fillOpacity="0.3" />
      <rect x="4" y="12" width="18" height="4" rx="0.6" fill="currentColor" fillOpacity="0.3" />
      <rect x="4" y="19" width="18" height="4" rx="0.6" fill="currentColor" fillOpacity="0.3" />
      <rect x="4" y="26" width="18" height="4" rx="0.6" fill="currentColor" fillOpacity="0.3" />
      {/* canvas */}
      <rect x="28" y="6"  width="28" height="28" rx="1.5" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

export function ThumbModes() {
  return (
    <svg className="mode-thumb" viewBox="0 0 60 40" aria-hidden="true">
      <rect x="0.5" y="0.5" width="59" height="39" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      {/* mode strip on top */}
      <rect x="2" y="2" width="22" height="6" rx="1" fill="currentColor" fillOpacity="0.25" />
      <line x1="7"  y1="2" x2="7"  y2="8" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="17" y1="2" x2="17" y2="8" stroke="currentColor" strokeOpacity="0.4" />
      {/* simple panel */}
      <rect x="2"  y="11" width="22" height="27" rx="1.5" fill="currentColor" fillOpacity="0.1" />
      <rect x="28" y="6"  width="28" height="28" rx="1.5" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}
