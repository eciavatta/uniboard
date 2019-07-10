import React from 'react';

import './Footer.scss';
import Svg from '../helpers/SvgLoader'

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="page-footer">
        <div className="container-fluid footer-info">
          <div className="row">
            <div className="footer-logo w-auto">
              uniboard
            </div>
            <div className="footer-copy w-auto">
              Creato da Emiliano Ciavatta e Luca Tremamunno
            </div>
          </div>
        </div>
      </footer>
    );
  }

}
