# Yes, it's another clock

I wanted a fullscreen clock on my 2nd monitor while gaming, without being distracting or bright.

A quick search for something like this turned up a few options.
Some had color schemes that worked for me.
But all of them displayed seconds, which is too distracting for my taste.

So here's yet another one!

## Desktop app

Besides the web version, it can be built as a Linux desktop app with [Tauri](https://tauri.app/).
Requires Rust and the [Tauri prerequisites](https://tauri.app/start/prerequisites/#linux).

```sh
pnpm tauri dev    # run in development
pnpm tauri build  # build deb, rpm and AppImage bundles
```

### Releases

Pushing a `v*` tag matching the version in `src-tauri/tauri.conf.json` publishes a release to [CrabNebula Cloud](https://crabnebula.dev/cloud/).
The AppImage checks there on launch and silently installs updates, applied on the next launch.

Requires these repository secrets:

- `CN_API_KEY`: CrabNebula Cloud API key.
- `TAURI_SIGNING_PRIVATE_KEY` and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`: updater signing key, from `pnpm tauri signer generate`.
  Its public key goes in `plugins.updater.pubkey` of `src-tauri/tauri.conf.json`.
