export default function PreviewDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Preview tab</span>
        <h1 className="doc__h1">A clean view of what you've built.</h1>
        <p className="doc__lede">
          Preview is the read-only "look at it" view. Use it to step back from the
          editing canvas, rename the project, jump into Grid or Edit, and export.
        </p>
      </header>

      <h3>What's here</h3>
      <ul className="doc__list">
        <li><strong>Big preview</strong> on the left — same renderer as the editors, but no overlays or hit zones.</li>
        <li><strong>↓ Export ▾</strong> at the top of the side panel — the only place exports happen. See the <button className="link-btn" onClick={() => onNav?.('docs')}>Exporting</button> doc for the full menu.</li>
        <li><strong>Click the project name</strong> to rename it.</li>
        <li><strong>Edit grid / Edit pieces</strong> jump straight into the corresponding editor.</li>
      </ul>

      <div className="doc__note">
        Tip: when you open a project from the Projects tab, you land here automatically.
      </div>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('preview')}>
          Open Preview →
        </button>
      </div>
    </section>
  );
}
