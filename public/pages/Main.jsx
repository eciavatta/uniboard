import React from 'react';

import SinglePage from '../layouts/SinglePage'
import MapMain from '../components/map/MapMain'

import './Main.scss';

export default class Main extends React.Component {

  render() {
    return (
      <SinglePage>
        <MapMain initialFloor={1} />
      </SinglePage>
    );
  }

}
