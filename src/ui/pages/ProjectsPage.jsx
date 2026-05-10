import { useRef } from 'react';
import PreviewSvg from '../components/PreviewSvg.jsx';
import { formatTime } from '../utils/formatTime.js';

// Project library: tiles for every saved project plus an Import control.
// Export options live on the Preview page (one-shot, per project).
export default function ProjectsPage({ project, onNav }) {
  const {
    project: p,
    projects,
    openProject,
    createNew,
    removeProject,
    importFromFile,
  } = project;
  const fileRef = useRef(null);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try { await importFromFile(file); }
    catch (err) { alert('Could not import: ' + err.message); }
  };

  const handleOpen = (id) => {
    openProject(id);
    onNav('preview');
  };

  return (
    <div className="page-projects">
      <section className="projects-section">
        <div className="projects-section__head">
          <h2 className="projects-section__title">Your Projects</h2>
          <div className="projects-section__actions">
            <input ref={fileRef} type="file" accept=".json" hidden onChange={handleImport} />
            <button type="button" className="action-btn" onClick={() => fileRef.current?.click()}>
              ↑ Import JSON
            </button>
          </div>
        </div>

        <div className="project-grid">
          <button
            type="button"
            className="project-tile project-tile--new"
            onClick={() => { createNew(); onNav('preview'); }}
          >
            <div className="project-tile__plus">+</div>
            <div className="project-tile__name">New project</div>
          </button>

          {[...projects].sort((a, b) => b.updatedAt - a.updatedAt).map((proj) => {
            const isCurrent = proj.id === p?.id;
            return (
              <div key={proj.id}
                   className={`project-tile ${isCurrent ? 'project-tile--current' : ''}`}>
                <button type="button" className="project-tile__open" onClick={() => handleOpen(proj.id)}>
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
