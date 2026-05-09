import { useRef, useState } from 'react';
import PreviewSvg from '../components/PreviewSvg.jsx';

export default function LandingPage({ project, onNav }) {
  const {
    project: p,
    projects,
    setName,
    openProject,
    createNew,
    removeProject,
    exportCurrent,
    importFromFile,
  } = project;
  const fileRef = useRef(null);
  const [editingName, setEditingName] = useState(false);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      await importFromFile(file);
    } catch (err) {
      alert('Could not import: ' + err.message);
    }
  };

  return (
    <div className="page-landing">
      <section className="landing-hero">
        <div className="landing-hero__preview">
          <PreviewSvg project={p} maxSize={220} />
        </div>
        <div className="landing-hero__info">
          {editingName ? (
            <input
              className="landing-hero__name-input"
              autoFocus
              value={p?.name ?? ''}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setEditingName(false); }}
            />
          ) : (
            <h1 className="landing-hero__name" onClick={() => setEditingName(true)} title="Click to rename">
              {p?.name || 'Untitled'}
            </h1>
          )}
          <p className="landing-hero__meta">
            {p?.grid.rows}×{p?.grid.cols} grid
            {p ? ` · last edited ${formatTime(p.updatedAt)}` : ''}
          </p>
          <div className="landing-hero__actions">
            <button type="button" className="action-btn action-btn--primary" onClick={() => onNav('grid')}>
              ⊞ Edit Grid
            </button>
            <button type="button" className="action-btn action-btn--primary" onClick={() => onNav('edges')}>
              ∿ Edit Edges
            </button>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section__head">
          <h2 className="landing-section__title">Your Projects</h2>
          <div className="landing-section__actions">
            <input ref={fileRef} type="file" accept=".json" hidden onChange={handleImport} />
            <button type="button" className="action-btn action-btn--ghost" onClick={() => fileRef.current?.click()}>
              ↑ Import
            </button>
            <button type="button" className="action-btn action-btn--ghost" onClick={exportCurrent}>
              ↓ Export
            </button>
          </div>
        </div>

        <div className="project-grid">
          <button type="button" className="project-tile project-tile--new" onClick={createNew}>
            <div className="project-tile__plus">+</div>
            <div className="project-tile__name">New project</div>
          </button>

          {[...projects].sort((a, b) => b.updatedAt - a.updatedAt).map((proj) => {
            const isCurrent = proj.id === p?.id;
            return (
              <div key={proj.id}
                   className={`project-tile ${isCurrent ? 'project-tile--current' : ''}`}>
                <button type="button" className="project-tile__open" onClick={() => openProject(proj.id)}>
                  <div className="project-tile__preview">
                    <PreviewSvg project={proj} maxSize={140} />
                  </div>
                  <div className="project-tile__name">{proj.name || 'Untitled'}</div>
                  <div className="project-tile__meta">
                    {proj.grid.rows}×{proj.grid.cols} · {formatTime(proj.updatedAt)}
                  </div>
                </button>
                <button type="button" className="project-tile__del"
                  onClick={() => { if (confirm(`Delete "${proj.name}"?`)) removeProject(proj.id); }}
                  title="Delete">
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function formatTime(ts) {
  const d = new Date(ts);
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString();
}
