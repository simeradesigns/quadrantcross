// I've seen a few of these BB-8 animations about, so I thought I'd take a shot at building one using React as a bit of an exercise. My favorite thing to do is draw circles around him to make him do a little jig, but I'm easily amused.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droidX: 0,
      mouseX: 0,
      toTheRight: true,
      speed: 2,
      accelMod: 0.5,
    };
  }

  // Keep track of the mouse position.
  handleMouseMove(event) {
    this.setState({
      mouseX: event.pageX,
    });
  }

  // Speed Mod Bar
  handleSpeedChange(e) {
    if (parseFloat(e.target.value)) {
      this.setState({
        speed: e.target.value,
      });
    }
  }

  // Acceleration Mod Bar
  handleAccelChange(e) {
    if (parseFloat(e.target.value)) {
      this.setState({
        accelMod: e.target.value,
      });
    }
  }

  // Get moving!
  movement() {
    let { droidX, mouseX, speed, accelMod } = this.state;

    // Need a pretty strict if statement to make sure React doesn't end up in a
    // render loop with all the state changes / re-rendering going on.
    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      let distance = mouseX - droidX;
      let acceleration = Math.abs(distance * accelMod) / 100;

      // Move to the right
      if (droidX < mouseX) {
        this.setState({
          droidX: droidX + speed * acceleration,
          toTheRight: true,
        });
      }

      // Move to the left
      else {
        this.setState({
          droidX: droidX - speed * acceleration,
          toTheRight: false,
        });
      }
    }
  }

  // Get some initial movement on first mount.
  componentWillMount() {
    this.setState({
      mouseX: 300,
    });
  }

  // Set up the mouse event listener and fire up the movement function.
  componentDidMount() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    setInterval(this.movement.bind(this), 1);
  }

  // Clean up.
  componentWillUnmount() {
    document.removeEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  // Away we go.
  render() {
    let { speed, accelMod, droidX, mouseX, toTheRight } = this.state;

    return React.createElement(
      "div",
      null,


      React.createElement(
        "div",
        {
          className: "bb8",
          style: { WebkitTransform: `translateX(${droidX}px)` },
        },
        React.createElement(
          "div",
          {
            className: "antennas " + (toTheRight ? "right" : ""),
            style: {
              WebkitTransform: `translateX(${
                (mouseX - droidX) / 25
              }px) rotateZ(${(mouseX - droidX) / 80}deg)`,
            },
          },
          React.createElement("div", { className: "antenna short" }),
          React.createElement("div", { className: "antenna long" })
        ),

        React.createElement(
          "div",
          {
            className: "head",
            style: {
              WebkitTransform: `translateX(${
                (mouseX - droidX) / 15
              }px) rotateZ(${(mouseX - droidX) / 25}deg)`,
            },
          },
          React.createElement("div", { className: "stripe one" }),
          React.createElement("div", { className: "stripe two" }),

          React.createElement(
            "div",
            { className: "stripe detail " + (toTheRight ? "right" : "") },
            React.createElement("div", { className: "detail zero" }),
            React.createElement("div", { className: "detail zero" }),
            React.createElement("div", { className: "detail one" }),
            React.createElement("div", { className: "detail two" }),
            React.createElement("div", { className: "detail three" }),
            React.createElement("div", { className: "detail four" }),
            React.createElement("div", { className: "detail five" }),
            React.createElement("div", { className: "detail five" })
          ),

          React.createElement("div", { className: "stripe three" })
        ),

        React.createElement(
          "div",
          {
            className: "ball",
            style: { WebkitTransform: `rotateZ(${droidX / 2}deg)` },
          },
          React.createElement("div", { className: "lines one" }),
          React.createElement("div", { className: "lines two" }),
          React.createElement("div", { className: "ring one" }),
          React.createElement("div", { className: "ring two" }),
          React.createElement("div", { className: "ring three" })
        ),

        React.createElement("div", { className: "shadow" })
      ),

     
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
