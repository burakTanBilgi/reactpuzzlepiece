// Wave effect: pure continuous sine wave along an edge, no knobs.
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
  return pts.slice(1).map(([px, py]) => `L ${px} ${py}`).join(' ');
}

export const waveEffect = {
  name: 'wave',
  displayName: 'Wave',
  defaultConfig: DEFAULT_CONFIG,
  hidesKnobs: true,
  buildSide,
};
