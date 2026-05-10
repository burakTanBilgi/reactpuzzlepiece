import GridDemo from './demos/GridDemo.jsx';

export default function GridDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Grid tab</span>
        <h1 className="doc__h1">Lay out the cells.</h1>
        <p className="doc__lede">
          Build the layout: drag-select cells, merge groups into one piece,
          import data from a spreadsheet, and place background images that span
          across pieces without merging them.
        </p>
      </header>

      <div className="doc__demo">
        <GridDemo />
        <p className="doc__demo-caption">
          ↑ Try it: drag across cells to select, then click <strong>Merge</strong>.
        </p>
      </div>

      <h3>Selection</h3>
      <ul className="doc__list">
        <li><strong>Drag</strong> across cells to box-select.</li>
        <li><strong>Shift / Ctrl + click</strong> to add or remove individual cells.</li>
        <li><strong>Esc</strong> clears the selection.</li>
      </ul>

      <h3>Merging cells into pieces</h3>
      <ul className="doc__list">
        <li>The <strong>Merge</strong> button lights up only when the selection is a complete rectangle.</li>
        <li><strong>Unmerge</strong> splits the selected groups back into single cells.</li>
        <li>Merged groups show their dimensions ({'2×3'} etc.) right in the canvas.</li>
      </ul>

      <h3>Sizing and deleting</h3>
      <ul className="doc__list">
        <li>The <strong>Rows / Cols</strong> sliders resize the grid (max 50×50). Click any number to type it.</li>
        <li>Click a <strong>row or column number</strong> to delete it. Drag across multiple to delete in bulk.</li>
      </ul>

      <h3>Importing spreadsheet data</h3>
      <ul className="doc__list">
        <li>Use <strong>Paste data</strong> to drop in TSV/CSV from Excel, Google Sheets, or anywhere else.</li>
        <li>Each non-empty cell becomes a piece with text content.</li>
        <li><strong>Auto-merge horizontal runs</strong> (on by default) lets each non-empty cell extend rightward over the empty cells until the next non-empty cell — perfect for landing-page-style layouts.</li>
      </ul>

      <h3>Background images (multi-piece)</h3>
      <ul className="doc__list">
        <li>Select cells, then either <strong>Upload image</strong> or <strong>paste an image (Ctrl+V)</strong>.</li>
        <li>The image fills the bounding rect of your selection and is sliced naturally across whichever pieces it overlaps — pieces stay separate, edges remain editable.</li>
        <li>Each background can be set to <em>Cover</em> / <em>Contain</em> / <em>Stretch</em> from the side panel.</li>
      </ul>

      <h3>Coloring pieces</h3>
      <ul className="doc__list">
        <li>Select cells, then pick a swatch in the <strong>Color</strong> card. Use the rainbow swatch to open the OS color picker.</li>
      </ul>

      <h3>Navigation</h3>
      <ul className="doc__list">
        <li><strong>Scroll</strong> to zoom the canvas; <strong>middle-drag</strong> or <strong>Ctrl-drag</strong> to pan.</li>
      </ul>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('grid')}>
          Open Grid →
        </button>
      </div>
    </section>
  );
}
