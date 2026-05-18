import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SliderRow from '../../../../src/ui/components/SliderRow.jsx';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

describe('SliderRow', () => {
  it('renders a slider + typeable input in normal (non-tiles) mode', () => {
    renderWithTiles(
      <SliderRow label="Opacity" min={0} max={1} step={0.01} value={0.5} onChange={() => {}} />
    );
    // Range input is the draggable slider.
    expect(screen.getByRole('slider')).toBeInTheDocument();
    // Text input shows the current value (the formatter is optional;
    // without one, value is stringified verbatim).
    expect(screen.getByRole('textbox')).toHaveValue('0.5');
  });

  it('calls onChange with the new number when the slider moves', () => {
    const onChange = vi.fn();
    renderWithTiles(
      <SliderRow label="Opacity" min={0} max={1} step={0.01} value={0.5} onChange={onChange} />
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '0.75' } });
    expect(onChange).toHaveBeenCalledWith(0.75);
  });

  it('renders 5 preset tiles instead of a slider when tiles=true', () => {
    renderWithTiles(
      <SliderRow label="Width" min={0} max={10} step={0.25} value={2.5} onChange={() => {}} />,
      { tiles: true }
    );
    // No slider in tile mode.
    expect(screen.queryByRole('slider')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
    // 5 preset buttons, each titled with its value.
    const tiles = screen.getAllByRole('button');
    expect(tiles).toHaveLength(5);
  });

  it('clicking a tile calls onChange with that preset value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTiles(
      <SliderRow label="Width" min={0} max={10} step={0.25} value={0} onChange={onChange} />,
      { tiles: true }
    );
    const tiles = screen.getAllByRole('button');
    // 5 evenly-spaced presets across [0, 10] = 0, 2.5, 5, 7.5, 10.
    // Click the middle tile (index 2) → onChange(5).
    await user.click(tiles[2]);
    expect(onChange).toHaveBeenCalledWith(5);
  });
});
