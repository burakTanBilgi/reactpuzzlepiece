import WaveDivider from './meta/WaveDivider.jsx';

const PAGES = [
  { id: 'landing',  label: 'Landing',  icon: '⌂' },
  { id: 'docs',     label: 'Docs',     icon: '?' },
  { id: 'projects', label: 'Projects', icon: '⚏' },
  { id: 'preview',  label: 'Preview',  icon: '◇' },
  { id: 'grid',     label: 'Grid',     icon: '⊞' },
  { id: 'edges',    label: 'Edges',    icon: '∿' },
  { id: 'cells',    label: 'Cells',    icon: '✎' },
];

export default function PageNav({ page, onNav, projectName, theme, onToggleTheme }) {
  const isDark = theme === 'dark';
  return (
    <>
    <header className="page-nav">
      <div className="page-nav__brand">
        <span className="page-nav__mark" aria-hidden>箱</span>
        <span className="page-nav__title">Hakoniwa</span>
        {projectName && (
          <>
            <span className="page-nav__sep" aria-hidden>·</span>
            <span className="page-nav__project">{projectName}</span>
          </>
        )}
      </div>

      <button
        type="button"
        className="page-nav__theme"
        onClick={onToggleTheme}
        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-label="Toggle theme"
      >
        <span aria-hidden>{isDark ? '☾' : '☀'}</span>
      </button>

      <nav className="page-nav__tabs">
        {PAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`page-nav__tab ${page === p.id ? 'page-nav__tab--active' : ''}`}
            onClick={() => onNav(p.id)}
          >
            <span className="page-nav__icon" aria-hidden>{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </nav>
    </header>
    <WaveDivider className="page-nav-wave" height={10} amplitude={3} strokeWidth={1.25} />
    </>
  );
}
