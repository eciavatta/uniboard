import React from "react";

import "./Authentication.scss";
import InputField from "../components/inputs/InputField";
import CheckboxField from "../components/inputs/CheckboxField";
import SinglePage from "../layouts/SinglePage";
import {Link} from "react-router-dom";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'checked': props.checked
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.checked);
    }
  }

  render() {
    return (
      <SinglePage>
        <div className="login container">
          <div className="row h-100">
            <div className={'col-md-6 align-self-center d-md-block' + (this.props.isRegister ? ' d-none' : '')}>
              <div className="login-form position-relative">
                <div className="form-title position-relative">
                  <h2>Accedi</h2>
                  <div className="row-guidelines" />
                </div>

                <form>
                  <div className="form-group">
                    <label htmlFor="LoginId">E-mail o nickname</label>
                    <InputField type="text" id="LoginId" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LoginPassword">Password</label>
                    <InputField type="password" id="LoginPassword" />
                  </div>
                  <div className="form-check">
                    <CheckboxField className="form-check-input">Ricordami</CheckboxField>
                  </div>

                  <div className="row align-self-center">
                    <div className="col-auto">
                      <button type="submit" className="btn btn-primary">Accedi</button>
                    </div>
                    <div className="col-auto d-md-none">
                      oppure <Link to="/register">registrati</Link>
                    </div>
                  </div>
                </form>

                <div className="row-guidelines" />
                <div className="column-guidelines" />
              </div>
            </div>

            <div className={'col-md-6 align-self-center d-md-block' + (!this.props.isRegister ? ' d-none' : '')}>
              <div className="register-form position-relative">
                <div className="form-title position-relative">
                  <h2>Registrati</h2>
                  <div className="row-guidelines" />
                </div>

                <form>
                  <div className="form-group">
                    <label htmlFor="RegisterUsername">Username</label>
                    <InputField type="text" id="RegisterUsername" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterEmail">E-mail</label>
                    <InputField type="email" id="RegisterEmail" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterPassword">Password</label>
                    <InputField type="password" id="RegisterPassword" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterRepeatPassword">Ripeti password</label>
                    <InputField type="password" id="RegisterRepeatPassword" />
                  </div>
                  <div className="form-check">
                    <CheckboxField className="form-check-input">Accetto i <a href="#">Termini di servizio</a>.</CheckboxField>
                  </div>

                  <div className="row align-self-center">
                    <div className="col-auto">
                      <button type="submit" className="btn btn-primary">Registrati</button>
                    </div>
                    <div className="col-auto d-md-none">
                      <div className="auth-alternatives">
                        oppure <Link to="/login">accedi</Link>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row-guidelines" />
                <div className="column-guidelines" />
              </div>
            </div>
          </div>
        </div>
      </SinglePage>
    );
  }

}
