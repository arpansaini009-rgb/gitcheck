import { dateTime } from '../format.js';

// Captured once at load; the mock data is generated at the same moment.
const loadedAt = new Date();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span>© {loadedAt.getFullYear()} Storefront</span>
        <span>Data updated {dateTime(loadedAt)}</span>
      </div>
    </footer>
  );
}
