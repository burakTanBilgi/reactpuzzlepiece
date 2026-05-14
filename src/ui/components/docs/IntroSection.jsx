import MiniPuzzle from './demos/MiniPuzzle.jsx';
import WaveDivider from '../meta/WaveDivider.jsx';
import MetaCardRow from '../meta/MetaCardRow.jsx';

export default function IntroSection({ onNav }) {
  const tiles = [
    {
      id: 'tile-projects',
      icon: '⚏',
      title: 'Projects',
      body: "Browse, import, and switch between saved designs.",
      onClick: () => onNav('projects'),
    },
    {
      id: 'tile-preview',
      icon: '◇',
      title: 'Preview',
      body: "A big read-only view of what you've built.",
      onClick: () => onNav('preview'),
    },
    {
      id: 'tile-grid',
      icon: '⊞',
      title: 'Grid',
      body: "Lay out the cells: drag-select, merge, color, paste images.",
      onClick: () => onNav('grid'),
    },
    {
      id: 'tile-edit',
      icon: '✎',
      title: 'Edit',
      body: "Two modes in one canvas: style edges or fill content.",
      onClick: () => onNav('edit'),
    },
  ];

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

      <WaveDivider />

      <div className="doc__demo">
        <MiniPuzzle />
        <p className="doc__demo-caption">
          ↑ Click an effect to see the connectors change live.
        </p>
      </div>

      <MetaCardRow cards={tiles} rows={2} cols={2} />

      <div className="doc__note">
        <strong>Already designed something?</strong>{' '}
        <button type="button" className="link-btn" onClick={() => onNav('projects')}>
          Jump straight to your projects →
        </button>
      </div>
    </section>
  );
}
