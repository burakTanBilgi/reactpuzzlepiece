import MiniPuzzle from './demos/MiniPuzzle.jsx';

export default function IntroSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Hakoniwa · 箱庭</span>
        <h1 className="doc__h1">Design layouts that snap together.</h1>
        <p className="doc__lede">
          Hakoniwa is a small visual studio for grid-based layouts where every section is
          separated by a stylized connector — puzzle tabs &amp; sockets, soft waves, or clean
          straight lines. You build a grid, merge cells into pieces, fill them with text or
          images, and export the result as JSON, a single React file, or a full module bundle.
        </p>
      </header>

      <div className="doc__demo">
        <MiniPuzzle />
        <p className="doc__demo-caption">
          ↑ Click an effect to see the connectors change live.
        </p>
      </div>

      <div className="doc__grid">
        <Tile
          icon="⚏"
          title="Projects"
          body="Browse, import, and switch between saved designs."
          onClick={() => onNav('projects')}
        />
        <Tile
          icon="◇"
          title="Preview"
          body="A big read-only view of what you've built — and the one place you export from."
          onClick={() => onNav('preview')}
        />
        <Tile
          icon="⊞"
          title="Grid"
          body="Lay out the cells: drag-select, merge, color, paste images that span pieces."
          onClick={() => onNav('grid')}
        />
        <Tile
          icon="✎"
          title="Edit"
          body="Two modes in one canvas: style edges or fill pieces with text/images."
          onClick={() => onNav('edit')}
        />
      </div>

      <div className="doc__note">
        <strong>Already designed something?</strong>{' '}
        <button type="button" className="link-btn" onClick={() => onNav('projects')}>
          Jump straight to your projects →
        </button>
      </div>
    </section>
  );
}

function Tile({ icon, title, body, onClick }) {
  return (
    <button type="button" className="doc-tile" onClick={onClick}>
      <span className="doc-tile__icon" aria-hidden>{icon}</span>
      <span className="doc-tile__title">{title}</span>
      <span className="doc-tile__body">{body}</span>
    </button>
  );
}
