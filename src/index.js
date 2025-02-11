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

import { check } from '@crabnebula/taurify-api/updater'
import { relaunch } from '@crabnebula/taurify-api/process'

(async () => {
  try {
    const update = await check()
  
    if (update) {
      console.log("found update", update)
      let contentLength = 0
      let downloaded = 0
      update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength
            console.log('download started, total bytes:', contentLength)
            break
          case 'Progress':
            downloaded += event.data.chunkLength
            console.log('download progress', Math.round(downloaded / contentLength * 100))
            break
          case 'Finished':
            console.log('Installation complete, restarting...')
            setTimeout(async () => {
              // the update can either be an app update, or an over-the-air update
              if (update.kind === 'app') {
                // for app updates we must restart the app
                await relaunch()
              } else {
                // for over-the-air updates we can just reload the application
                window.location.reload()
              }
            }, 2000)
            break
        }
      })
    } else {
      console.log('Already up to date')
    }
  } catch (e) {
    console.error(e)
    throw e;
  }
})();

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
