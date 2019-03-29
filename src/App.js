import * as React from "react";
import { Experiment, Variant } from "react-optimize";

import "./App.scss";

import VariantRandom from "./data";

import img1 from "./assets/pic1.png";
import img2 from "./assets/pic2.png";
import img3 from "./assets/pic3.png";

const images = [
  {
    src: img1
  },
  { src: img2 },
  { src: img3 }
];
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
    return (
      <div className="hero-wrapper pt-5">
        <Experiment id="wx1VYmrRRr-NAHQLF7JoUA">
          <Variant id="0">
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

            <div className="hero-content">
              <h1>WORLDS FIRST SNEAKER MADE FROM COFFEE</h1>
            </div>
          </Variant>
          <Variant id="1">
            <VariantRandom />
          </Variant>
        </Experiment>
      </div>
    );
  }
}

export default App;
