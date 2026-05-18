import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PieceInspector from '../../../../src/ui/components/inspector/PieceInspector.jsx';
import { compileProject } from '../../../../src/grid/compile.js';
import { project2x2 } from '../../../helpers/fixtures.js';
import { renderWithTiles } from '../../../helpers/test-utils.jsx';

// Tiny props bag — fills out the PieceInspector signature with no-op
// setters and the Content tab pre-selected.
function makeProps(piece, project, overrides = {}) {
  return {
    piece,
    project,
    activeTab: 'content',
    onChangeTab: vi.fn(),
    onClearSelection: vi.fn(),
    setPieceContent: vi.fn(),
    updatePieceContent: vi.fn(),
    setCellEffects: vi.fn(),
    setPieceEdgeEffect: vi.fn(),
    setPieceEdgeConfig: vi.fn(),
    setPieceEdgeEffects: vi.fn(),
    clearPieceEdgeOverride: vi.fn(),
    ...overrides,
  };
}

describe('PieceInspector — Content tab type-to-fill', () => {
  it('seeds a text content entry when the user types while the piece is empty', async () => {
    const user = userEvent.setup();
    const project = project2x2();
    const pieces  = compileProject(project);
    const piece   = pieces[0];
    const setPieceContent = vi.fn();
    renderWithTiles(
      <PieceInspector {...makeProps(piece, project, { setPieceContent })} />
    );

    // Empty cell — Empty chip is selected; no text content yet. Press a key.
    await user.keyboard('h');

    expect(setPieceContent).toHaveBeenCalledTimes(1);
    expect(setPieceContent).toHaveBeenCalledWith(piece.id, { type: 'text', text: 'h' });
  });

  it('ignores plain typing once the piece already has content', async () => {
    const user = userEvent.setup();
    const project = project2x2();
    const pieces  = compileProject(project);
    const pieceWithContent = { ...pieces[0], content: { type: 'text', text: 'hello' } };
    const setPieceContent = vi.fn();
    renderWithTiles(
      <PieceInspector {...makeProps(pieceWithContent, project, { setPieceContent })} />
    );
    // Type a printable key NOT inside the textarea (body focus).
    document.body.focus();
    await user.keyboard('x');
    expect(setPieceContent).not.toHaveBeenCalled();
  });

  it('ignores modifier-laden keys even on an empty piece', async () => {
    const user = userEvent.setup();
    const project = project2x2();
    const pieces  = compileProject(project);
    const setPieceContent = vi.fn();
    renderWithTiles(
      <PieceInspector {...makeProps(pieces[0], project, { setPieceContent })} />
    );
    // Ctrl+a — should not produce text content.
    await user.keyboard('{Control>}a{/Control}');
    expect(setPieceContent).not.toHaveBeenCalled();
  });

  it('ignores non-printable keys (Tab / Enter / arrows) on an empty piece', async () => {
    const user = userEvent.setup();
    const project = project2x2();
    const pieces  = compileProject(project);
    const setPieceContent = vi.fn();
    renderWithTiles(
      <PieceInspector {...makeProps(pieces[0], project, { setPieceContent })} />
    );
    await user.keyboard('{Tab}{Enter}{ArrowUp}{ArrowDown}');
    expect(setPieceContent).not.toHaveBeenCalled();
  });
});
