import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditModePicker from '../../../../src/ui/components/edit-ui/EditModePicker.jsx';

describe('EditModePicker', () => {
  it('renders just the trigger button when closed', () => {
    render(<EditModePicker mode="canvas" onChangeMode={() => {}} tiles={false} onChangeTiles={() => {}} />);
    // The trigger button announces itself as the layout switcher.
    const btn = screen.getByRole('button', { name: /switch edit layout/i });
    expect(btn).toBeInTheDocument();
    // Popover heading is NOT present until clicked.
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the popover with all four mode rows when clicked', async () => {
    const user = userEvent.setup();
    render(<EditModePicker mode="canvas" onChangeMode={() => {}} tiles={false} onChangeTiles={() => {}} />);
    await user.click(screen.getByRole('button', { name: /switch edit layout/i }));

    expect(screen.getByRole('dialog', { name: /edit layouts/i })).toBeInTheDocument();
    expect(screen.getByText('Canvas')).toBeInTheDocument();
    expect(screen.getByText('Layers')).toBeInTheDocument();
    expect(screen.getByText('Flat')).toBeInTheDocument();
    expect(screen.getByText('Workflow')).toBeInTheDocument();
  });

  it('calls onChangeMode and closes the popover when a mode row is clicked', async () => {
    const user = userEvent.setup();
    const onChangeMode = vi.fn();
    render(<EditModePicker mode="canvas" onChangeMode={onChangeMode} tiles={false} onChangeTiles={() => {}} />);
    await user.click(screen.getByRole('button', { name: /switch edit layout/i }));
    await user.click(screen.getByText('Layers'));

    expect(onChangeMode).toHaveBeenCalledWith('layers');
    // Popover should close after picking.
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('toggles the tiles preference via the checkbox', async () => {
    const user = userEvent.setup();
    const onChangeTiles = vi.fn();
    render(<EditModePicker mode="canvas" onChangeMode={() => {}} tiles={false} onChangeTiles={onChangeTiles} />);
    await user.click(screen.getByRole('button', { name: /switch edit layout/i }));
    await user.click(screen.getByRole('checkbox'));
    expect(onChangeTiles).toHaveBeenCalledWith(true);
  });

  it('closes the popover on Escape', async () => {
    const user = userEvent.setup();
    render(<EditModePicker mode="canvas" onChangeMode={() => {}} tiles={false} onChangeTiles={() => {}} />);
    await user.click(screen.getByRole('button', { name: /switch edit layout/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
