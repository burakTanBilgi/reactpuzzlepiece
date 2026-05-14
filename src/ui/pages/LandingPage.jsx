import WaveBrandMark from '../components/meta/WaveBrandMark.jsx';
import WaveDivider   from '../components/meta/WaveDivider.jsx';
import MetaCardRow   from '../components/meta/MetaCardRow.jsx';

const FEATURE_CARDS = [
  {
    id: 'feat-build',
    icon: '⚏',
    title: 'Build with pieces',
    body: 'Drag-select cells in a grid and merge them into custom pieces.',
  },
  {
    id: 'feat-edges',
    icon: '✎',
    title: 'Style every edge',
    body: 'Three connector styles — puzzle, wave, straight — with per-edge overrides for color, opacity, and width.',
  },
  {
    id: 'feat-export',
    icon: '⤓',
    title: 'Export anywhere',
    body: 'Ship as JSON, a single self-contained React file, or a drop-in module bundle.',
  },
];

export default function LandingPage({ onNav }) {
  return (
    <div className="page-landing">
      <section className="landing-hero">
        <WaveBrandMark size="lg" />
        <p className="landing-hero__sub">箱庭 · built with itself</p>
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

      <WaveDivider amplitude={8} />

      <section className="landing-features">
        <MetaCardRow cards={FEATURE_CARDS} />
      </section>

      <WaveDivider amplitude={8} flip />

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
