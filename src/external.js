import {isTauri} from "@tauri-apps/api/core";

// Tauri ignores target="_blank", open links in the system browser instead.
export const openLink = (event) => {
	if (!isTauri()) return;
	event.preventDefault();
	const {href} = event.currentTarget;
	import("@tauri-apps/plugin-opener").then(({openUrl}) => openUrl(href));
};
