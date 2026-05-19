import { lazy, Suspense, useEffect, useState } from 'react';
import { useProject } from '../grid/useProject.js';
import PageNav from './components/PageNav.jsx';
import LandingPage from './pages/LandingPage.jsx';
import './styles/App.css';

// Non-landing pages are code-split: only Landing + PageNav are in the
// initial bundle, so first paint stays light. Each lazy chunk loads on
// demand the first time the user navigates to that page.
const DocsPage       = lazy(() => import('./pages/DocsPage.jsx'));
const ProjectsPage   = lazy(() => import('./pages/ProjectsPage.jsx'));
const PreviewPage    = lazy(() => import('./pages/PreviewPage.jsx'));
const GridEditorPage = lazy(() => import('./pages/GridEditorPage.jsx'));
const EditPage       = lazy(() => import('./pages/EditPage.jsx'));

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
      {/* Keyboard-only "skip to content" — appears only when focused, so
          screen reader / Tab users can jump past the page-nav strip.
          A long-standing WCAG 2.4.1 (Bypass Blocks) pattern. */}
      <a href="#app-main" className="app__skip-link">Skip to main content</a>

      <PageNav
        page={page}
        onNav={setPage}
        projectName={project.project?.name}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="app__page" id="app-main" tabIndex={-1}>
        {page === 'landing'  && <LandingPage onNav={setPage} />}
        {page !== 'landing'  && (
          <Suspense fallback={<div className="app__page-loading" aria-live="polite">Loading…</div>}>
            {page === 'docs'     && <DocsPage     onNav={setPage} />}
            {page === 'projects' && <ProjectsPage project={project} onNav={setPage} />}
            {page === 'preview'  && <PreviewPage  project={project} onNav={setPage} />}
            {page === 'grid'     && <GridEditorPage project={project} />}
            {page === 'edit'     && <EditPage     project={project} />}
          </Suspense>
        )}
      </main>
    </div>
  );
}
