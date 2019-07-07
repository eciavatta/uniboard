import React from "react";
import MapGraphics from "./MapGraphics";

const MIN_FLOOR = 1;
const MAX_FLOOR = 2;

export default class MapMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {floor: this.props.initialFloor};
  }

  changeFloor(newFloor) {
    this.setState({floor: newFloor});
  }
  upperFloorClicked() {
    if (this.state.floor < MAX_FLOOR) {
      this.changeFloor(this.state.floor + 1);
    }
  }
  lowerFloorClicked() {
    if (this.state.floor > MIN_FLOOR) {
      this.changeFloor(this.state.floor - 1);
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.upperFloorClicked.bind(this)}>Vai su</button>
        <button onClick={this.lowerFloorClicked.bind(this)}>Vai giù</button>
        <MapGraphics floor={this.state.floor}/>
      </div>
    );
  }

}
