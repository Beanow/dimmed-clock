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
