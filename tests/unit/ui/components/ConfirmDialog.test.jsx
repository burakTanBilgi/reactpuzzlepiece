import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from '../../../../src/ui/components/ConfirmDialog.jsx';

describe('ConfirmDialog', () => {
  const baseProps = () => ({
    title: 'Delete everything?',
    body: <p>Are you sure?</p>,
    confirmLabel: 'Delete',
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
    danger: true,
  });

  it('renders the title, body, and both buttons', () => {
    render(<ConfirmDialog {...baseProps()} />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Delete everything?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^cancel$/i })).toBeInTheDocument();
  });

  it('calls onConfirm when the danger button is clicked', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<ConfirmDialog {...props} />);
    await user.click(screen.getByRole('button', { name: /^delete$/i }));
    expect(props.onConfirm).toHaveBeenCalledOnce();
    expect(props.onCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<ConfirmDialog {...props} />);
    await user.click(screen.getByRole('button', { name: /^cancel$/i }));
    expect(props.onCancel).toHaveBeenCalledOnce();
    expect(props.onConfirm).not.toHaveBeenCalled();
  });

  it('Escape triggers onCancel', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<ConfirmDialog {...props} />);
    await user.keyboard('{Escape}');
    expect(props.onCancel).toHaveBeenCalledOnce();
  });

  it('Enter triggers onConfirm', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<ConfirmDialog {...props} />);
    await user.keyboard('{Enter}');
    expect(props.onConfirm).toHaveBeenCalledOnce();
  });
});
