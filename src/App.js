import * as React from "react";
import { Experiment, Variant, emitter } from "@marvelapp/react-ab-test";

import "./App.scss";

import img1 from "./assets/pic1.png";
import img2 from "./assets/pic2.png";
import img3 from "./assets/pic3.png";

const images = [{ src: img1 }, { src: img2 }, { src: img3 }];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentDidMount() {
    this.startIntervalRef();
  }

  startIntervalRef = () => {
    this.intervalRef = setInterval(() => {
      const { activeIndex } = this.state;
      this.setState({
        activeIndex: activeIndex < images.length - 1 ? activeIndex + 1 : 0
      });
    }, 5000);
  };

  changeCurrentImage = i => {
    this.setState({
      activeIndex: i
    });
    clearInterval(this.intervalRef);
    this.startIntervalRef();
  };

  render() {
    const { activeIndex } = this.state;
    emitter.defineVariants("My Example", ["A", "B"], [50, 50]);

    return (
      <div className="hero-wrapper pt-5">
        <Experiment ref="experiment" name="My Example">
          <Variant name="A">
            <ul className="slick-dots">
              {images.map((image, i) => (
                <li
                  key={i}
                  onClick={() => this.changeCurrentImage(i)}
                  className={activeIndex === i ? "active" : ""}
                />
              ))}
            </ul>
            {images.map((image, index) => (
              <div
                className={`hero-background ${
                  activeIndex === index ? "" : "hidden"
                }`}
                key={index}
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover"
                }}
              />
            ))}
          </Variant>

          <Variant name="B">
            <div
              className={`hero-background`}
              style={{
                backgroundImage: `url(${images[0]})`,
                backgroundSize: "cover"
              }}
            />
          </Variant>
        </Experiment>

        <div className="hero-content">
          <h1>World First Sneaker Made From Coffee</h1>
        </div>
      </div>
    );
  }
}

export default App;
