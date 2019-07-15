import React from 'react';
import {NavLink, Link} from "react-router-dom";
import SVG from '../helpers/SvgLoader'

import './Header.scss';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuClosed: true,
      menuIcon: "menu-icon.svg"
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if (this.state.menuClosed) {
      this.setState({ menuClosed: false, menuIcon: "menu-icon-close.svg" })
    } else {
      this.setState({ menuClosed: true, menuIcon: "menu-icon.svg" })
    }
  }

  render() {
    return (
      <header className="page-header container-fluid position-relative">
        <div className="header-desktop">
          <div className="row header-wrapper d-none d-md-flex">
            <div className="page-logo col">
              <div className="logo-wrapper position-relative">
                <Link to="/">
                  <img src="/static/vectors/logo-test.svg" alt="Logo uniboard" />
                </Link>

                <div className="column-guidelines" />
              </div>
            </div>

            <nav className="page-nav col-auto">
              <ul className="list-inline">
                <li className="list-inline-item"><NavLink exact to="/">Mappa</NavLink></li>
                <li className="list-inline-item"><NavLink exact to="/classrooms">Aule</NavLink></li>
                <li className="list-inline-item"><NavLink exact to="/lessons">Lezioni</NavLink></li>
                <li className="list-inline-item"><NavLink exact to="/profile">Profilo</NavLink></li>
                <li className="list-inline-item"><NavLink exact to="/login">Accedi</NavLink></li>
              </ul>
            </nav>
          </div>
          <div className="row-guidelines" />
        </div>

        <div className="header-mobile">
          <div className="row header-wrapper d-md-none">
            <div className="col-auto">
              <div className="menu-button position-relative">
                <button onClick={this.toggleMenu}><SVG name={this.state.menuIcon} /></button>

                <div className="column-guidelines" />
              </div>
            </div>

            <div className="col align-content-center">
              <h1 className="page-title">Lezioni</h1>
            </div>

            <div className="col-auto">
              <div className="options-button position-relative">
                <button><SVG name="options-icon.svg" /></button>

                <div className="column-guidelines" />
              </div>
            </div>
          </div>

          <div className="row-guidelines" />

          <div className={"mobile-menu-container d-md-none" + (this.state.menuClosed ?
            ' menu-closed' : '')}>
            <div className="mobile-menu position-relative">
              <div className="row" style={{marginBottom: '20px'}}>
                <div className="col-6">
                  <NavLink exact to="/">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Mappa</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
                <div className="col-6">
                  <NavLink exact to="/classrooms">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Aule</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="row" style={{marginBottom: '20px'}}>
                <div className="col-6">
                  <NavLink exact to="/">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Orari</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
                <div className="col-6">
                  <NavLink exact to="/lessons">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Lezioni</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <NavLink exact to="/">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Crediti</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
                <div className="col-6">
                  <NavLink exact to="/login">
                    <div className="menu-item">
                      <SVG name="menu-icon.svg" />
                      <span>Accedi</span>

                      <div className="row-guidelines" />
                      <div className="column-guidelines" />
                    </div>
                  </NavLink>
                </div>
              </div>

              <div className="row-guidelines" />
              <div className="column-guidelines" />
            </div>
          </div>
        </div>

        <div className="page-header-loader" />
      </header>
    );
  }

}
