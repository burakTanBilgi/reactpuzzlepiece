export default function LandingPage({ onNav }) {
  return (
    <div className="page-landing">
      <section className="landing-hero">
        <span className="landing-hero__mark" aria-hidden="true">箱</span>
        <p className="landing-hero__sub">箱庭 · miniature garden</p>
        <h1 className="landing-hero__name">Hakoniwa</h1>
        <p className="landing-hero__tagline">
          Design layouts that snap together — puzzle tabs &amp; sockets,
          soft waves, or clean straight lines. Build a grid, merge cells into
          pieces, fill them with text or images, and export as JSON, a single
          React file, or a full module bundle.
        </p>
        <div className="landing-hero__ctas">
          <button
            type="button"
            className="action-btn action-btn--primary"
            onClick={() => onNav('projects')}
          >
            Open the app →
          </button>
          <button
            type="button"
            className="action-btn action-btn--ghost"
            onClick={() => onNav('docs')}
          >
            Read the docs
          </button>
        </div>
      </section>

      <section className="landing-features">
        <Feature
          icon="⚏"
          title="Build with pieces"
          body="Drag-select cells in a grid and merge them into custom pieces."
        />
        <Feature
          icon="✎"
          title="Style every edge"
          body="Three connector styles — puzzle, wave, straight — with per-edge overrides for color, opacity, and width."
        />
        <Feature
          icon="⤓"
          title="Export anywhere"
          body="Ship as JSON, a single self-contained React file, or a drop-in module bundle. No deps beyond React."
        />
      </section>

      <section className="landing-foot">
        <button
          type="button"
          className="landing-foot__cta"
          onClick={() => onNav('docs')}
        >
          <span>Continue to docs</span>
          <span className="landing-foot__arrow" aria-hidden="true">↓</span>
        </button>
      </section>
    </div>
  );
}

function Feature({ icon, title, body }) {
  return (
    <article className="landing-feature">
      <span className="landing-feature__icon" aria-hidden="true">{icon}</span>
      <h3 className="landing-feature__title">{title}</h3>
      <p className="landing-feature__body">{body}</p>
    </article>
  );
}
