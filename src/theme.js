import { useEffect, useState } from 'react';

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

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || systemTheme();
    } catch {
      return systemTheme();
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // storage unavailable; theme still applies for this session
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle, colors: PALETTES[theme] };
}
