import React from "react";

import "./ClassroomsList.scss";
import SVG from '../../helpers/SvgLoader'

export default class extends React.Component {

  render() {


    return (
      <div className="classrooms-list scrollable">
        {
          this.props.items.map(item => (
            <div className="item-container" key={item.id}>
              <div className="item-content">
                <div className="classroom-state">
                  <SVG name="classroom-status.svg" />
                </div>
                <div className="classroom-name">{item.name}</div>
              </div>
              { this.activeBadge(item) }
              <div className="item-guidelines" />
            </div>
          ))
        }
        <div className="classrooms-guidelines" />
      </div>
    );
  }

  activeBadge(item) {
    if (item.id === 1) {
      return (
        <div className="classroom-selected">
          <SVG name="classroom-status.svg" />
        </div>
      )
    }
  }

}
