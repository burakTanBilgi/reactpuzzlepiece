// Shared constants for the Edges panel sub-components.

// Wave defaults applied when a card flips to wave for the first time.
export const DEFAULT_WAVE = { frequency: 0.025, amplitude: 12, phase: 0 };

// Sentinel that marks "this property has different values across the
// multi-edge selection" — surfaces in the UI as a 'mixed' chip / placeholder.
export const MIXED = '__mixed__';

export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
