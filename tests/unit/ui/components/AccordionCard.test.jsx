import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccordionCard from '../../../../src/ui/components/AccordionCard.jsx';

describe('AccordionCard', () => {
  const baseProps = () => ({
    id: 'section-a',
    title: 'Backgrounds',
    open: false,
    onToggle: vi.fn(),
  });

  it('renders the title in a button header even when closed', () => {
    render(<AccordionCard {...baseProps()}><p>hidden body</p></AccordionCard>);
    expect(screen.getByRole('button', { name: /backgrounds/i })).toBeInTheDocument();
    // Closed → body not in the DOM.
    expect(screen.queryByText('hidden body')).toBeNull();
  });

  it('renders children inside the body when open', () => {
    render(
      <AccordionCard {...baseProps()} open>
        <p>visible body</p>
      </AccordionCard>
    );
    expect(screen.getByText('visible body')).toBeInTheDocument();
  });

  it('calls onToggle(id) when clicked while closed', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<AccordionCard {...props}><p>body</p></AccordionCard>);
    await user.click(screen.getByRole('button', { name: /backgrounds/i }));
    expect(props.onToggle).toHaveBeenCalledWith('section-a');
  });

  it('calls onToggle(null) when clicked while open (i.e. user clicks to collapse)', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<AccordionCard {...props} open><p>body</p></AccordionCard>);
    await user.click(screen.getByRole('button', { name: /backgrounds/i }));
    expect(props.onToggle).toHaveBeenCalledWith(null);
  });

  it('shows the badge when one is provided', () => {
    render(
      <AccordionCard {...baseProps()} badge={3}>
        <p>body</p>
      </AccordionCard>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<AccordionCard {...props} disabled><p>body</p></AccordionCard>);
    await user.click(screen.getByRole('button', { name: /backgrounds/i }));
    expect(props.onToggle).not.toHaveBeenCalled();
  });

  it('exposes aria-expanded matching the open state', () => {
    const { rerender } = render(<AccordionCard {...baseProps()}><p>body</p></AccordionCard>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    rerender(<AccordionCard {...baseProps()} open><p>body</p></AccordionCard>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });
});
