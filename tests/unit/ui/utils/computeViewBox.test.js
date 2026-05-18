import { describe, expect, it } from 'vitest';
import { compileProject } from '../../../../src/grid/compile.js';
import { computeViewBox, VIEWBOX_PAD } from '../../../../src/ui/utils/computeViewBox.js';
import { project2x2 } from '../../../helpers/fixtures.js';

describe('computeViewBox', () => {
  it('returns a 1×1 viewBox when no pieces are provided', () => {
    expect(computeViewBox([], 'puzzle', {})).toEqual({ x: 0, y: 0, w: 1, h: 1 });
  });

  it('pads the snug bbox by VIEWBOX_PAD on every side by default', () => {
    const p = project2x2();
    const pieces = compileProject(p);
    const cellSize = p.grid.cellSize;
    const box = computeViewBox(pieces, 'straight', {});
    // The straight effect doesn't add knob/wave overhang, so the snug bbox
    // is just the grid extent: 0..2*cellSize in both axes.
    // Padding adds VIEWBOX_PAD on each side.
    expect(box.x).toBeLessThanOrEqual(-VIEWBOX_PAD);
    expect(box.y).toBeLessThanOrEqual(-VIEWBOX_PAD);
    expect(box.w).toBeGreaterThanOrEqual(2 * cellSize + 2 * VIEWBOX_PAD);
    expect(box.h).toBeGreaterThanOrEqual(2 * cellSize + 2 * VIEWBOX_PAD);
  });

  it('a custom pad shrinks the viewBox accordingly', () => {
    const p = project2x2();
    const pieces = compileProject(p);
    const wide = computeViewBox(pieces, 'straight', {}, VIEWBOX_PAD);
    const tight = computeViewBox(pieces, 'straight', {}, 0);
    expect(wide.w).toBe(tight.w + 2 * VIEWBOX_PAD);
    expect(wide.h).toBe(tight.h + 2 * VIEWBOX_PAD);
  });
});
