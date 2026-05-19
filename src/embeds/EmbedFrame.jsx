import './DoxaEmbed.css';

// Shared chrome for every embed: a small uppercase title and a body
// area that flexes to fill its piece's foreignObject. `busy` and
// `error` are mutually exclusive overlays so the host doesn't have to
// special-case loading/error UI per embed kind.
export default function EmbedFrame({ title, busy = false, error = null, children, footer = null }) {
  return (
    <div className="doxa-embed">
      {title && <div className="doxa-embed__title" title={title}>{title}</div>}
      <div className="doxa-embed__body">
        {error ? (
          <div className="doxa-embed__error">{error}</div>
        ) : busy ? (
          <div className="doxa-embed__loading" aria-live="polite">Loading…</div>
        ) : (
          children
        )}
      </div>
      {footer && <div className="doxa-embed__footer">{footer}</div>}
    </div>
  );
}
