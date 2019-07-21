import React from "react";

import "./InputField.scss";

export default class extends React.Component {

  constructor(props) {
    super(props);

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
        <input type={this.props.type ? this.props.type : 'text' } className="input-field" placeholder={this.props.placeholder} value={this.props.value}
               onChange={this.changeState} id={this.props.id}/>

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
