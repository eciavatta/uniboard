import React from "react";
import "./Classroom.scss";

export default class Classroom extends React.Component {

  render() {
    return (
      <div className="classroom">
        <div className="classroom-header">
          <div className="classroom-state" />
          <div className="classroom-name">
            {this.props.details.name}
          </div>
        </div>

        <div className="details">
          Orari...
        </div>
      </div>
    );
  }

}
