import {defineConfig} from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
	base: "./",
	plugins: [
		// devToolsEnabled:false works around zimmerframe ESM/CJS issue in
		// preact:transform-hook-names.
		preact({devToolsEnabled: false}),
	],
});
