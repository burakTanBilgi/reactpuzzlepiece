// Effect catalogue — single source of truth for the studio panels, the
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
//              `cssVar` is the CSS custom property the renderer writes
//              (e.g. '--anim-lift-distance'). `unit` (optional) suffixes
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

export const EDGE_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {},
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    config: {
      radius: { default: 4, min: 1, max: 16, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-edge-glow-radius' },
    },
  },
  wiggle: {
    label: 'Wiggle',
    group: 'transform',
    triggers: ['hover', 'click'],
    defaultTrigger: 'hover',
    config: {
      intensity: { default: 0.6, min: 0.1, max: 2.5, step: 0.1, label: 'Intensity', unit: 'px', cssVar: '--anim-edge-wiggle-intensity' },
    },
  },
  thicken: {
    label: 'Thicken',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      width: { default: 3.5, min: 1.5, max: 8, step: 0.25, label: 'Width', unit: 'px', cssVar: '--anim-edge-thicken-width' },
    },
  },
  flash: {
    label: 'Flash',
    group: 'animate',
    triggers: ['hover', 'click'],
    defaultTrigger: 'click',
    config: {
      duration: { default: 700, min: 100, max: 2000, step: 50, label: 'Duration', unit: 'ms', cssVar: '--anim-edge-flash-duration' },
    },
  },
};

// Stable id arrays — used to render chip rows in a deterministic order.
export const CELL_EFFECT_IDS = Object.keys(CELL_EFFECTS);
export const EDGE_EFFECT_IDS = Object.keys(EDGE_EFFECTS);

// Build a fresh effect entry from the catalogue with default trigger + config.
// Used by the picker when the user clicks a chip to add an effect.
export function makeEffectEntry(catalogue, id, trigger) {
  const def = catalogue[id];
  if (!def) return null;
  const t = trigger ?? def.defaultTrigger ?? def.triggers[0];
  const config = {};
  for (const [field, schema] of Object.entries(def.config || {})) {
    config[field] = schema.default;
  }
  return { id, trigger: t, config };
}

// Compose the unique key for an entry under (id, trigger). Same id with
// different triggers are independent entries that compose.
export function effectKey(id, trigger) {
  return `${id}:${trigger}`;
}
