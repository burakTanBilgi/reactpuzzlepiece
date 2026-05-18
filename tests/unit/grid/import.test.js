import { describe, expect, it } from 'vitest';
import {
  importTableText,
  parseTable,
  tableToProject,
} from '../../../src/grid/import.js';

describe('parseTable', () => {
  it('parses tab-separated input into a 2D string array', () => {
    const tsv = 'A\tB\tC\n1\t2\t3';
    expect(parseTable(tsv)).toEqual([
      ['A', 'B', 'C'],
      ['1', '2', '3'],
    ]);
  });

  it('parses CSV with quoted fields containing commas', () => {
    const csv = '"Hello, world",bare\n"two, also",x';
    const out = parseTable(csv);
    expect(out[0]).toEqual(['Hello, world', 'bare']);
    expect(out[1]).toEqual(['two, also', 'x']);
  });

  it('auto-detects TSV when any line contains a tab', () => {
    // Mixing tabs into the input flips parseTable into TSV mode; the
    // quoted comma is no longer treated as a quote delimiter.
    const mixed = 'a\tb\n"with, comma"\tc';
    const out = parseTable(mixed);
    expect(out[0]).toEqual(['a', 'b']);
    expect(out[1]).toEqual(['"with, comma"', 'c']);
  });

  it('pads rows to uniform width', () => {
    const csv = 'a,b,c\nx';
    const out = parseTable(csv);
    expect(out[1]).toEqual(['x', '', '']);
  });

  it('trims trailing empty lines', () => {
    const csv = 'a,b\n\n\n';
    expect(parseTable(csv)).toEqual([['a', 'b']]);
  });

  it('returns an empty array for whitespace-only input', () => {
    expect(parseTable('   ')).toEqual([]);
  });
});

describe('tableToProject — auto-merge horizontal runs', () => {
  it('extends a non-empty cell over trailing empty cells in the same row', () => {
    const table = [
      ['title', '', '', 'tag'],
    ];
    const { grid, pieceContent } = tableToProject(table, { autoMerge: true });

    // The first three cells should share a group id (merged).
    expect(grid.groups[0][0]).toBe(grid.groups[0][1]);
    expect(grid.groups[0][1]).toBe(grid.groups[0][2]);
    // The "tag" cell stays its own group.
    expect(grid.groups[0][3]).not.toBe(grid.groups[0][0]);

    // Each merged group's anchor carries the text content.
    expect(pieceContent[grid.groups[0][0]]).toEqual({ type: 'text', text: 'title' });
    expect(pieceContent[grid.groups[0][3]]).toEqual({ type: 'text', text: 'tag' });
  });

  it('keeps cells as their own groups when autoMerge is false', () => {
    const table = [
      ['title', '', '', 'tag'],
    ];
    const { grid } = tableToProject(table, { autoMerge: false });
    expect(grid.groups[0][0]).not.toBe(grid.groups[0][1]);
    expect(grid.groups[0][1]).not.toBe(grid.groups[0][2]);
  });
});

describe('importTableText (parseTable + tableToProject convenience wrapper)', () => {
  it('parses a small spreadsheet paste into a project grid', () => {
    const tsv = 'Logo\t\t\tSign in\nHero\t\t\t';
    const { grid, pieceContent } = importTableText(tsv, { autoMerge: true });
    expect(grid.rows).toBe(2);
    expect(grid.cols).toBe(4);
    // "Logo" anchors a 3-cell merged group.
    const logoId = grid.groups[0][0];
    expect(grid.groups[0][1]).toBe(logoId);
    expect(grid.groups[0][2]).toBe(logoId);
    expect(pieceContent[logoId].text).toBe('Logo');
  });

  it('throws on empty input', () => {
    expect(() => importTableText('')).toThrowError(/no data found/i);
  });

  it('throws when the grid exceeds MAX_GRID', () => {
    // 51 cols (each value = "a"), one row.
    const bigRow = Array.from({ length: 51 }, () => 'a').join(',');
    expect(() => importTableText(bigRow)).toThrowError(/grid too large/i);
  });
});
