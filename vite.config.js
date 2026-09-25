import {defineConfig} from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
	base: "./",
	plugins: [
		// devToolsEnabled:false works around zimmerframe ESM/CJS issue in
		// preact:transform-hook-names.
		preact({devToolsEnabled: false}),
	],
	// Tauri expects a fixed port and handles its own rebuilds.
	clearScreen: false,
	server: {
		strictPort: true,
		watch: {ignored: ["**/src-tauri/**"]},
	},
});
