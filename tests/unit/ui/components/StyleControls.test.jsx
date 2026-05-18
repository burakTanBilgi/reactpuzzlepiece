import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StyleControls from '../../../../src/ui/components/edges/StyleControls.jsx';
import { MIXED } from '../../../../src/ui/components/edges/constants.js';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

describe('StyleControls — Color row', () => {
  it('shows the "theme" hint when no color is set', () => {
    renderWithTiles(<StyleControls config={{}} onPatchConfig={() => {}} />);
    expect(screen.getByText(/^theme$/i)).toBeInTheDocument();
  });

  it('shows the "mixed" hint when color is MIXED', () => {
    renderWithTiles(<StyleControls config={{ color: MIXED }} onPatchConfig={() => {}} />);
    expect(screen.getByText(/^mixed$/i)).toBeInTheDocument();
  });

  it('renders a swatch button labelled with the current colour', () => {
    renderWithTiles(<StyleControls config={{ color: '#abcdef' }} onPatchConfig={() => {}} />);
    expect(screen.getByRole('button', { name: /stroke color #abcdef/i })).toBeInTheDocument();
  });

  it('renders a "Pick stroke color" swatch button when no color is set', () => {
    renderWithTiles(<StyleControls config={{}} onPatchConfig={() => {}} />);
    expect(screen.getByRole('button', { name: /pick stroke color/i })).toBeInTheDocument();
  });

  it('exposes a "reset color" button when a color is explicitly set', () => {
    renderWithTiles(<StyleControls config={{ color: '#abc999' }} onPatchConfig={() => {}} />);
    expect(screen.getAllByRole('button', { name: /reset color/i }).length).toBeGreaterThan(0);
  });

  it('clicking the swatch opens the picker popover', async () => {
    const user = userEvent.setup();
    renderWithTiles(<StyleControls config={{ color: '#abcdef' }} onPatchConfig={() => {}} />);
    await user.click(screen.getByRole('button', { name: /stroke color #abcdef/i }));
    expect(screen.getByRole('dialog', { name: /pick a color/i })).toBeInTheDocument();
  });

  it('typing a valid hex into the popover input calls onPatchConfig with that color', async () => {
    const user = userEvent.setup();
    const onPatchConfig = vi.fn();
    renderWithTiles(<StyleControls config={{ color: '#abcdef' }} onPatchConfig={onPatchConfig} />);
    await user.click(screen.getByRole('button', { name: /stroke color #abcdef/i }));
    const hexInput = screen.getByPlaceholderText(/#rrggbb/i);
    fireEvent.change(hexInput, { target: { value: '#123456' } });
    expect(onPatchConfig).toHaveBeenCalledWith({ color: '#123456' });
  });

  it('reset button clears the color via onPatchConfig({ color: undefined })', async () => {
    const user = userEvent.setup();
    const onPatchConfig = vi.fn();
    renderWithTiles(<StyleControls config={{ color: '#abcdef' }} onPatchConfig={onPatchConfig} />);
    // Click the inline reset button (the one next to the swatch row).
    const resets = screen.getAllByRole('button', { name: /reset color/i });
    await user.click(resets[0]);
    expect(onPatchConfig).toHaveBeenCalledWith({ color: undefined });
  });
});

describe('StyleControls — sliders', () => {
  it('renders Opacity + Width sliders by default', () => {
    renderWithTiles(<StyleControls config={{ opacity: 0.5, strokeWidth: 2 }} onPatchConfig={() => {}} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('moving the opacity slider patches via opacity key', () => {
    const onPatchConfig = vi.fn();
    renderWithTiles(<StyleControls config={{}} onPatchConfig={onPatchConfig} />);
    const [opacity] = screen.getAllByRole('slider');
    fireEvent.change(opacity, { target: { value: '0.4' } });
    expect(onPatchConfig).toHaveBeenCalledWith({ opacity: 0.4 });
  });
});
