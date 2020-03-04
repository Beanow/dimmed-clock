import "preact";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {faExpand} from "@fortawesome/free-solid-svg-icons";

const minimalIcon = ({prefix, iconName, icon}) => () => {
  const [width, height, _unused_ligatures, _unused_unicode, svgPathData] = icon;
  return (
    <svg
      className={`svg-inline--fa fa-${iconName} fa-w-14`}
      focusable="false"
      dataPrefix={prefix}
      dataIcon={iconName}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path fill="currentColor" d={svgPathData}></path>
    </svg>
  );
};

export const Expand = minimalIcon(faExpand);
