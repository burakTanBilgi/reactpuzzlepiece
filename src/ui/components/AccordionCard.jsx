import './AccordionCard.css';

// Single-open-section accordion card. The parent owns `openId`; this component
// only describes itself. When `open` is true, the card flex-grows to consume
// whatever vertical room is left in its column and lets its body scroll
// internally. When closed, the card collapses to a 32px clickable header.
//
// Props:
//   id        — unique key (e.g. 'selection', 'piece')
//   title     — header text (or any node)
//   badge     — optional tiny pill on the right (count, status)
//   open      — boolean, drives the expanded state
//   onToggle  — (id|null) → void. Receives the new id, or null to close.
//   disabled  — optional; renders the header non-clickable + faded
//   children  — body content
export default function AccordionCard({
  id, title, badge, open, onToggle, disabled, children,
}) {
  return (
    <section className={`acc-card${open ? ' acc-card--open' : ''}${disabled ? ' acc-card--disabled' : ''}`}>
      <button
        type="button"
        className="acc-card__head"
        onClick={() => !disabled && onToggle(open ? null : id)}
        disabled={disabled}
        aria-expanded={open}
      >
        <span className="acc-card__title">{title}</span>
        {badge != null && badge !== false && (
          <span className="acc-card__badge">{badge}</span>
        )}
        <span className="acc-card__chevron" aria-hidden="true">▾</span>
      </button>
      {open && <div className="acc-card__body">{children}</div>}
    </section>
  );
}
