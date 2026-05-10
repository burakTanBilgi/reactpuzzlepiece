import EdgeDemo from './demos/EdgeDemo.jsx';

export default function EditDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Edit tab</span>
        <h1 className="doc__h1">Same canvas, two modes.</h1>
        <p className="doc__lede">
          Edit hosts both <strong>Edges</strong> (style the connectors) and{' '}
          <strong>Content</strong> (fill pieces with text or images). The board
          underneath stays identical — only the side panel and the click target
          change as you switch modes.
        </p>
      </header>

      <div className="doc__demo">
        <EdgeDemo />
        <p className="doc__demo-caption">
          ↑ Try the priority chain: pick a default, then override an inner or outer
          edge to see how the chain resolves.
        </p>
      </div>

      <h3>Edges mode</h3>
      <p>
        Edges resolve through a three-layer priority chain — <em>highest priority first</em>:
      </p>
      <ol className="doc__list doc__list--ordered">
        <li>
          <strong>Per-edge override</strong> — click an edge in the canvas to give it
          its own effect &amp; config. Shift-click to multi-select and edit them
          together.
        </li>
        <li>
          <strong>Inner edges</strong> / <strong>Outer edges</strong> — set a single
          override that applies to every shared (or every outer) edge unless a
          per-edge override wins. Use the "use default" link to clear the layer.
        </li>
        <li>
          <strong>Default effect</strong> — applied to every edge that has no
          override above. The starting point.
        </li>
      </ol>

      <p>
        Three effects ship: <strong>Puzzle</strong> (interlocking tabs/sockets — invertible),{' '}
        <strong>Wave</strong> (sinusoidal, with frequency + amplitude), and{' '}
        <strong>Straight</strong> (clean line).
      </p>

      <h3>Stroke styling</h3>
      <p>
        Every effect carries three style fields that cascade through the same
        Default → Inner/Outer → per-edge chain:
      </p>
      <ul className="doc__list">
        <li><strong>Color</strong> — any color from the picker. Hit <em>reset</em> to fall back to the theme stroke.</li>
        <li><strong>Opacity</strong> — 0 to 100%. <em>Transparent ≠ no color:</em> a transparent stroke shows the page background through the gap, while a colorless stroke just inherits the theme.</li>
        <li><strong>Width</strong> — 0 to 10px. Use 0 to hide the outline entirely without changing geometry.</li>
      </ul>

      <h3>Content mode</h3>
      <ul className="doc__list">
        <li>Click any piece to select it.</li>
        <li>Choose <strong>Empty</strong>, <strong>Text</strong>, or <strong>Image</strong>.</li>
        <li>Text supports alignment, size, and color. Image supports <em>Cover / Contain / Stretch</em>.</li>
        <li>Everything is clipped to the piece's outline — text and images respect the puzzle shape.</li>
      </ul>

      <h3>Navigation</h3>
      <ul className="doc__list">
        <li><strong>Scroll</strong> to zoom; <strong>middle-drag</strong> or <strong>Ctrl-drag</strong> to pan.</li>
        <li><strong>Esc</strong> clears the selection in the active mode.</li>
      </ul>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('edit')}>
          Open Edit →
        </button>
      </div>
    </section>
  );
}
