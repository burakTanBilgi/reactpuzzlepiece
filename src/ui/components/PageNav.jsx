const PAGES = [
  { id: 'landing', label: 'Home', icon: '◇' },
  { id: 'grid',    label: 'Grid', icon: '⊞' },
  { id: 'edges',   label: 'Edges', icon: '∿' },
  { id: 'content', label: 'Content', icon: '✎' },
];

export default function PageNav({ page, onNav, projectName, theme, onToggleTheme }) {
  const isDark = theme === 'dark';
  return (
    <header className="page-nav">
      <div className="page-nav__brand">
        <span className="page-nav__mark" aria-hidden>◆</span>
        <span className="page-nav__title">Puzzle Studio</span>
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
  );
}
