import React from "react";
import "./MapGraphics.scss";
import ClassroomUtils from "../../helpers/classroomUtils";
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
  "#f00",
  "#ff0",
  "#0f0",
  "#00f",
  "none"];

export default class MapGraphics extends React.Component {
  constructor(props) {
    super(props);

    this.registerTouchStart = this.registerTouchStart.bind(this);
    this.registerTouchMove = this.registerTouchMove.bind(this);
    this.registerTouchEnd = this.registerTouchEnd.bind(this);
    this.renderClassroom = this.renderClassroom.bind(this);
  }

  registerTouchStart(e) {
    this.touchState = e.originalEvent.nativeEvent.targetTouches[0].target; //get element that would be clicked
  }
  registerTouchMove() {
    this.touchState = null; //this should not be considered a click anymore
  }
  registerTouchEnd() {
    if (this.touchState) {
      eventFire(this.touchState, 'click'); //simulate click on element
    }
  }

  render() {
    return (
      <UncontrolledReactSVGPanZoom
        //this will also be the size of the controlled area, this should depend on the screen size
        width="100%"
        height="100%"
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
        onTouchMove={this.registerTouchMove}
        onTouchEnd={this.registerTouchEnd}>

        <svg width="1174.6" height="1060.8" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <Definitions />
          <Outside />
          <g id="map" transform="rotate(90 485.56 421.94)">
            <FirstFloor />
            <SecondFloor />
            <CommonSymbols />
          </g>
        </svg>

      </UncontrolledReactSVGPanZoom>
    );
  }

  renderClassroom(classroom) {
    return (
      <polygon
        key={classroom._id}
        points={classroom.mapCoordinates}
        fill={statusToColor[ClassroomUtils.getStateOfClassroom(classroom, this.props.classroomActivities, this.props.selectedTime).code]}
        onClick={() => alert("Hai cliccato " + classroom.name)}
    />);
  }
}
