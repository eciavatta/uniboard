import React from "react";
import Classroom from "./Classroom"
import "./ClassroomList.scss";

export default class ClassroomList extends React.Component {

  render() {
    return (
      <div className="classroom-list">
        {
          this.props.items.map(item => (
            <Classroom key={item.id} details={item.details} />
          ))
        }
      </div>
    );
  }

}
