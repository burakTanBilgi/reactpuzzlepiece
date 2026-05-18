import { useEffect, useRef } from 'react';
import EdgeTierEditor from './EdgeTierEditor.jsx';
import CellTierEditor from './CellTierEditor.jsx';
import InspectorTabs from './InspectorTabs.jsx';
import InspectorSubcard from './InspectorSubcard.jsx';
import SliderRow from '../SliderRow.jsx';
import Icon from '../Icon.jsx';
import Tooltip from '../Tooltip.jsx';
import { useFileInput } from '../../hooks/useFileInput.js';
import { FIT_OPTIONS } from '../../utils/fitOptions.js';
import { DEFAULT_WAVE } from '../edges/constants.js';

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'body',    label: 'Body'    },
  { id: 'edges',   label: 'Edges'   },
];

const ALIGN_OPTIONS = [
  { value: 'left',   icon: 'align-left',   label: 'Align left'   },
  { value: 'center', icon: 'align-center', label: 'Align center' },
  { value: 'right',  icon: 'align-right',  label: 'Align right'  },
];

// Body of the "Piece" accordion card. Renders the three-tab editor
// (Content / Body / Edges) scoped to the selected piece. Lower / higher
// tiers are owned by Inspector.jsx as sibling accordion cards now.
export default function PieceInspector({
  piece,
  project,
  activeTab,
  onChangeTab,
  onClearSelection,
  // content
  setPieceContent, updatePieceContent,
  // cells
  setCellEffects,
  // edges
  setPieceEdgeEffect, setPieceEdgeConfig, setPieceEdgeEffects, clearPieceEdgeOverride,
}) {
  const edges = project.edges;
  const defaultEdgeEffect = edges.default.effect;
  const defaultEdgeConfig = edges.default.config ?? DEFAULT_WAVE;
  const defaultEdgeEffects = edges.default.effects || {};

  const cellOverride = edges.byPiece?.[piece.id] || null;
  const pieceEdgeEffect = cellOverride?.effect ?? defaultEdgeEffect;
  const pieceEdgeConfig = cellOverride?.config ?? defaultEdgeConfig;

  const defaultCellEffects = project?.cells?.default?.effects || {};
  const pieceCellEffects   = project?.cells?.byPiece?.[piece.id]?.effects || {};

  return (
    <>
      <div className="inspector-header">
        <div>
          <span className="inspector-header__kind">Piece</span>
          <span className="inspector-header__title">{piece.label || piece.id}</span>
        </div>
        <Tooltip label="Clear selection">
          <button type="button" className="icon-action-btn" aria-label="Clear selection" onClick={onClearSelection}>
            <Icon name="close" size={13} />
          </button>
        </Tooltip>
      </div>

      <InspectorTabs tabs={TABS} active={activeTab} onPick={onChangeTab} />

      {activeTab === 'content' && (
        <ContentTab
          piece={piece}
          setPieceContent={setPieceContent}
          updatePieceContent={updatePieceContent}
        />
      )}

      {activeTab === 'body' && (
        <CellTierEditor
          title="This piece's body"
          accent
          ownEffects={pieceCellEffects}
          inheritedEffects={defaultCellEffects}
          onChange={(map) => setCellEffects(piece.id, map)}
        />
      )}

      {activeTab === 'edges' && (
        <EdgeTierEditor
          title="This piece's edges"
          accent
          effect={pieceEdgeEffect}
          config={pieceEdgeConfig}
          ownEffects={cellOverride?.effects || {}}
          inheritedEffects={defaultEdgeEffects}
          onSetEffect={(name) => setPieceEdgeEffect(piece.id, name, name === 'wave'
            ? (cellOverride?.config ?? defaultEdgeConfig) : undefined)}
          onPatchConfig={(patch) => setPieceEdgeConfig(piece.id, patch)}
          onChangeEffects={(map) => setPieceEdgeEffects(piece.id, map)}
          onClear={cellOverride ? () => clearPieceEdgeOverride(piece.id) : null}
        />
      )}
    </>
  );
}

function ContentTab({ piece, setPieceContent, updatePieceContent }) {
  const content = piece.content || null;
  const textareaRef = useRef(null);

  // Type-to-fill: while the piece is selected on the Content tab with no
  // content yet, the first printable keypress (outside any input) seeds a
  // text content and focuses the textarea so typing continues naturally.
  useEffect(() => {
    if (content) return;
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (typeof e.key !== 'string' || e.key.length !== 1) return;
      e.preventDefault();
      const ch = e.key;
      setPieceContent(piece.id, { type: 'text', text: ch });
      requestAnimationFrame(() => {
        const ta = textareaRef.current;
        if (ta) {
          ta.focus();
          ta.setSelectionRange(ta.value.length, ta.value.length);
        }
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [content, piece.id, setPieceContent]);

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
    <InspectorSubcard
      title="Content"
      accent
      actions={content
        ? (
          <Tooltip label="Clear content">
            <button type="button" className="icon-action-btn icon-action-btn--danger"
              aria-label="Clear content"
              onClick={() => setPieceContent(piece.id, null)}>
              <Icon name="trash" size={13} />
            </button>
          </Tooltip>
        )
        : null}
    >
      <div className="effect-chips">
        {[
          { v: 'none',  l: 'Empty' },
          { v: 'text',  l: 'Text'  },
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
            ref={textareaRef}
            className="modal__textarea"
            style={{ minHeight: 80 }}
            placeholder="Enter text…"
            value={content.text || ''}
            onChange={(e) => updatePieceContent(piece.id, { text: e.target.value })}
          />
          <div className="form-row">
            <label className="form-row__label">Align</label>
            <div className="effect-chips effect-chips--icons">
              {ALIGN_OPTIONS.map((a) => (
                <Tooltip key={a.value} label={a.label}>
                  <button type="button"
                    className={`chip chip--icon ${(content.align || 'center') === a.value ? 'chip--active' : ''}`}
                    onClick={() => updatePieceContent(piece.id, { align: a.value })}
                    aria-label={a.label}
                    aria-pressed={(content.align || 'center') === a.value}>
                    <Icon name={a.icon} size={14} />
                  </button>
                </Tooltip>
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
            <Icon name="upload" size={14} />
            <span>{content.src ? 'Replace image' : 'Upload image'}</span>
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
                    <Tooltip key={f.value} label={f.hint}>
                      <button type="button"
                        className={`chip chip--sm ${(content.fit || 'cover') === f.value ? 'chip--active' : ''}`}
                        onClick={() => updatePieceContent(piece.id, { fit: f.value })}>
                        {f.label}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </InspectorSubcard>
  );
}
