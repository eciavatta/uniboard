import React from 'react';

export default class extends React.Component {

  render() {
    return <div className="svg-container" dangerouslySetInnerHTML={{
      __html: require('../../static/vectors/' + this.props.name)
    }} />
  }

}
