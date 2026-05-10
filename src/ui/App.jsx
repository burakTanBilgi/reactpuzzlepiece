import { useEffect, useState } from 'react';
import { useProject } from '../grid/useProject.js';
import PageNav from './components/PageNav.jsx';
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

export default function App() {
  const [page, setPage] = useState('preview');
  const project = useProject();
  const [theme, setTheme] = useState(loadTheme);

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
        {page === 'projects' && <ProjectsPage project={project} onNav={setPage} />}
        {page === 'preview'  && <PreviewPage  project={project} onNav={setPage} />}
        {page === 'grid'     && <GridEditorPage project={project} />}
        {page === 'edit'     && <EditPage      project={project} />}
      </main>
    </div>
  );
}
