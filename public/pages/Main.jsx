import React from "react";
import SinglePage from '../layouts/SinglePage'
import MapGraphics from "../components/map/MapGraphics";
import axios from "axios";
import ClassroomUtils from "../helpers/classroomUtils";

import './Main.scss';

const MIN_FLOOR = 1;
const MAX_FLOOR = 2;

const REFRESH_TIMEOUT = 10 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class MapMain extends React.Component {
  constructor(props) {
    super(props);

    let initialTime = ClassroomUtils.dateToHalfHoursTime(new Date());
    if (initialTime < 18) {
      initialTime = 18;
    } else if (initialTime > 37) {
      initialTime = 37;
    }

    this.state = {
      'floor': 1,
      'classroomActivities': {},
      'selectedTime': initialTime
    };

    this.keepUpdating = true;
    this.prevHash = "";

    this.changeFloor = this.changeFloor.bind(this);
    this.upperFloorClicked = this.upperFloorClicked.bind(this);
    this.lowerFloorClicked = this.lowerFloorClicked.bind(this);
    this.timeChanged = this.timeChanged.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  componentDidMount() {
    this.updateData();
    this.checkHashChanged();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.checkHashChanged();
  }

  checkHashChanged() {
    if (this.prevHash !== this.props.location.hash) {
      this.prevHash = this.props.location.hash;
      const hashClassroom = ClassroomUtils.findClassroomById(this.props.location.hash.substring(1),this.props.classroomStaticData);
      if (hashClassroom) {
        this.changeFloor(hashClassroom.floor);
      }
    }
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
  upEnabled() {
    return this.state.floor < MAX_FLOOR;
  }
  upperFloorClicked() {
    if (this.upEnabled()) {
      this.changeFloor(this.state.floor + 1);
    }
  }
  downEnabled() {
    return this.state.floor > MIN_FLOOR;
  }
  lowerFloorClicked() {
    if (this.downEnabled()) {
      this.changeFloor(this.state.floor - 1);
    }
  }

  timeChanged(e) {
    this.setState({'selectedTime': e.target.value});
  }

  render() {
    return (
      <SinglePage isLogged={this.props.isLogged} pageTitle="Mappa">
        <div className="map-container">

        <MapGraphics
          location={this.props.location}
          history={this.props.history}
          floor={this.state.floor}
          selectedTime={this.state.selectedTime}
          classrooms={this.props.classroomStaticData}
          classroomActivities={this.state.classroomActivities}/>

          <div className="floor-buttons-container">
            <div className="row">
              <div className="col-9 col-md-10 col-lg-11"/>
              <div className="col-3 col-md-2 col-lg-1">
                <img
                  className="floor-button clickable"
                  src={"../../static/images/mapFloorUp" + (this.upEnabled() ? "" : "_disabled") + ".png"}
                  alt={"Floor up " + (this.upEnabled() ? "" : " (disabled)")}
                  onClick={this.upperFloorClicked}/>
              </div>
            </div>

            <div className="row">
              <div className="col-9 col-md-10 col-lg-11"/>
              <div className="col-3 col-md-2 col-lg-1">
                <img
                  className="floor-button"
                  src={"../../static/images/mapLayerFloor" + this.state.floor + ".png"}
                  alt={"Current floor: " + this.state.floor}/>
              </div>
            </div>

            <div className="row">
              <div className="col-9 col-md-10 col-lg-11"/>
              <div className="col-3 col-md-2 col-lg-1">
                <img
                  className="floor-button clickable"
                  src={"../../static/images/mapFloorDown" + (this.downEnabled() ? "" : "_disabled") + ".png"}
                  alt={"Floor down " + (this.downEnabled() ? "" : " (disabled)")}
                  onClick={this.lowerFloorClicked}/>
              </div>
            </div>
          </div>
        </div>

        <div className="outer-slider-container row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="row">
              <div className="col-2">
                <div className="time-slider-value">
                  {Math.floor(this.state.selectedTime/2) + ":" + (this.state.selectedTime % 2 === 0 ? "00" : "30")}
                </div>
              </div>
              <div className="col-10">
                <input type="range" min="18" max="37" value={this.state.selectedTime} onChange={this.timeChanged} className="time-slider"/>
              </div>
            </div>
          </div>
        </div>
      </SinglePage>
    );
  }

}
