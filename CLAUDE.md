# CLAUDE.md

## Project Overview

Dimmed Clock: fullscreen low-distraction clock for secondary monitors. Preact 10 + Vite. Targets web and Tauri v2 (Linux desktop).

## Commands

Use `pnpm` (not npm/yarn).

```sh
pnpm dev          # dev server + HMR
pnpm build        # prod build → dist/
pnpm serve        # serve dist/ via sirv (SPA, CORS)
pnpm lint         # ESLint on src/
pnpm format       # Prettier
pnpm subset-fonts # regen subsetted fonts in assets/ (after updating CHARS)
pnpm tauri dev    # desktop app + HMR (needs Rust + webkit2gtk-4.1)
pnpm tauri build  # desktop bundles (deb, rpm, AppImage) → src-tauri/target/release/bundle/
```

No tests. CI only builds (web deploy + Tauri Linux bundles as artifacts) — run `pnpm lint` locally before committing.

## Design Intent

Low-distraction. UI changes must preserve this.

## Architecture

Single-page Preact app. Source in [src/](src/), build scripts in [scripts/](scripts/). Push to `main` → GitHub Actions builds + deploys to `gh-pages`.

- [index.jsx](src/index.jsx) — Root `App`. Owns state: current time (1s `setInterval`), selected font, pane color. Persists to `localStorage` via [storage.js](src/storage.js).
- [widgets.jsx](src/widgets.jsx) — All UI: `Pane` (styled container), `Clock` (time + date), `ColorPicker` (swatches), `FontPicker`.
- [options.js](src/options.js) — Static config: fonts + color schemes (3 dark themes).
- [fullscreen.js](src/fullscreen.js) — Fullscreen toggle. `fscreen` on web, native window API in Tauri.
- [external.js](src/external.js) — Opens links in the system browser when in Tauri.
- [icons.jsx](src/icons.jsx) — Minimal Font Awesome SVG icon (expand only).

Tauri shell in [src-tauri/](src-tauri/) is minimal: serves `dist/`, plus the opener and updater plugins. AppImages silently self-update from CrabNebula Cloud on launch (applied next launch). `v*` tags → [release-tauri.yml](.github/workflows/release-tauri.yml) publishes a signed release; the tag must match `version` in `tauri.conf.json`. Tauri-only JS imports go through `isTauri()` + dynamic `import()` so they stay out of the web bundle. New Tauri API calls need permissions in [capabilities/default.json](src-tauri/capabilities/default.json).

`localStorage` key: `beanow:dimmed-clock:config`

## Font Subsetting

`CHARS` in [scripts/subset-fonts.mjs](scripts/subset-fonts.mjs). Missing chars → blank. No error.
`src/` adds visible text → check new chars in `CHARS`. Gap → update + `pnpm subset-fonts`. Before task done.
