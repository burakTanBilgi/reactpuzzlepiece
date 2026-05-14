// Visual primitive: a labelled nested section inside an Inspector card.
// Standardises the Shape / Style / Animations split that today's flat
// LayerCard lacks.
//
// Props:
//   title    — section heading (UPPERCASE in the rendered header)
//   accent   — emphasise the subcard (used for the active selection's
//              own-tier sections)
//   actions  — optional <button> nodes rendered on the right of the head
//   children — body content
export default function InspectorSubcard({ title, accent = false, actions, children }) {
  return (
    <section className={`inspector-subcard ${accent ? 'inspector-subcard--accent' : ''}`}>
      <div className="inspector-subcard__head">
        <h4 className="inspector-subcard__title">{title}</h4>
        {actions ? <div className="inspector-subcard__actions">{actions}</div> : null}
      </div>
      <div className="inspector-subcard__body">{children}</div>
    </section>
  );
}
