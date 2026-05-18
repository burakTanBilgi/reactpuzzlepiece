import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Icon from '../../../../src/ui/components/Icon.jsx';

describe('Icon', () => {
  it('renders an inline SVG for a known glyph name', () => {
    const { container } = render(<Icon name="merge" />);
    const svg = container.querySelector('svg.ico');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('viewBox')).toBe('0 0 16 16');
  });

  it('returns null for an unknown glyph name', () => {
    const { container } = render(<Icon name="this-icon-does-not-exist" />);
    expect(container.firstChild).toBeNull();
  });

  it('adds an accessible <title> when a title prop is provided', () => {
    const { getByTitle } = render(<Icon name="reset" title="Reset all" />);
    expect(getByTitle('Reset all')).toBeInTheDocument();
  });

  it('marks itself aria-hidden when no title is provided', () => {
    const { container } = render(<Icon name="close" />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
