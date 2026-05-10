import { useEffect, useState } from 'react';
import { useProject } from '../grid/useProject.js';
import PageNav from './components/PageNav.jsx';
import LandingPage from './pages/LandingPage.jsx';
import GridEditorPage from './pages/GridEditorPage.jsx';
import EdgeEditorPage from './pages/EdgeEditorPage.jsx';
import ContentEditorPage from './pages/ContentEditorPage.jsx';
import './styles/App.css';

const THEME_KEY = 'puzzle-studio:theme';

export default function App() {
  const [page, setPage] = useState('landing');
  const project = useProject();
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) || 'dark'; }
    catch { return 'dark'; }
  });

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
        {page === 'landing' && <LandingPage project={project} onNav={setPage} />}
        {page === 'grid'    && <GridEditorPage project={project} />}
        {page === 'edges'   && <EdgeEditorPage project={project} />}
        {page === 'content' && <ContentEditorPage project={project} />}
      </main>
    </div>
  );
}
