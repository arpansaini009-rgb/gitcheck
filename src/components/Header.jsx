const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#charts', label: 'Charts' },
  { href: '#orders', label: 'Orders' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#overview">
          <span className="brand-mark" aria-hidden="true">◆</span>
          Storefront
        </a>
        <nav aria-label="Main">
          <ul className="nav">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
