import React from 'react';

import SinglePage from '../layouts/SinglePage'

import './NotFound.scss';

export default class NotFound extends React.Component {

  render() {
    return (
      <SinglePage pageTitle="Errore 404">
        Pagina non trovata
      </SinglePage>
    );
  }

}
