import { useSubcardAccordion } from './SubcardAccordionContext.jsx';

// Visual primitive: a labelled nested section inside an Inspector card.
//
// When wrapped in a <SubcardAccordion> and given an `id`, the subcard
// participates in a narrow-tier accordion: only the open one's body
// renders at container widths < 360 px, while wide containers continue
// to show every body. The title becomes a transparent button at narrow
// widths so the user can swap which body is visible; actions render
// beside the button so the existing reset/trash buttons keep working
// without nested-button HTML.
//
// Props:
//   id       — accordion key (omit to opt out of accordion behaviour)
//   title    — section heading (UPPERCASE in the rendered header)
//   accent   — emphasise the subcard (used for the active selection's
//              own-tier sections)
//   actions  — optional <button> nodes rendered on the right of the head
//   children — body content
export default function InspectorSubcard({ id, title, accent = false, actions, children }) {
  const accordion = useSubcardAccordion();
  const inAccordion = !!accordion && !!id;
  const open = inAccordion ? accordion.openId === id : true;

  const onClick = inAccordion
    ? () => accordion.setOpenId(id)
    : undefined;

  const bodyId = id ? `subcard-body-${id}` : undefined;

  return (
    <section
      className={`inspector-subcard ${accent ? 'inspector-subcard--accent' : ''}`}
      data-open={open ? 'true' : 'false'}
    >
      <header className="inspector-subcard__head">
        {inAccordion ? (
          <button
            type="button"
            className="inspector-subcard__head-btn"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={onClick}
          >
            <span className="inspector-subcard__chev" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="10" height="10">
                <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h4 className="inspector-subcard__title">{title}</h4>
          </button>
        ) : (
          <h4 className="inspector-subcard__title">{title}</h4>
        )}
        {actions ? <div className="inspector-subcard__actions">{actions}</div> : null}
      </header>
      <div className="inspector-subcard__body" id={bodyId}>{children}</div>
    </section>
  );
}
