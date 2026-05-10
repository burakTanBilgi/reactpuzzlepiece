import { useState } from 'react';
import PreviewSvg from '../components/PreviewSvg.jsx';
import { formatTime } from '../utils/formatTime.js';

// Large preview of the current project. Big board, easy navigation to editors.
export default function PreviewPage({ project, onNav }) {
  const { project: p, setName } = project;
  const [editingName, setEditingName] = useState(false);

  if (!p) return null;

  return (
    <div className="page-preview">
      <div className="preview-stage">
        <div className="preview-stage__svg">
          <PreviewSvg project={p} maxSize={620} />
        </div>
      </div>

      <aside className="preview-info">
        {editingName ? (
          <input
            className="preview-info__name-input"
            autoFocus
            value={p.name ?? ''}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setEditingName(false); }}
          />
        ) : (
          <h1
            className="preview-info__name"
            onClick={() => setEditingName(true)}
            title="Click to rename"
          >
            {p.name || 'Untitled'}
          </h1>
        )}

        <p className="preview-info__meta">
          <span>{p.grid.rows}×{p.grid.cols} grid</span>
          <span aria-hidden> · </span>
          <span>last edited {formatTime(p.updatedAt)}</span>
        </p>

        <div className="preview-info__actions">
          <button
            type="button"
            className="action-btn action-btn--primary"
            onClick={() => onNav('grid')}
          >
            ⊞ Edit grid
          </button>
          <button
            type="button"
            className="action-btn action-btn--primary"
            onClick={() => onNav('edit')}
          >
            ✎ Edit pieces
          </button>
        </div>

        <p className="hint">
          Edit the grid layout, or open the Edit page to style edges and fill cells with text/images.
        </p>
      </aside>
    </div>
  );
}
