// Centralised id generation. Replaces three independent `let _gid = 0`
// globals previously sprinkled across grid.js, import.js, browser-storage.js.
//
// Each id format below matches the format the corresponding consumer was
// already producing — pure refactor, no on-disk schema change.

export function idFactory(prefix) {
  let n = 0;
  return () => `${prefix}-${++n}`;
}

// g-1, g-2, ...  — fresh / split groups inside grid.js.
export const nextGroupId = idFactory('g');

// g-im-{timestamp}-N  — imported groups (CSV/TSV). Timestamp namespaces each
// import session so ids stay visually distinct from runtime-merged groups.
let _imSeq = 0;
export function nextImportId() {
  return `g-im-${Date.now().toString(36)}-${++_imSeq}`;
}

// p-{timestamp}-N  — project ids; the counter keeps them unique even when
// several projects are created in the same millisecond.
let _pSeq = 0;
export function nextProjectId() {
  return `p-${Date.now().toString(36)}-${++_pSeq}`;
}

// bg-{timestamp}-{rand}  — background ids; random suffix keeps fast-fire
// uploads (paste loops) from colliding without needing a counter.
export function nextBgId() {
  return `bg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
