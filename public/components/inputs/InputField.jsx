import React from "react";

import "./InputField.scss";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'value': props.value
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
      <div className="input-field-container position-relative">
        <input type="text" className="input-field" placeholder={this.props.placeholder} value={this.state.value} onChange={this.changeState} />

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
