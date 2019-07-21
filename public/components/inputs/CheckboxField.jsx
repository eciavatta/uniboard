import React from "react";

import "./CheckboxField.scss";

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
      <div className="checkbox-field position-relative">
        <label>
          <input type="checkbox" defaultChecked={this.state.checked} onChange={this.changeState} id={this.props.id} />
          <span className="checkbox-mark" />
          <span className="checkbox-text">{ this.props.children }</span>
        </label>

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
