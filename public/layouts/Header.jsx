import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <header className="page-header">

        <nav className="page-nav">
          <ul className="list-inline">
            <li className="list-inline-item"><NavLink exact to="/">Mappa</NavLink></li>
            <li className="list-inline-item"><NavLink exact to="/classrooms">Aule</NavLink></li>
            <li className="list-inline-item"><NavLink exact to="/lessons">Lezioni</NavLink></li>
            <li className="list-inline-item"><NavLink exact to="/login">Accedi</NavLink></li>
          </ul>
        </nav>

      </header>
    );
  }

}
