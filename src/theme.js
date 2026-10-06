import { useEffect, useLayoutEffect, useState } from 'react';

// Chart colors are passed to Recharts as hex (SVG attributes don't reliably resolve CSS vars),
// so each theme carries its own validated steps. Keep in sync with the tokens in index.css.
export const PALETTES = {
  light: {
    series1: '#2a78d6',
    series2: '#eb6834',
    grid: '#e1e0d9',
    axis: '#c3c2b7',
    muted: '#898781',
    surface: '#fcfcfb',
  },
  dark: {
    series1: '#3987e5',
    series2: '#d95926',
    grid: '#2c2c2a',
    axis: '#383835',
    muted: '#898781',
    surface: '#1a1a19',
  },
};

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const systemTheme = () => (darkQuery.matches ? 'dark' : 'light');

function storedTheme() {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  // Only an explicit toggle is persisted; otherwise follow the OS setting live.
  const [override, setOverride] = useState(storedTheme);
  const [system, setSystem] = useState(systemTheme);
  const theme = override ?? system;

  useEffect(() => {
    const onChange = () => setSystem(systemTheme());
    darkQuery.addEventListener('change', onChange);
    return () => darkQuery.removeEventListener('change', onChange);
  }, []);

  // Layout effect so the page never paints a frame in the wrong theme.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    // Toggling back to the OS theme clears the override, so it follows the OS again.
    const nextOverride = next === system ? null : next;
    setOverride(nextOverride);
    try {
      if (nextOverride) localStorage.setItem('theme', nextOverride);
      else localStorage.removeItem('theme');
    } catch {
      // storage unavailable; theme still applies for this session
    }
  };

  return { theme, toggle, colors: PALETTES[theme] };
}
