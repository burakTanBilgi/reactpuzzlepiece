import SliderRow from './SliderRow.jsx';
import { FIT_OPTIONS } from '../utils/fitOptions.js';
import { useFileInput } from '../hooks/useFileInput.js';
import { CELL_ANIMATIONS } from './interactions/animations.js';
import AnimationChips from './interactions/AnimationChips.jsx';

const ALIGN_OPTIONS = [
  { value: 'left',   label: '⇤' },
  { value: 'center', label: '↔' },
  { value: 'right',  label: '⇥' },
];

// Side-panel UI for the Cells tab of the Edit page (was "Content" before the
// rename). Two cards stack vertically:
//
//   1. Default cell card  — chips for the project-wide hover animation that
//      every piece inherits unless it has a per-piece override.
//   2. Selected piece card (when a piece is clicked) — content editor (text/
//      image/fit/etc.) plus a per-piece Hover chip row that overrides the
//      default tier above.
export default function CellsPanel({
  project,
  selectedPiece,
  onClearSelection,
  setPieceContent,
  updatePieceContent,
  setDefaultCellHoverAnimation,
  setCellHoverAnimation,
}) {
  const defaultCellAnim = project?.cells?.default?.hoverAnimation ?? 'none';

  return (
    <>
      <DefaultCellCard
        animation={defaultCellAnim}
        onSetAnimation={setDefaultCellHoverAnimation}
      />
      {selectedPiece ? (
        <SelectedPieceCellCard
          piece={selectedPiece}
          project={project}
          onClearSelection={onClearSelection}
          setPieceContent={setPieceContent}
          updatePieceContent={updatePieceContent}
          setCellHoverAnimation={setCellHoverAnimation}
        />
      ) : (
        <section className="card">
          <h3 className="card__title">Selected cell</h3>
          <p className="hint">Click a piece in the canvas to edit its content and hover effect.</p>
        </section>
      )}
    </>
  );
}

// ---------- Default cell card ----------

function DefaultCellCard({ animation, onSetAnimation }) {
  return (
    <section className="card">
      <h3 className="card__title">Default cell hover</h3>
      <p className="hint">Applied to every piece unless it has its own hover effect below.</p>
      <AnimationChips
        options={CELL_ANIMATIONS}
        active={animation || 'none'}
        onSelect={onSetAnimation}
      />
    </section>
  );
}

// ---------- Selected-piece card (content + per-piece hover) ----------

function SelectedPieceCellCard({
  piece,
  project,
  onClearSelection,
  setPieceContent,
  updatePieceContent,
  setCellHoverAnimation,
}) {
  const content = piece.content || null;
  const cellAnim = project?.cells?.byPiece?.[piece.id]?.hoverAnimation ?? null;
  const inheritedAnim = project?.cells?.default?.hoverAnimation ?? null;

  const setType = (type) => {
    if (type === 'none')  return setPieceContent(piece.id, null);
    if (type === 'text')  return setPieceContent(piece.id, { type: 'text',  text: content?.text || '' });
    if (type === 'image') return setPieceContent(piece.id, { type: 'image', src: content?.src || '', fit: content?.fit || 'cover' });
  };

  const handleImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updatePieceContent(piece.id, {
        type: 'image',
        src: e.target.result,
        fit: content?.fit || 'cover',
      });
    };
    reader.readAsDataURL(file);
  };

  const { inputProps, open } = useFileInput(handleImageFile);

  return (
    <section className="card card--accent">
      <div className="card__row">
        <h3 className="card__title">{piece.label || piece.id}</h3>
        <button type="button" className="link-btn" onClick={onClearSelection}>clear</button>
      </div>

      <div className="effect-chips">
        {[
          { v: 'none',  l: 'Empty' },
          { v: 'text',  l: 'Text' },
          { v: 'image', l: 'Image' },
        ].map((t) => (
          <button key={t.v} type="button"
            className={`chip chip--sm ${(content?.type || 'none') === t.v ? 'chip--active' : ''}`}
            onClick={() => setType(t.v)}>
            {t.l}
          </button>
        ))}
      </div>

      {content?.type === 'text' && (
        <div className="content-config">
          <textarea
            className="modal__textarea"
            style={{ minHeight: 80 }}
            placeholder="Enter text…"
            value={content.text || ''}
            onChange={(e) => updatePieceContent(piece.id, { text: e.target.value })}
          />
          <div className="form-row">
            <label className="form-row__label">Align</label>
            <div className="effect-chips">
              {ALIGN_OPTIONS.map((a) => (
                <button key={a.value} type="button"
                  className={`chip chip--sm ${(content.align || 'center') === a.value ? 'chip--active' : ''}`}
                  onClick={() => updatePieceContent(piece.id, { align: a.value })}
                  title={a.value}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <SliderRow
            label="Size"
            min={8} max={64} step={1}
            value={Math.round(content.fontSize || Math.min(piece.w, piece.h) / 8)}
            onChange={(v) => updatePieceContent(piece.id, { fontSize: v })}
          />
          <div className="form-row">
            <label className="form-row__label">Color</label>
            <input
              type="color"
              className="form-row__color"
              value={content.color || '#ede8de'}
              onChange={(e) => updatePieceContent(piece.id, { color: e.target.value })}
            />
          </div>
        </div>
      )}

      {content?.type === 'image' && (
        <div className="content-config">
          <input {...inputProps} type="file" accept="image/*" hidden />
          <button type="button" className="action-btn action-btn--ghost" onClick={open}>
            {content.src ? 'Replace image' : '↑ Upload image'}
          </button>

          {content.src && (
            <>
              <div className="image-preview">
                <img src={content.src} alt="preview" />
              </div>
              <div className="form-row">
                <label className="form-row__label">Fit</label>
                <div className="effect-chips">
                  {FIT_OPTIONS.map((f) => (
                    <button key={f.value} type="button"
                      className={`chip chip--sm ${(content.fit || 'cover') === f.value ? 'chip--active' : ''}`}
                      onClick={() => updatePieceContent(piece.id, { fit: f.value })}
                      title={f.hint}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Per-piece hover effect — overrides the project default above. */}
      <div className="form-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <label className="form-row__label">Hover effect</label>
        <p className="hint" style={{ margin: 0 }}>
          {cellAnim
            ? `Overriding default${inheritedAnim ? ` (${inheritedAnim})` : ''}.`
            : `Following default${inheritedAnim ? ` (${inheritedAnim})` : ' (none)'}.`}
        </p>
      </div>
      <AnimationChips
        options={CELL_ANIMATIONS}
        active={cellAnim || 'none'}
        onSelect={(id) => setCellHoverAnimation(piece.id, id)}
      />

      <div className="action-stack">
        <button type="button" className="action-btn action-btn--ghost"
          onClick={() => setPieceContent(piece.id, null)} disabled={!content}>
          Clear content
        </button>
      </div>
    </section>
  );
}

