import {Component, render} from "preact";
import * as Widget from "./widgets";
import * as Storage from "./storage";
import * as Options from "./options";
import * as Fullscreen from "./fullscreen";
import "./fonts.css";
import "./style.css";

const localeStr = undefined;
const timeFormatOptions = {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
};
const dateFormatOption = {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
};

export default class App extends Component {
	constructor() {
		super();
		const {paneColor, fontFamily} = Storage.get();
		this.state = {
			date: new Date(),
			fontFamily: fontFamily || Options.Fonts[0],
			paneColor: paneColor || Options.Colors[0],
			timeFormat: new Intl.DateTimeFormat(localeStr, timeFormatOptions),
			dateFormat: new Intl.DateTimeFormat(localeStr, dateFormatOption),
		};
	}

	tick() {
		const date = new Date();
		document.title = `${this.state.timeFormat.format(date)} - Dimmed Clock`;
		this.setState({date});
	}

	componentDidMount() {
		this.tick();
		this.timer = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	remember(overrides) {
		const {paneColor, fontFamily} = this.state;
		Storage.set({paneColor, fontFamily, ...overrides});
	}

	setColor({fg, bg}) {
		const paneColor = {fg, bg};
		this.setState({paneColor});
		this.remember({paneColor});
	}

	setFont(fontFamily) {
		this.setState({fontFamily});
		this.remember({fontFamily});
	}

	render() {
		const {paneColor, fontFamily, date, timeFormat, dateFormat} =
			this.state;
		return (
			<Widget.Pane {...{paneColor, fontFamily}}>
				<Widget.FullScreen onClick={Fullscreen.toggle} />
				<Widget.Clock {...{date, timeFormat, dateFormat}} />
				<Widget.ColorPicker
					setColor={this.setColor.bind(this)}
					colorOptions={Options.Colors}
				/>
				<Widget.FontPicker
					setFont={this.setFont.bind(this)}
					fontOptions={Options.Fonts}
				/>
			</Widget.Pane>
		);
	}
}

render(<App />, document.getElementById("app"));
