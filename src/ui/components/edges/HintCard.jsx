// Placeholder card shown at the top of the Edges panel when nothing is
// selected. Cues the user toward the canvas.
export default function HintCard() {
  return (
    <section className="card">
      <h3 className="card__title">Per-edge override</h3>
      <p className="hint">
        Click an edge in the canvas to give it its own effect.
        <br/>Shift-click to select multiple edges and edit them together.
      </p>
    </section>
  );
}
