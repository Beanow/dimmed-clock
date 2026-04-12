import {render} from "preact";
import {useState, useEffect} from "preact/hooks";
import * as Widget from "./widgets";
import * as Storage from "./storage";
import * as Options from "./options";
import * as Fullscreen from "./fullscreen";
import "./fonts.css";
import "./style.css";

const timeFormat = new Intl.DateTimeFormat(undefined, {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
});
const dateFormat = new Intl.DateTimeFormat(undefined, {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
});

function App() {
	const [date, setDate] = useState(() => new Date());
	const [fontFamily, setFontFamily] = useState(
		() => Storage.get().fontFamily || Options.Fonts[0]
	);
	const [paneColor, setPaneColor] = useState(
		() => Storage.get().paneColor || Options.Colors[0]
	);

	// Updates title only when time string changed.
	const time = timeFormat.format(date);
	useEffect(() => {
		document.title = `${time} - Dimmed Clock`;
	}, [time]);

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	function setColor({fg, bg}) {
		const paneColor = {fg, bg};
		setPaneColor(paneColor);
		Storage.set({paneColor, fontFamily});
	}

	function setFont(fontFamily) {
		setFontFamily(fontFamily);
		Storage.set({paneColor, fontFamily});
	}

	return (
		<Widget.Pane {...{paneColor, fontFamily}}>
			<Widget.FullScreen onClick={Fullscreen.toggle} />
			<Widget.RepoLink />
			<Widget.Clock {...{date, timeFormat, dateFormat}} />
			<Widget.ColorPicker
				setColor={setColor}
				colorOptions={Options.Colors}
			/>
			<Widget.FontPicker setFont={setFont} fontOptions={Options.Fonts} />
		</Widget.Pane>
	);
}

render(<App />, document.getElementById("app"));
