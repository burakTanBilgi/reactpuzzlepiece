export default function ProjectsDocsSection({ onNav }) {
  return (
    <section className="doc">
      <header className="doc__header">
        <span className="doc__kicker">Projects tab</span>
        <h1 className="doc__h1">Your library of designs.</h1>
        <p className="doc__lede">
          Every project you build is auto-saved to your browser's local storage.
          The Projects tab lists them as tiles; click one to open it (you'll land
          on the Preview page automatically).
        </p>
      </header>

      <ul className="doc__list">
        <li><strong>+ New project</strong> — creates a fresh 2×2 grid.</li>
        <li><strong>↑ Import JSON</strong> — load a project file you (or someone else) exported earlier. Each import gets a fresh id so it won't collide with anything you already have.</li>
        <li><strong>Click a tile</strong> — opens the project. Hover the tile to reveal a small ✕ for deletion.</li>
        <li>The currently-open project gets a warm-amber ring so you can see what's active at a glance.</li>
      </ul>

      <div className="doc__cta-row">
        <button className="action-btn action-btn--primary" onClick={() => onNav('projects')}>
          Open Projects →
        </button>
      </div>
    </section>
  );
}
