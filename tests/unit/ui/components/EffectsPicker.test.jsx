import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EffectsPicker from '../../../../src/ui/components/interactions/EffectsPicker.jsx';
import { CELL_EFFECTS } from '../../../../src/puzzle';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

// Helper: count picker-list buttons. The picker-split renders one chip
// button per catalog entry plus an optional "remove" link inside the
// editor; we filter by the chip-pick class so only catalog buttons match.
function pickerButtons() {
  return Array.from(document.querySelectorAll('.chip--pick'));
}

describe('EffectsPicker (cell catalogue)', () => {
  it('renders one picker chip per catalog effect', () => {
    renderWithTiles(
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={{}}
        inheritedEffects={{}}
        onChange={() => {}}
      />
    );
    expect(pickerButtons()).toHaveLength(Object.keys(CELL_EFFECTS).length);
  });

  it('shows an empty-state hint when nothing is active', () => {
    renderWithTiles(
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={{}}
        inheritedEffects={{}}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/pick an effect to add it/i)).toBeInTheDocument();
  });

  it('clicking an inactive chip adds the effect with its default trigger', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTiles(
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={{}}
        inheritedEffects={{}}
        onChange={onChange}
      />
    );
    // Pick "Lift" by its accessible name (now via aria-label).
    const lift = pickerButtons().find((b) => b.getAttribute('aria-label') === 'Lift');
    await user.click(lift);

    expect(onChange).toHaveBeenCalledOnce();
    const written = onChange.mock.calls[0][0];
    // Default trigger for Lift is 'hover'.
    expect(written['lift:hover']).toBeTruthy();
    expect(written['lift:hover'].id).toBe('lift');
  });

  it('clicking the remove button takes the effect off the tier', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTiles(
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={{
          'lift:hover': { id: 'lift', trigger: 'hover', config: { distance: 4 } },
        }}
        inheritedEffects={{}}
        onChange={onChange}
      />
    );
    // The "Lift" editor should now be focused on the right; click the remove button.
    const removeBtn = screen.getByRole('button', { name: /remove effect/i });
    await user.click(removeBtn);
    expect(onChange).toHaveBeenCalledOnce();
    // Removing the only own entry should write `{}` (no `null` placeholder
    // because the effect wasn't inherited from anywhere).
    expect(onChange.mock.calls[0][0]).toEqual({});
  });

  it('auto-swaps effects in the same exclusivity group', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    // lift + scale-up share group 'transform' — adding one should drop the other.
    renderWithTiles(
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={{
          'lift:hover': { id: 'lift', trigger: 'hover', config: { distance: 4 } },
        }}
        inheritedEffects={{}}
        onChange={onChange}
      />
    );
    const scaleUp = pickerButtons().find((b) => b.getAttribute('aria-label') === 'Scale up');
    await user.click(scaleUp);
    const written = onChange.mock.calls[0][0];
    expect(written['scale-up:hover']).toBeTruthy();
    expect(written['lift:hover']).toBeUndefined();
  });
});
