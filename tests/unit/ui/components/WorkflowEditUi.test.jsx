import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkflowEditUi from '../../../../src/ui/components/edit-ui/WorkflowEditUi.jsx';
import { compileProject, listSharedEdges } from '../../../../src/grid/compile.js';
import { project2x2 } from '../../../helpers/fixtures.js';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

function makeProps(overrides = {}) {
  const project = project2x2();
  const pieces  = compileProject(project);
  const shared  = listSharedEdges(project);
  return {
    project, pieces, sharedEdges: shared,
    selectedEdges: new Set(),
    selectedPieceId: null,
    setDefaultEdgeEffect:  vi.fn(),
    setDefaultEdgeConfig:  vi.fn(),
    setDefaultEdgeEffects: vi.fn(),
    setPieceEdgeEffect: vi.fn(),
    setPieceEdgeConfig: vi.fn(),
    setPieceEdgeEffects: vi.fn(),
    clearPieceEdgeOverride: vi.fn(),
    setEdgeEffect: vi.fn(),
    setEdgeConfig: vi.fn(),
    clearEdgeOverride: vi.fn(),
    setEdgeEffects: vi.fn(),
    setDefaultCellEffects: vi.fn(),
    setCellEffects: vi.fn(),
    setPieceColor: vi.fn(),
    ...overrides,
  };
}

describe('WorkflowEditUi', () => {
  it('renders the three task tabs (Connect / Paint / Animate)', () => {
    renderWithTiles(<WorkflowEditUi {...makeProps()} />);
    expect(screen.getByRole('tab', { name: /connect/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /paint/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /animate/i })).toBeInTheDocument();
  });

  it('Connect is the default active tab', () => {
    renderWithTiles(<WorkflowEditUi {...makeProps()} />);
    expect(screen.getByRole('tab', { name: /connect/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('switching to Paint shows the color grid + hint when nothing is selected', async () => {
    const user = userEvent.setup();
    renderWithTiles(<WorkflowEditUi {...makeProps()} />);
    await user.click(screen.getByRole('tab', { name: /paint/i }));
    expect(screen.getByText(/click a piece on the canvas/i)).toBeInTheDocument();
  });

  it('Paint mode disables every color swatch when no piece is selected', async () => {
    const user = userEvent.setup();
    renderWithTiles(<WorkflowEditUi {...makeProps()} />);
    await user.click(screen.getByRole('tab', { name: /paint/i }));
    // All swatches share the .color-swatch class. Just sample one.
    const swatches = document.querySelectorAll('.color-swatch');
    expect(swatches.length).toBeGreaterThan(0);
    for (const sw of swatches) {
      // <button disabled> / <input disabled> — both expose the disabled prop.
      expect(sw.disabled || sw.querySelector('input')?.disabled).toBeTruthy();
    }
  });

  it('Paint mode wires the picked swatch to setPieceColor when a piece is selected', async () => {
    const user = userEvent.setup();
    const props = makeProps({ selectedPieceId: 'piece-A' });
    renderWithTiles(<WorkflowEditUi {...props} />);
    await user.click(screen.getByRole('tab', { name: /paint/i }));
    // The 10-swatch palette has stable hex aria-labels; click the first one.
    const swatch = document.querySelector('.color-swatch[aria-label="Color #d68b54"]');
    expect(swatch).not.toBeNull();
    await user.click(swatch);
    expect(props.setPieceColor).toHaveBeenCalledWith('piece-A', '#d68b54');
  });

  it('Animate mode shows the cell-effects picker when a piece is selected', async () => {
    const user = userEvent.setup();
    const props = makeProps({ selectedPieceId: 'piece-A' });
    renderWithTiles(<WorkflowEditUi {...props} />);
    await user.click(screen.getByRole('tab', { name: /animate/i }));
    // The Animate task renders two sub-cards: piece edges + piece body.
    // The shared kicker text is the easiest visible signal.
    expect(screen.getByText(/this piece's effects/i)).toBeInTheDocument();
  });
});
