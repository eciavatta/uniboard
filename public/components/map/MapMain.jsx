import React from "react";
import MapGraphics from "./MapGraphics";
import Profile from "../profile/Profile";
import axios from "axios";
import ClassroomUtils from "../../helpers/classroomUtils";

const MIN_FLOOR = 1;
const MAX_FLOOR = 2;

const REFRESH_TIMEOUT = 10 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class MapMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'floor': this.props.initialFloor,
      'classroomActivities': {}
    };

    this.keepUpdating = true;

    this.changeFloor = this.changeFloor.bind(this);
    this.upperFloorClicked = this.upperFloorClicked.bind(this);
    this.lowerFloorClicked = this.lowerFloorClicked.bind(this);
    this.updateData = this.updateData.bind(this);

    console.log("Costruito, props");
    console.log(this.props.classroomStaticData);
    this.updateData();
  }

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  updateData() {
    axios.get('/api/classrooms/activities?includeCurrentStatusByReport=true').then(
      res => {
        if (this.keepUpdating) {
          console.log("Map data updated");
          this.setState({'classroomActivities': ClassroomUtils.prepareClassroomActivitiesData(res.data)});
          setTimeout(this.updateData, REFRESH_TIMEOUT);
        }
      },
      err => {
        if (this.keepUpdating) {
          console.log("Error retrieving classroom list data, will try again in a short while");
          console.log(err);
          console.log(err.response);
          setTimeout(this.updateData, ON_ERROR_REFRESH_TIMEOUT);
        }
      }
    );
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
        <button onClick={this.upperFloorClicked}>Vai su</button>
        <button onClick={this.lowerFloorClicked}>Vai giù</button>
        <MapGraphics
          floor={this.state.floor}
          selectedTime={ClassroomUtils.dateToHalfHoursTime(new Date())} //TODO slider
          classrooms={this.props.classroomStaticData}
          classroomActivities={this.state.classroomActivities}/>
        <Profile/>
      </div>
    );
  }

}
