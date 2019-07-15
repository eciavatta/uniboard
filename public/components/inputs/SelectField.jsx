import React from "react";

import "./SelectField.scss";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'value': props.value
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    // this.setState({'value': e.target.value});
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
      <div className="select-field-container position-relative">
        <span className="select-text">{ this.props.children }</span>
        <select onChange={this.changeState} defaultValue={this.state.value}>
          {
            Object.keys(this.props.options).map((key) =>
              <option value={key} key={key}>{this.props.options[key]}</option>)
          }
        </select>

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
