import EdgeDemo from './demos/EdgeDemo.jsx';
import WaveDivider from '../meta/WaveDivider.jsx';

export default function EditDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Edit tab</span>
        <h1 className="doc__h1">One canvas, one inspector.</h1>
        <p className="doc__lede">
          Click a piece or an edge on the canvas and the side panel adapts — no
          mode switch. The inspector is a stack of <strong>tier cards</strong> that
          mirror the resolution chain: <em>Default → Inner → Outer → Piece → Edge</em>.
          One card open at a time, so even on a short viewport the rail stays
          fully visible.
        </p>
      </header>

      <WaveDivider />

      <div className="doc__demo">
        <EdgeDemo />
        <p className="doc__demo-caption">
          ↑ Try the priority chain: pick a default, then override an inner or outer
          edge to see how the chain resolves.
        </p>
      </div>

      <h3>The cascade strip</h3>
      <p>
        At the top of the inspector, a strip of pills shows every tier in the
        chain. Pill state at a glance:
      </p>
      <ul className="doc__list">
        <li><strong>Filled</strong> — this tier carries an override.</li>
        <li><strong>Hollow</strong> — this tier is inheriting from the one above.</li>
        <li><strong>Dashed</strong> — not applicable to your current selection.</li>
      </ul>
      <p>
        Click any pill (or the matching accordion header below) to open that
        tier's card. Clicks on either control share the same state — pick whichever
        feels natural for the moment.
      </p>

      <h3>Edge cascade — highest priority first</h3>
      <ol className="doc__list doc__list--ordered">
        <li>
          <strong>Edge</strong> — click an edge in the canvas to give it its own
          effect &amp; config. Shift-click to multi-select and edit them together.
        </li>
        <li>
          <strong>Piece</strong> — click a piece body to apply a setting to <em>every</em> edge of
          that piece in one go.
        </li>
        <li>
          <strong>Inner edges</strong> / <strong>Outer edges</strong> — single overrides that
          apply to every shared (or every outer) edge unless a higher tier wins.
        </li>
        <li>
          <strong>Default</strong> — the floor. Applied to every edge that has no override above.
        </li>
      </ol>

      <p>
        Three effects ship: <strong>Puzzle</strong> (interlocking tabs/sockets — invertible),{' '}
        <strong>Wave</strong> (sinusoidal, with frequency + amplitude), and{' '}
        <strong>Straight</strong> (clean line).
      </p>

      <h3>Stroke styling</h3>
      <p>
        Every effect carries three style fields that cascade through the same chain:
      </p>
      <ul className="doc__list">
        <li><strong>Color</strong> — any color from the picker. Hit <em>reset</em> to fall back to the theme stroke.</li>
        <li><strong>Opacity</strong> — 0 to 100%. <em>Transparent ≠ no color:</em> a transparent stroke shows the page background through the gap, while a colorless stroke just inherits the theme.</li>
        <li><strong>Width</strong> — 0 to 10px. Use 0 to hide the outline entirely without changing geometry.</li>
      </ul>

      <h3>Piece content</h3>
      <p>
        Select a piece, switch to the <strong>Content</strong> tab inside its tier card,
        and pick <strong>Empty</strong>, <strong>Text</strong>, or <strong>Image</strong>. Type alignment, size, and color
        for text; pick <em>Cover / Contain / Stretch</em> for images. Everything is
        clipped to the piece's outline — text and images respect the puzzle shape.
      </p>
      <p>
        Shortcut: with a piece selected and the Content tab open, if the piece is
        still empty you can <strong>just start typing</strong> — the first keystroke seeds a
        text content and focuses the textarea automatically.
      </p>

      <h3>Hover &amp; click previews</h3>
      <p>
        Above the inspector sit two icon toggles. They independently silence the
        canvas's <strong>hover</strong> and <strong>click</strong> previews so you can see pieces in their
        resting state without disabling any configured effects in the project itself.
      </p>

      <h3>Navigation</h3>
      <ul className="doc__list">
        <li><strong>Scroll</strong> to zoom; <strong>middle-drag</strong> or <strong>Ctrl-drag</strong> to pan.</li>
        <li><strong>Esc</strong> clears the current selection.</li>
      </ul>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('edit')}>
          Open Edit →
        </button>
      </div>
    </section>
  );
}
