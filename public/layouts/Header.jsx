import React from 'react';
import {NavLink, Link} from "react-router-dom";

import './Header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <header className="page-header container-fluid">
        <div className="row header-wrapper">
          <div className="page-logo col">
            <div className="logo-wrapper">
              <Link to="/">
                <img src="/static/vectors/logo-test.svg" alt="Logo uniboard" />
              </Link>
            </div>
          </div>

          <nav className="page-nav col-auto">
            <ul className="list-inline">
              <li className="list-inline-item"><NavLink exact to="/">Mappa</NavLink></li>
              <li className="list-inline-item"><NavLink exact to="/classrooms">Aule</NavLink></li>
              <li className="list-inline-item"><NavLink exact to="/lessons">Lezioni</NavLink></li>
              <li className="list-inline-item"><NavLink exact to="/login">Accedi</NavLink></li>
            </ul>
          </nav>
        </div>

        <div className="horizontal-sketch" />
        <div className="vertical-logo-sketch" />

        <div className="page-header-loader" />
      </header>
    );
  }

}
