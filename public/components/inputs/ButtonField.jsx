import React from "react";

import "./ButtonField.scss";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'text': props.text
    };
  }

  render() {
    return (
      <div className="button-field-container position-relative">
        <input type={this.props.isSubmit ? 'submit' : 'button' } className="button-field" value={this.state.text}
               id={this.props.id} disabled={this.props.disabled} onClick={this.props.onClick} />

        <div className="row-guidelines" />
        <div className="column-guidelines" />
      </div>
    );
  }

}
