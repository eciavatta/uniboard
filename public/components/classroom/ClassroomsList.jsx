import React from "react";

import "./ClassroomsList.scss";
import SVG from '../../helpers/SvgLoader'
import axios from 'axios';
import ClassroomUtils from '../../helpers/classroomUtils';

const REFRESH_TIMEOUT = 5 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'items': []
    };
    this.keepUpdating = true;

    this.updateData = this.updateData.bind(this);

    this.updateData();
  }

  updateData() {
    axios.get('/api/classrooms').then(
      res => {
        if (this.keepUpdating) {
          console.log("List data updated");
          res.data.forEach(classroomData => classroomData.status = ClassroomUtils.getStateOfClassroom(classroomData, ClassroomUtils.dateToHalfHoursTime(new Date())));
          this.setState({'items': res.data});
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

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  render() {
    return (
      <div className="classrooms-list scrollable h-100 position-relative">
        {
          this.state.items.map(item => (
            <div className="item-container position-relative" key={item._id}>
              <div className="item-content">
                <div className="classroom-state">
                  <SVG name="classroom-status.svg"
                       containerClass={"classroom-state-svg-container status" + item.status.code}/>
                </div>
                <div className="classroom-name">{item.name}</div>
              </div>
              {this.activeBadge(item)}
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
