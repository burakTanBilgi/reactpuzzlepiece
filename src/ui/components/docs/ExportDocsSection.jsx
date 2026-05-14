import WaveDivider from '../meta/WaveDivider.jsx';
import MetaCardRow from '../meta/MetaCardRow.jsx';

const EXPORT_CARDS = [
  {
    id: 'export-json',
    title: 'JSON',
    body: 'Re-importable project state. Drop it back into Hakoniwa via Projects → Import to keep editing.',
  },
  {
    id: 'export-jsx',
    title: 'Single-file React',
    body: 'One self-contained .jsx with paths precomputed and content baked in. Drop into any React 18+ project — zero deps. Bundled with a README in a small ZIP.',
  },
  {
    id: 'export-zip',
    title: 'Module bundle (ZIP)',
    body: 'The whole portable puzzle/ folder, your project.json, a wrapper component, a standalone compileProject.js, and a README.',
  },
];

export default function ExportDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Exporting</span>
        <h1 className="doc__h1">Three ways to ship your puzzle.</h1>
        <p className="doc__lede">
          Open the Preview page and click <strong>↓ Export ▾</strong> at the top
          of the side panel. You'll get a menu with three options.
        </p>
      </header>

      <WaveDivider />

      <MetaCardRow cards={EXPORT_CARDS} />

      <div className="doc__note">
        The ZIP encoder is hand-rolled (~80 lines, no compression) so the studio
        ships with no third-party dependencies.
      </div>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('preview')}>
          Open Preview to export →
        </button>
      </div>
    </section>
  );
}
