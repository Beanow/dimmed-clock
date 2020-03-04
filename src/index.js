import {Component} from "preact";
import * as Widget from "./widgets";
import * as Storage from "./storage";
import * as Options from "./options";
import * as Fullscreen from "./fullscreen";
import "./fonts";
import "./style";

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
    this.state = {
      date: new Date(),
      fontFamily: Options.Fonts[0],
      paneColor: Options.Colors[0],
      timeFormat: new Intl.DateTimeFormat(localeStr, timeFormatOptions),
      dateFormat: new Intl.DateTimeFormat(localeStr, dateFormatOption),
    };
  }

  componentDidMount() {
    const {paneColor, fontFamily} = Storage.get();
    this.setState({
      fontFamily: fontFamily || Options.Fonts[0],
      paneColor: paneColor || Options.Colors[0],
    });

    this.timer = setInterval(() => {
      this.setState({date: new Date()});
    }, 1000);
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
    const {paneColor, fontFamily, date, timeFormat, dateFormat} = this.state;
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
