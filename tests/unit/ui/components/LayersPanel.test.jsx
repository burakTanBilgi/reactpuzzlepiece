import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LayersPanel from '../../../../src/ui/components/edit-ui/LayersPanel.jsx';

const ROWS = [
  { kind: 'default', id: 'default', label: 'Project default', overridden: true },
  { kind: 'inner',   id: 'inner',   label: 'Inner edges',     overridden: false },
  { kind: 'section', id: 'pieces',  label: 'Pieces' },
  { kind: 'piece',   id: 'piece-A', label: 'piece A',         overridden: true  },
  { kind: 'piece',   id: 'piece-B', label: 'piece B',         overridden: false },
];

describe('LayersPanel', () => {
  it('renders one button per non-section row + section headings', () => {
    render(<LayersPanel rows={ROWS} activeRowId={null} onPickRow={() => {}} />);
    // Buttons: default + inner + piece-A + piece-B = 4.
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    // Section heading is plain text, not a button.
    expect(screen.getByText('Pieces')).toBeInTheDocument();
  });

  it('marks the active row with aria-pressed=true', () => {
    render(<LayersPanel rows={ROWS} activeRowId="piece-A" onPickRow={() => {}} />);
    const pieceARow = screen.getByRole('button', { name: /piece A/i });
    const pieceBRow = screen.getByRole('button', { name: /piece B/i });
    expect(pieceARow).toHaveAttribute('aria-pressed', 'true');
    expect(pieceBRow).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking a piece row hands the full row object to onPickRow', async () => {
    const user = userEvent.setup();
    const onPickRow = vi.fn();
    render(<LayersPanel rows={ROWS} activeRowId={null} onPickRow={onPickRow} />);
    await user.click(screen.getByRole('button', { name: /piece A/i }));
    expect(onPickRow).toHaveBeenCalledWith(ROWS.find((r) => r.id === 'piece-A'));
  });

  it('section rows are not interactive', async () => {
    const user = userEvent.setup();
    const onPickRow = vi.fn();
    render(<LayersPanel rows={ROWS} activeRowId={null} onPickRow={onPickRow} />);
    // The "Pieces" label exists as plain text (an <li>), not a button.
    await user.click(screen.getByText('Pieces'));
    expect(onPickRow).not.toHaveBeenCalled();
  });
});
