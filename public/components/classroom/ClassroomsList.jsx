import React from "react";

import "./ClassroomsList.scss";
import SVG from '../../helpers/SvgLoader'
import ClassroomUtils from '../../helpers/classroomUtils';

const REFRESH_TIMEOUT = 5 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class extends React.Component {
  render() {
    return (
      <div className="classrooms-list scrollable h-100 position-relative">
        {
          this.props.classrooms.map(classroom => (
            <div className="item-container position-relative" key={classroom._id}>
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
            </div>
          ))
        }
      </div>
    );
  }

  activeBadge(item) {
    if (item.id === 1 || true) {
      return (
        <div className="classroom-selected">
          <SVG name="classroom-list-selected.svg" />
        </div>
      )
    }
  }

}
