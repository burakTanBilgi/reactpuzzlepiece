import { useEffect, useState } from 'react';
import { useProject } from '../grid/useProject.js';
import PageNav from './components/PageNav.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DocsPage from './pages/DocsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import PreviewPage from './pages/PreviewPage.jsx';
import GridEditorPage from './pages/GridEditorPage.jsx';
import EditPage from './pages/EditPage.jsx';
import './styles/App.css';

const THEME_KEY = 'hakoniwa:theme';
const LEGACY_THEME_KEY = 'puzzle-studio:theme';

function loadTheme() {
  try {
    return (
      localStorage.getItem(THEME_KEY) ||
      localStorage.getItem(LEGACY_THEME_KEY) ||
      'dark'
    );
  } catch { return 'dark'; }
}

// On first load, show the Landing page (front door). After the user has
// visited any page, remember it across reloads. Legacy 'edges' / 'cells'
// (the prior split that confused users) collapse back into one 'edit' tab.
const PAGE_KEY = 'hakoniwa:lastPage';
function loadInitialPage() {
  try {
    const raw = localStorage.getItem(PAGE_KEY) || 'landing';
    if (raw === 'edges' || raw === 'cells') return 'edit';
    return raw;
  } catch { return 'landing'; }
}

export default function App() {
  const [page, setPage] = useState(loadInitialPage);
  const project = useProject();
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    try { localStorage.setItem(PAGE_KEY, page); } catch { /* ignore */ }
  }, [page]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app">
      <PageNav
        page={page}
        onNav={setPage}
        projectName={project.project?.name}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="app__page">
        {page === 'landing'  && <LandingPage  onNav={setPage} />}
        {page === 'docs'     && <DocsPage     onNav={setPage} />}
        {page === 'projects' && <ProjectsPage project={project} onNav={setPage} />}
        {page === 'preview'  && <PreviewPage  project={project} onNav={setPage} />}
        {page === 'grid'     && <GridEditorPage project={project} />}
        {page === 'edit'     && <EditPage project={project} />}
      </main>
    </div>
  );
}
