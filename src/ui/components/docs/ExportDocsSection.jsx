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

      <div className="doc__cards">
        <div className="doc-card">
          <h3>JSON</h3>
          <p>Re-importable project state. Drop it back into Hakoniwa via Projects → Import to keep editing.</p>
        </div>
        <div className="doc-card">
          <h3>Single-file React</h3>
          <p>One self-contained <code>.jsx</code> file with paths precomputed and content baked in. Drop into any React 18+ project — zero deps beyond React. Bundled with a README in a small ZIP.</p>
        </div>
        <div className="doc-card">
          <h3>Module bundle (ZIP)</h3>
          <p>Ships the whole portable <code>puzzle/</code> folder, your <code>project.json</code>, a wrapper component, a standalone <code>compileProject.js</code>, and a README. Use this when you want the full rendering API in your app.</p>
        </div>
      </div>

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
