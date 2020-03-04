import fscreen from "fscreen";

export const toggle = () => {
  fscreen.fullscreenElement
    ? fscreen.exitFullscreen()
    : fscreen.requestFullscreen(document.body);
};
