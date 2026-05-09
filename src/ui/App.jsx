import { useState } from 'react';
import { useProject } from '../grid/useProject.js';
import PageNav from './components/PageNav.jsx';
import LandingPage from './pages/LandingPage.jsx';
import GridEditorPage from './pages/GridEditorPage.jsx';
import EdgeEditorPage from './pages/EdgeEditorPage.jsx';
import './styles/App.css';

export default function App() {
  const [page, setPage] = useState('landing');
  const project = useProject();

  return (
    <div className="app">
      <PageNav page={page} onNav={setPage} projectName={project.project?.name} />
      <main className="app__page">
        {page === 'landing' && <LandingPage project={project} onNav={setPage} />}
        {page === 'grid'    && <GridEditorPage project={project} />}
        {page === 'edges'   && <EdgeEditorPage project={project} />}
      </main>
    </div>
  );
}
