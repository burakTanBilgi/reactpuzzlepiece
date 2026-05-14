// Image-fit modes shared by ContentPanel (per-piece images) and
// BackgroundsPanel (multi-piece backgrounds). Single source of truth so the
// label/hint copy can't drift between panels.
export const FIT_OPTIONS = [
  { value: 'cover',   label: 'Cover',   hint: 'Fill, may crop' },
  { value: 'contain', label: 'Contain', hint: 'Fit whole image' },
  { value: 'fill',    label: 'Stretch', hint: 'Stretch to bounds' },
];
