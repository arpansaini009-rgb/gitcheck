# gitcheck reviewer notes

## Architecture

This is a small Vite-powered React dashboard, configured in `vite.config.js` with `@vitejs/plugin-react`. The entry point `src/main.jsx` mounts `App` under `React.StrictMode` and loads global styles from `src/index.css`. Dashboard data is currently generated in `src/data.js`; theme state and chart-specific color palettes are centralized in `src/theme.js`.

## Conventions

- Use ES modules throughout; `package.json` declares `"type": "module"`, and source files use `import`/`export`.
- React components are mounted through `src/main.jsx` with `ReactDOM.createRoot(...)`; preserve the existing `React.StrictMode` wrapper when changing the root.
- Keep dashboard mock data deterministic. `src/data.js` uses a seeded generator (`seeded(42)`) rather than `Math.random()`, so visual output remains stable across reloads.
- Keep derived data helpers pure and reusable. For example, `revenueByCategory(rows)` accepts rows and returns category totals rather than coupling calculations to rendering.
- Shared theme behavior belongs in `src/theme.js`: `useTheme()` owns state, persistence, and document theme application, while `PALETTES` contains chart colors for each theme.
- Chart colors should remain explicit hex values in `PALETTES`. The comment in `src/theme.js` documents that Recharts SVG attributes do not reliably resolve CSS variables.
- Theme tokens and chart palette steps must stay synchronized with `src/index.css`; this relationship is explicitly called out in `src/theme.js`.
- Browser-only APIs are guarded where storage may be unavailable. Both initial `localStorage` access and writes in `src/theme.js` use `try/catch`; changes should retain this resilience.
- Dates in `src/data.js` are normalized to midnight for daily rows, while recent order timestamps intentionally retain time information.

## Intentional non-standard choices

- `src/data.js` is deliberately mock-only: its header states that deterministic helpers should be replaced with real API calls once a backend exists. Do not flag the absence of a data-fetching layer in dashboard changes.
- The seeded generator is module-scoped and shared by daily metrics and recent orders. Its purpose is stable sample data, not cryptographic randomness or independent per-widget randomness.
- Theme selection falls back to the system preference via `matchMedia` and does not subscribe to later OS theme changes. This is the current simple toggle/persistence model.
- `package.json` has only Vite lifecycle scripts (`dev`, `build`, `preview`) and no test or lint script; do not assume those tools are configured.

## Watch out for

- Replacing the seeded generator with `Math.random()` will make screenshots and dashboard behavior unstable across reloads.
- Adding a theme or changing CSS tokens without updating both `PALETTES` in `src/theme.js` and the corresponding tokens in `src/index.css` can produce mismatched UI and charts.
- Accessing `window`, `document`, or `localStorage` outside the guarded/runtime patterns in `src/theme.js` can break non-browser rendering or environments where storage is unavailable.
- Changing date construction in `src/data.js` can introduce timezone or day-boundary inconsistencies; preserve the explicit midnight normalization for daily metrics.
- Altering the category list without updating `CATEGORY_WEIGHT` risks index-based mismatches in `revenueByCategory()`.