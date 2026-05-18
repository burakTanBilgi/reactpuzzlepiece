import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlatEditUi from '../../../../src/ui/components/edit-ui/FlatEditUi.jsx';
import { compileProject, listSharedEdges } from '../../../../src/grid/compile.js';
import { project2x2 } from '../../../helpers/fixtures.js';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

// Build a props bag where every setter is a vi.fn so we can spy on
// which one the FlatEditUi calls based on the active scope.
function makeProps(overrides = {}) {
  const project = project2x2();
  const pieces  = compileProject(project);
  const shared  = listSharedEdges(project);

  return {
    project, pieces, sharedEdges: shared,
    selectedEdges: new Set(),
    selectedPieceId: null,
    selectedPiece: null,
    onClearPieceSelection: vi.fn(),
    onClearEdgeSelection: vi.fn(),
    setDefaultEdgeEffect:  vi.fn(),
    setDefaultEdgeConfig:  vi.fn(),
    setDefaultEdgeEffects: vi.fn(),
    setLayerEffect: vi.fn(),
    setLayerConfig: vi.fn(),
    clearLayer:     vi.fn(),
    setLayerEffects: vi.fn(),
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
    ...overrides,
  };
}

describe('FlatEditUi', () => {
  it('renders the scope pill row + selection header', () => {
    renderWithTiles(<FlatEditUi {...makeProps()} />);
    expect(screen.getByRole('radiogroup', { name: /apply changes to/i })).toBeInTheDocument();
    // The five tiers should all be present as radios; only the
    // applicable ones (default + inner + outer here) are clickable.
    for (const label of ['Default', 'Inner', 'Outer', 'Piece', 'Edge']) {
      expect(screen.getByRole('radio', { name: label })).toBeInTheDocument();
    }
  });

  it('defaults the scope to "default" when nothing is selected', () => {
    renderWithTiles(<FlatEditUi {...makeProps()} />);
    expect(screen.getByRole('radio', { name: 'Default' })).toHaveAttribute('aria-checked', 'true');
  });

  it('switching scope to Inner routes effect changes through setLayerEffect', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    renderWithTiles(<FlatEditUi {...props} />);
    await user.click(screen.getByRole('radio', { name: 'Inner' }));

    // Switch the connector effect via the picker-split chip ("Wave").
    await user.click(screen.getByRole('tab', { name: /wave/i }));
    expect(props.setLayerEffect).toHaveBeenCalledWith('inner', 'wave', expect.anything());
    // Default-tier setters must not be touched.
    expect(props.setDefaultEdgeEffect).not.toHaveBeenCalled();
  });

  it('selecting a piece auto-promotes the scope to "Piece"', () => {
    const props = makeProps();
    const piece = props.pieces[0];
    renderWithTiles(
      <FlatEditUi {...props} selectedPieceId={piece.id} selectedPiece={piece} />
    );
    expect(screen.getByRole('radio', { name: 'Piece' })).toHaveAttribute('aria-checked', 'true');
  });

  it('clicking a non-applicable scope pill is a no-op', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    renderWithTiles(<FlatEditUi {...props} />);
    const edgePill = screen.getByRole('radio', { name: 'Edge' });
    expect(edgePill).toBeDisabled();
    await user.click(edgePill);
    expect(screen.getByRole('radio', { name: 'Default' })).toHaveAttribute('aria-checked', 'true');
  });
});
