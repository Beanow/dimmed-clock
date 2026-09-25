import fscreen from "fscreen";
import {isTauri} from "@tauri-apps/api/core";

// WebKitGTK's DOM fullscreen doesn't fullscreen the Tauri window, use the
// native window API instead. Lazy import keeps it out of the web bundle.
const toggleTauri = async () => {
	const {getCurrentWindow} = await import("@tauri-apps/api/window");
	const win = getCurrentWindow();
	await win.setFullscreen(!(await win.isFullscreen()));
};

const toggleWeb = () => {
	fscreen.fullscreenElement
		? fscreen.exitFullscreen()
		: fscreen.requestFullscreen(document.body);
};

export const toggle = isTauri() ? toggleTauri : toggleWeb;
