import React from "react";

import "./SelectField.scss";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'checked': props.checked
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.checked);
    }
  }

  render() {
    return (
      <div className="select-field position-relative">
        <label>
          <input type="checkbox" defaultChecked={this.state.checked} onChange={this.changeState} placeholder={this.props.placeholder} />
          <span className="select-mark" />
          <span className="select-text">{ this.props.children }</span>
        </label>

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
