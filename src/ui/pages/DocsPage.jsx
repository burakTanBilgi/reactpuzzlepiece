import { useState } from 'react';
import IntroSection from '../components/docs/IntroSection.jsx';
import ProjectsDocsSection from '../components/docs/ProjectsDocsSection.jsx';
import PreviewDocsSection from '../components/docs/PreviewDocsSection.jsx';
import GridDocsSection from '../components/docs/GridDocsSection.jsx';
import EditDocsSection from '../components/docs/EditDocsSection.jsx';
import ExportDocsSection from '../components/docs/ExportDocsSection.jsx';

const SECTIONS = [
  { id: 'intro',    label: 'Welcome',       Comp: IntroSection },
  { id: 'projects', label: 'Projects tab',  Comp: ProjectsDocsSection },
  { id: 'preview',  label: 'Preview tab',   Comp: PreviewDocsSection },
  { id: 'grid',     label: 'Grid tab',      Comp: GridDocsSection },
  { id: 'edit',     label: 'Edit tab',      Comp: EditDocsSection },
  { id: 'export',   label: 'Exporting',     Comp: ExportDocsSection },
];

export default function DocsPage({ onNav }) {
  const [section, setSection] = useState('intro');
  const Section = (SECTIONS.find((s) => s.id === section) || SECTIONS[0]).Comp;

  return (
    <div className="page-docs">
      <aside className="docs-nav">
        <h2 className="docs-nav__title">Documentation</h2>
        <nav>
          <ul className="docs-nav__list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={`docs-nav__item ${section === s.id ? 'docs-nav__item--active' : ''}`}
                  onClick={() => setSection(s.id)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="docs-nav__cta">
          <button
            type="button"
            className="action-btn action-btn--primary"
            onClick={() => onNav('projects')}
          >
            Open the app →
          </button>
        </div>
      </aside>

      <article className="docs-body">
        <Section onNav={onNav} />
      </article>
    </div>
  );
}
