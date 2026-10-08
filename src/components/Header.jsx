const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#charts', label: 'Charts' },
  { href: '#orders', label: 'Orders' },
  { href: '#gallery', label: 'Gallery', route: 'gallery' },
  { href: '#contact', label: 'Contact', route: 'contact' },
];

export default function Header({ route, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#overview">
          <span className="brand-mark" aria-hidden="true">◆</span>
          Storefront
        </a>
        <div className="header-right">
          <nav aria-label="Main">
            <ul className="nav">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={l.route === route ? 'active' : ''} aria-current={l.route === route ? 'page' : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </header>
  );
}
