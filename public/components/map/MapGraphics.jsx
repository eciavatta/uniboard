import React from "react";
import "./MapGraphics.scss";
import ClassroomUtils from "../../helpers/classroomUtils";
import {AutoSizer} from 'react-virtualized';
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import Definitions from './parts/definitions';
import Outside from './parts/outside'
import FirstFloor from './parts/firstFloor'
import SecondFloor from './parts/secondFloor'
import CommonSymbols from './parts/commonSymbols'

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

const statusToColor = [
  "#ff8080",
  "#ffe680",
  "#87deaa",
  "#87aade",
  "none"
];

export default class MapGraphics extends React.Component {
  constructor(props) {
    super(props);

    this.registerInputStart = this.registerInputStart.bind(this);
    this.registerInputMove = this.registerInputMove.bind(this);
    this.registerInputEnd = this.registerInputEnd.bind(this);
    this.registerTouchStart = this.registerTouchStart.bind(this);
    this.registerMouseDown = this.registerMouseDown.bind(this);
    this.registerTouchMove = this.registerTouchMove.bind(this);
    this.registerMouseMove = this.registerMouseMove.bind(this);
    this.registerTouchEnd = this.registerTouchEnd.bind(this);
    this.registerMouseUp = this.registerMouseUp.bind(this);
    this.renderClassroom = this.renderClassroom.bind(this);
    this.viewer = null;
    this.prevHash = "";
  }

  componentDidMount() {
    this.tryDoFit();
    this.checkHashChanged();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.tryDoFit();
    this.checkHashChanged();
  }

  tryDoFit() {
    if (!this.doneFit && this.viewer) {
      this.doneFit = true;
      this.viewer.fitToViewer("center", "center");
    }
  }

  checkHashChanged() {
    if (this.prevHash !== this.props.location.hash && this.viewer) {
      this.prevHash = this.props.location.hash;
      setTimeout(() => this.viewer.fitToViewer("center", "center"), 600);
    }
  }

  registerTouchStart(e) {
    this.registerInputStart(e.originalEvent.nativeEvent.targetTouches[0].target);
  }
  registerTouchMove() {this.registerInputMove()}
  registerTouchEnd() {this.registerInputEnd()}

  registerMouseDown(e) {
    if (e.originalEvent.nativeEvent.which === 1) {
      this.registerInputStart(e.originalEvent.target);
    }
  }
  registerMouseMove() {this.registerInputMove()}
  registerMouseUp(e) {
    if (e.originalEvent.nativeEvent.which === 1) {
      this.registerInputEnd();
    }
  }

  registerInputStart(target) {
    this.inputTarget = target;
  }
  registerInputMove() {
    this.inputTarget = null;
  }
  registerInputEnd() {
    if (this.inputTarget && this.inputTarget.classList.contains("clickable-map-classroom")) {
      this.props.history.push("/classrooms#" + this.inputTarget.id);
    }
  }

  render() {
    return (
      <AutoSizer>
        {(({width, height}) => width === 0 || height === 0 ? null : (
          <UncontrolledReactSVGPanZoom
            //this will also be the size of the controlled area, this should depend on the screen size
            width={width}
            height={height}
            //makes the map seamless with the rest of the page
            SVGBackground={"transparent"}
            background={"transparent"}
            //disable miniature and toolbar
            miniatureProps={{position: "none"}}
            toolbarProps={{position: "none"}}
            //needs to be auto in order to enable pan and click detection on svg elements
            tool={"auto"}
            //removes auto pan, so no ugly black border will appear when the cursor is on the borders of this
            detectAutoPan={false}
            //this way react onClick function will work also on mobile touch
            className="map-wrapper"
            onTouchStart={this.registerTouchStart}
            onMouseDown={this.registerMouseDown}
            onTouchMove={this.registerTouchMove}
            onMouseMove={this.registerMouseMove}
            onTouchEnd={this.registerTouchEnd}
            onMouseUp={this.registerMouseUp}
            ref={viewer => this.viewer = viewer}>

            <svg width="1174.6" height="1060.8" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <Definitions />
              <Outside />
              <g id="map" transform="rotate(90 485.56 421.94)">
                <FirstFloor visibility={this.props.floor === 1 ? 'visible' : 'hidden'} classrooms={this.props.classrooms.filter(c => c.floor === 1).map(this.renderClassroom)}/>
                <SecondFloor visibility={this.props.floor === 2 ? 'visible' : 'hidden'} classrooms={this.props.classrooms.filter(c => c.floor === 2).map(this.renderClassroom)}/>
                <CommonSymbols />
              </g>
            </svg>

          </UncontrolledReactSVGPanZoom>
        ))}
      </AutoSizer>
    );
  }

  renderClassroom(classroom) {
    return (
      <polygon
        key={classroom._id}
        style={{"pointerEvents": "auto", "cursor":""}}
        points={classroom.mapCoordinates}
        fill={statusToColor[ClassroomUtils.getStateOfClassroom(classroom, this.props.classroomActivities, this.props.selectedTime).code]}
        strokeWidth={4}
        stroke={this.props.location.hash.substring(1) === classroom._id ? "#483737" : "#fff"}
        id={classroom._id}
        className="clickable-map-classroom"
    />);
  }
}
