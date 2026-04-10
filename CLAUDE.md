# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dimmed Clock is a fullscreen, low-distraction clock app intended for secondary monitors. Built with Preact 10 + Vite.

## Commands

Use `pnpm` (not npm/yarn).

```sh
pnpm dev       # Start Vite dev server with HMR
pnpm build     # Production build to dist/
pnpm serve     # Serve built app via sirv (SPA mode, CORS enabled)
pnpm lint          # ESLint on src/
pnpm format        # Prettier formatting
pnpm subset-fonts  # Regenerate subsetted font files in assets/ (run after updating source fonts)
```

There are no tests.

To query dependencies, prefer `pnpm why <pkg>` or `pnpm list` over reading `pnpm-lock.yaml`.

## Architecture

Single-page Preact app. All source is in [src/](src/):

- [index.jsx](src/index.jsx) — Root `App` component. Owns all state: current time (updated every 1s via `setInterval`), selected font, and pane color. Persists preferences to `localStorage` via [storage.js](src/storage.js).
- [widgets.jsx](src/widgets.jsx) — All UI components: `Pane` (styled container), `Clock` (time + date display), `ColorPicker` (swatches), `FontPicker`.
- [options.js](src/options.js) — Static config: available fonts and color schemes (3 dark themes).
- [fullscreen.js](src/fullscreen.js) — Thin wrapper around the `fscreen` library for fullscreen toggle.
- [icons.jsx](src/icons.jsx) — Minimal Font Awesome SVG icon component (expand icon only).

Component tree:

```
App
└── Pane (background/foreground colors from selected scheme)
    ├── FullScreen button
    ├── Clock (HH:MM + full date, viewport-relative font sizes)
    ├── ColorPicker (3 predefined dark schemes)
    └── FontPicker (Lato Thin / Roboto)
```

`localStorage` key: `beanow:dimmed-clock:config`

## Code Style

ESLint enforces `@eslint-react` rules. Unused variables prefixed with `_` are ignored. CSS is also linted. Run `pnpm format` before committing.
