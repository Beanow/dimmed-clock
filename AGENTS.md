# AGENTS.md

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
pnpm tauri build --no-sign  # desktop bundles (deb, rpm, AppImage) → src-tauri/target/release/bundle/
                            # (signing needs the release key; CI release does that)
```

No tests. CI only builds (web deploy + Tauri Linux bundles as artifacts) — run `pnpm lint` locally before committing.

## Design Intent

Low-distraction. UI changes must preserve this.

## Architecture

Single-page Preact app in [src/](src/): [index.jsx](src/index.jsx) owns state, UI lives in [widgets.jsx](src/widgets.jsx). Push to `main` → GitHub Actions builds + deploys to `gh-pages`.

Tauri shell in [src-tauri/](src-tauri/) is minimal: serves `dist/`, plus a few plugins. AppImages silently self-update from CrabNebula Cloud on launch (applied next launch). Tauri-only JS imports go through `isTauri()` + dynamic `import()` so they stay out of the web bundle. New Tauri API calls need permissions in [capabilities/default.json](src-tauri/capabilities/default.json).

`localStorage` key: `beanow:dimmed-clock:config`

## Releasing

`v*` tags → [release-tauri.yml](.github/workflows/release-tauri.yml) publishes a signed release to CrabNebula Cloud. The tag must match `version` in `package.json` (`tauri.conf.json` reads it from there).

1. Bump `version` in `package.json` and `src-tauri/Cargo.toml`.
2. `cargo update -p dimmed-clock --offline` in `src-tauri/` to sync `Cargo.lock`.
3. Commit, tag `vX.Y.Z`, push both.

## Font Subsetting

`CHARS` in [scripts/subset-fonts.mjs](scripts/subset-fonts.mjs). Missing chars → blank. No error.
`src/` adds visible text → check new chars in `CHARS`. Gap → update + `pnpm subset-fonts`. Before task done.
