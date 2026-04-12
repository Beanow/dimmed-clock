# CLAUDE.md

## Project Overview

Dimmed Clock: fullscreen low-distraction clock for secondary monitors. Preact 10 + Vite.

## Commands

Use `pnpm` (not npm/yarn).

```sh
pnpm dev          # dev server + HMR
pnpm build        # prod build → dist/
pnpm serve        # serve dist/ via sirv (SPA, CORS)
pnpm lint         # ESLint on src/
pnpm format       # Prettier
pnpm subset-fonts # regen subsetted fonts in assets/ (after updating source fonts)
```

No tests.

## Architecture

Single-page Preact app. All source in [src/](src/):

- [index.jsx](src/index.jsx) — Root `App`. Owns state: current time (1s `setInterval`), selected font, pane color. Persists to `localStorage` via [storage.js](src/storage.js).
- [widgets.jsx](src/widgets.jsx) — All UI: `Pane` (styled container), `Clock` (time + date), `ColorPicker` (swatches), `FontPicker`.
- [options.js](src/options.js) — Static config: fonts + color schemes (3 dark themes).
- [fullscreen.js](src/fullscreen.js) — Thin wrapper over `fscreen` for fullscreen toggle.
- [icons.jsx](src/icons.jsx) — Minimal Font Awesome SVG icon (expand only).

`localStorage` key: `beanow:dimmed-clock:config`
