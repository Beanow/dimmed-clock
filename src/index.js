import "./style";
import {Component} from "preact";

const PICKER_OPTIONS = [
  {bg: "#000000", fg: "#222222"},
  {bg: "#222222", fg: "#443110"},
  {bg: "#111111", fg: "#1c3b6a"},
];

const FONT_OPTIONS = ["Lato Thin", "Roboto"];

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      fontFamily: FONT_OPTIONS[0],
      ...PICKER_OPTIONS[0],
    };
    this.timeFormat = new Intl.DateTimeFormat("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    this.dateFormat = new Intl.DateTimeFormat("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Lifecycle: Called whenever our component is created
  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({date: new Date()});
    }, 1000);
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  setColor({fg, bg}) {
    this.setState({fg, bg});
  }

  setFont(fontFamily) {
    this.setState({fontFamily});
  }

  render() {
    const time = this.timeFormat.format(this.state.date);
    const date = this.dateFormat.format(this.state.date);
    return (
      <div
        className="pane"
        style={{
          color: this.state.fg,
          background: this.state.bg,
          fontFamily: this.state.fontFamily,
        }}
      >
        <h1 className="time">{time}</h1>
        <h2 className="date">{date}</h2>
        <ColorPicker setColor={this.setColor.bind(this)} />
        <FontPicker setFont={this.setFont.bind(this)} />
      </div>
    );
  }
}

const Swatch = ({bg, fg, setColor}) => (
  <svg
    className="swatch"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    onClick={(_) => setColor({fg, bg})}
  >
    <defs>
      <mask id="only-top">
        <rect x="0" y="0" width="100" height="50" fill="white" />
      </mask>
      <mask id="only-bottom">
        <rect x="0" y="50" width="100" height="50" fill="white" />
      </mask>
    </defs>
    <circle cx="50" cy="50" r="48" mask="url(#only-top)" fill={fg} />
    <circle cx="50" cy="50" r="48" mask="url(#only-bottom)" fill={bg} />
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

const ColorPicker = ({setColor}) => (
  <div className="colorPicker">
    {PICKER_OPTIONS.map(({fg, bg}, i) => (
      <Swatch key={i} {...{fg, bg, setColor}} />
    ))}
  </div>
);

const FontPicker = ({setFont}) => (
  <div className="fontPicker">
    {FONT_OPTIONS.map((family, i) => (
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
