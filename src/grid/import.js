// Build a project grid from spreadsheet-style data (CSV/TSV/paste).
// Each non-empty cell becomes a piece with text content.
// Optionally auto-merges horizontal runs: a non-empty cell extends rightward
// over consecutive empty cells until the next non-empty cell.

import { clampGridSize, DEFAULT_CELL_SIZE, MAX_GRID } from './grid.js';

let _gid = 0;
const nextId = () => `g-im-${Date.now().toString(36)}-${++_gid}`;

// Parse text into a 2D string array. Auto-detects TSV (any tabs in first
// non-empty line) vs CSV (with quoted-field handling).
export function parseTable(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  // Trim trailing fully-empty lines.
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  if (lines.length === 0) return [];

  const isTSV = lines.some((l) => l.includes('\t'));
  const rows = isTSV
    ? lines.map((l) => l.split('\t'))
    : lines.map(parseCsvLine);

  // Pad to uniform width.
  const cols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  for (const r of rows) while (r.length < cols) r.push('');
  return rows.map((r) => r.map((c) => c.trim()));
}

// Minimal RFC-4180 CSV line parser (handles quoted commas, doubled-quote escape).
function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = false;
      } else cur += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') { out.push(cur); cur = ''; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

// Convert a 2D table → { grid, pieceContent }.
//   { autoMerge: true } extends each non-empty cell rightward over the empty
//   cells that follow, producing a more layout-like result (recommended for
//   spreadsheet pastes).
export function tableToProject(table, { autoMerge = true, cellSize = DEFAULT_CELL_SIZE } = {}) {
  const rows = clampGridSize(table.length);
  const cols = clampGridSize(table[0]?.length ?? 1);

  // Each cell starts as its own group.
  const groups = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => `r${r}c${c}-${nextId()}`)
  );

  const pieceContent = {};

  for (let r = 0; r < rows; r++) {
    let c = 0;
    while (c < cols) {
      const value = table[r]?.[c] ?? '';
      if (value === '') { c++; continue; }

      let endC = c;
      if (autoMerge) {
        while (endC + 1 < cols && (table[r]?.[endC + 1] ?? '') === '') endC++;
      }

      // Merge cells [r, c..endC] into one group.
      const id = groups[r][c];
      for (let k = c + 1; k <= endC; k++) groups[r][k] = id;
      pieceContent[id] = { type: 'text', text: value };
      c = endC + 1;
    }
  }

  return {
    grid: { rows, cols, cellSize, groups },
    pieceContent,
  };
}

// Convenience: parse + convert in one go.
export function importTableText(text, opts) {
  const table = parseTable(text);
  if (table.length === 0) throw new Error('No data found in input');
  if (table.length > MAX_GRID || table[0].length > MAX_GRID) {
    throw new Error(`Grid too large (max ${MAX_GRID}×${MAX_GRID}). Got ${table.length}×${table[0].length}.`);
  }
  return tableToProject(table, opts);
}
