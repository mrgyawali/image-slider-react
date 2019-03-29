import React from "react";

import createReactContext from "create-react-context";

const OptimizeContext = createReactContext();

class Variant extends React.Component {
  render() {
    console.log("this.props", this.props.children.props.children.props);
    console.log("id", this.props.id);
    return (
      <OptimizeContext.Consumer>
        {value =>
          value === this.props.id
            ? this.props.children.props.children.props
            : null
        }
      </OptimizeContext.Consumer>
    );
  }
}

export default Variant;
