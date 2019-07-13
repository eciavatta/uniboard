import React from "react";

import "./ClassroomsList.scss";
import SVG from '../../helpers/SvgLoader'
import ClassroomUtils from '../../helpers/classroomUtils';

export default class extends React.Component {

  render() {
    return (
      <div className="classrooms-list scrollable h-100 position-relative">
        {
          this.props.classrooms.map(classroom => (
              <div className="item-container position-relative" key={classroom._id}>
                <a href={"/classrooms#" + classroom._id}>
                  <div className="item-content">
                    <div className="classroom-state">
                      <SVG
                        name="classroom-status.svg"
                        containerClass={"classroom-state-svg-container status" +
                          ClassroomUtils.getStateOfClassroom(classroom, this.props.classroomActivities, ClassroomUtils.dateToHalfHoursTime(new Date())).code}/>
                    </div>
                    <div className="classroom-name">{classroom.name}</div>
                  </div>
                  {this.activeBadge(classroom)}
                  <div className="row-guidelines"/>
                </a>
              </div>
          ))
        }
      </div>
    );
  }

  activeBadge(classroom) {
    if (classroom._id === window.location.hash.substr(1)) {
      return (
        <div className="classroom-selected">
          <SVG name="classroom-list-selected.svg" />
        </div>
      )
    }
  }

}
