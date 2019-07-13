import React from 'react';

import Header from './Header'
import Footer from "./Footer";

import './SinglePage.scss';

export default class SinglePage extends React.Component {

  render() {
    return (
      <div className="single-page">
        <Header />

        <div className="page-container">
          { this.props.children }
        </div>

        <Footer />
      </div>
    );
  }

}
