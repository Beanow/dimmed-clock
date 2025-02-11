import {getCurrentWindow} from "@crabnebula/taurify-api/window";

export const toggle = async () => {
  const w = getCurrentWindow();
  await w.setFullscreen(!(await w.isFullscreen()));
};
