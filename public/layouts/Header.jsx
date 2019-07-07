import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <header className="page-header">
        Page header
        <NavLink to="/">Home</NavLink>
        <NavLink to="/classrooms">Aule</NavLink>
        <NavLink to="/notfound">Non trovato</NavLink>
      </header>
    );
  }

}
