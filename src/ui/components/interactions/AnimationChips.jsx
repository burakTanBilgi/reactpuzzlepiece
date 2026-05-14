// Reusable horizontal chip row for picking a single hover-animation id.
// Used by both the Cells panel (cell-tier) and the Edges panel (edge-tier
// across every cascade card). Surfaces a `mixed` placeholder chip when the
// caller's selection straddles different values (multi-edge editing).
export default function AnimationChips({ options, active, onSelect, mixed = false }) {
  return (
    <div className="effect-chips">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          title={opt.hint}
          className={`chip chip--sm ${active === opt.id && !mixed ? 'chip--active' : ''}`}
          onClick={() => onSelect(opt.id)}
        >
          {opt.label}
        </button>
      ))}
      {mixed && <span className="chip chip--sm chip--mixed">mixed</span>}
    </div>
  );
}
