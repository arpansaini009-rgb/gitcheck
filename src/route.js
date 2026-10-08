import { useEffect, useState } from 'react';

// Minimal hash routing: "#contact" is its own page; any other hash is a section of the dashboard.
const PAGES = ['contact'];

const routeFromHash = () => {
  const id = window.location.hash.slice(1);
  return PAGES.includes(id) ? id : 'dashboard';
};

export function useRoute() {
  const [route, setRoute] = useState(routeFromHash);

  useEffect(() => {
    const onChange = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // After switching pages, the browser's own anchor jump ran before the new page rendered,
  // so scroll to the section (or the top) once it exists.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && !PAGES.includes(id) ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [route]);

  return route;
}
