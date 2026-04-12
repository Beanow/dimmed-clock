import {Fragment} from "preact";
import * as Icon from "./icons";

function tzOffset(date) {
	const offset = -date.getTimezoneOffset();
	const sign = offset >= 0 ? "+" : "-";
	const hours = Math.floor(Math.abs(offset) / 60);
	const mins = Math.abs(offset) % 60;
	return mins
		? `UTC${sign}${hours}:${String(mins).padStart(2, "0")}`
		: `UTC${sign}${hours}`;
}

export const Clock = ({date, timeFormat, dateFormat}) => (
	<Fragment>
		<h1 className="time">{timeFormat.format(date)}</h1>
		<h2 className="date">
			{dateFormat.format(date)} · {tzOffset(date)}
		</h2>
	</Fragment>
);

export const Swatch = ({bg, fg, setColor}) => (
	<svg
		className="swatch"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
		onClick={(_) => setColor({fg, bg})}
	>
		<defs>
			<mask id={`only-top-${fg}`}>
				<rect x="0" y="0" width="100" height="50" fill="white" />
			</mask>
			<mask id={`only-bottom-${bg}`}>
				<rect x="0" y="50" width="100" height="50" fill="white" />
			</mask>
		</defs>
		<circle
			cx="50"
			cy="50"
			r="48"
			mask={`url(#only-top-${fg})`}
			fill={fg}
		/>
		<circle
			cx="50"
			cy="50"
			r="48"
			mask={`url(#only-bottom-${bg})`}
			fill={bg}
		/>
		<circle
			cx="50"
			cy="50"
			r="48"
			fill="transparent"
			strokeWidth="2"
			stroke="#555"
		/>
	</svg>
);

export const ColorPicker = ({setColor, colorOptions}) => (
	<div className="colorPicker">
		{colorOptions.map(({fg, bg}, i) => (
			<Swatch key={i} {...{fg, bg, setColor}} />
		))}
	</div>
);

export const FontPicker = ({setFont, fontOptions}) => (
	<div className="fontPicker">
		{fontOptions.map((family, i) => (
			<a
				key={i}
				className="font"
				style={{fontFamily: family}}
				onClick={(_) => setFont(family)}
			>
				84
			</a>
		))}
	</div>
);

export const Pane = ({paneColor, fontFamily, children}) => (
	<div
		className="pane"
		style={{
			color: paneColor.fg,
			backgroundColor: paneColor.bg,
			fontFamily: fontFamily,
		}}
	>
		{children}
	</div>
);

export const FullScreen = ({onClick}) => (
	<a className="fullscreen" onClick={onClick}>
		<Icon.Expand />
	</a>
);

export const RepoLink = () => (
	<a
		className="repo-link"
		href="https://github.com/Beanow/dimmed-clock/"
		target="_blank"
		rel="noopener noreferrer"
	>
		<Icon.Github />
	</a>
);
