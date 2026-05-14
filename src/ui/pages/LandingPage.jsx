import { useMemo } from 'react';
import { compileProject } from '../../grid/compile.js';
import { PuzzleBoard } from '../../puzzle';

// Tiny Hakoniwa project rendered as the brand mark on the landing hero —
// proof that the studio is built with its own tools. Two pieces (箱 + 庭)
// connected by a puzzle tab/socket, content baked in via pieceContent.
const META_PROJECT = {
  grid: {
    rows: 1, cols: 2, cellSize: 100,
    groups: [['meta-hako', 'meta-niwa']],
  },
  edges: {
    default: { effect: 'puzzle' },
    inner: null, outer: null, byPiece: {}, byEdge: {},
  },
  pieceColors: {},
  pieceContent: {
    'meta-hako': { type: 'text', text: '箱', fontSize: 56 },
    'meta-niwa': { type: 'text', text: '庭', fontSize: 56 },
  },
  backgrounds: [],
};

function HeroMark() {
  const pieces = useMemo(() => compileProject(META_PROJECT), []);
  return (
    <div className="landing-hero__mark" aria-hidden="true">
      <PuzzleBoard pieces={pieces} effect="puzzle" />
    </div>
  );
}

export default function LandingPage({ onNav }) {
  return (
    <div className="page-landing">
      <section className="landing-hero">
        <HeroMark />
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
