// Two-or-three tab strip used inside the PieceInspector (Content / Body /
// Edges). Local state lives in the parent — this component is pure
// presentation so the parent can persist the active tab across selection
// changes.
//
// Props:
//   tabs    — [{ id, label }]
//   active  — id of the active tab
//   onPick  — (id) => void
export default function InspectorTabs({ tabs, active, onPick }) {
  return (
    <div className="inspector-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          className={`inspector-tabs__btn ${active === t.id ? 'inspector-tabs__btn--active' : ''}`}
          onClick={() => onPick(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
