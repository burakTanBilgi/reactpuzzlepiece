import SliderRow from './SliderRow.jsx';
import { FIT_OPTIONS } from '../utils/fitOptions.js';
import { useFileInput } from '../hooks/useFileInput.js';

const ALIGN_OPTIONS = [
  { value: 'left',   label: '⇤' },
  { value: 'center', label: '↔' },
  { value: 'right',  label: '⇥' },
];

// Side-panel UI for the Content mode of the Edit page.
export default function ContentPanel({
  selectedPiece,
  onClearSelection,
  setPieceContent,
  updatePieceContent,
}) {
  const selected = selectedPiece;
  const content = selected?.content || null;

  const setType = (type) => {
    if (!selected) return;
    if (type === 'none')  return setPieceContent(selected.id, null);
    if (type === 'text')  return setPieceContent(selected.id, { type: 'text',  text: content?.text || '' });
    if (type === 'image') return setPieceContent(selected.id, { type: 'image', src: content?.src || '', fit: content?.fit || 'cover' });
  };

  const handleImageFile = (file) => {
    if (!file || !selected) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updatePieceContent(selected.id, {
        type: 'image',
        src: e.target.result,
        fit: content?.fit || 'cover',
      });
    };
    reader.readAsDataURL(file);
  };

  const { inputProps, open } = useFileInput(handleImageFile);

  if (!selected) {
    return (
      <section className="card">
        <h3 className="card__title">Content</h3>
        <p className="hint">Click a piece in the canvas to edit its content.</p>
      </section>
    );
  }

  return (
    <section className="card card--accent">
      <div className="card__row">
        <h3 className="card__title">{selected.label || selected.id}</h3>
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
            onChange={(e) => updatePieceContent(selected.id, { text: e.target.value })}
          />
          <div className="form-row">
            <label className="form-row__label">Align</label>
            <div className="effect-chips">
              {ALIGN_OPTIONS.map((a) => (
                <button key={a.value} type="button"
                  className={`chip chip--sm ${(content.align || 'center') === a.value ? 'chip--active' : ''}`}
                  onClick={() => updatePieceContent(selected.id, { align: a.value })}
                  title={a.value}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <SliderRow
            label="Size"
            min={8} max={64} step={1}
            value={Math.round(content.fontSize || Math.min(selected.w, selected.h) / 8)}
            onChange={(v) => updatePieceContent(selected.id, { fontSize: v })}
          />
          <div className="form-row">
            <label className="form-row__label">Color</label>
            <input
              type="color"
              className="form-row__color"
              value={content.color || '#ede8de'}
              onChange={(e) => updatePieceContent(selected.id, { color: e.target.value })}
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
                      onClick={() => updatePieceContent(selected.id, { fit: f.value })}
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

      <div className="action-stack">
        <button type="button" className="action-btn action-btn--ghost"
          onClick={() => setPieceContent(selected.id, null)} disabled={!content}>
          Clear content
        </button>
      </div>
    </section>
  );
}
