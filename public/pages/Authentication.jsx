import React from "react";

import "./Authentication.scss";
import InputField from "../components/inputs/InputField";
import CheckboxField from "../components/inputs/CheckboxField";
import SinglePage from "../layouts/SinglePage";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import ButtonField from "../components/inputs/ButtonField";

function validateUsername(username) {
  return username.length >= 4;
}
const EMAIL_RE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateEmail(email) {
  return EMAIL_RE.test(email.toLowerCase());
}
const PASSWORD_RE = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
function validatePassword(password) {
  return PASSWORD_RE.test(password);
}
export default class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingLoggedInfo: true,
      loginId: "",
      loginPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerRepeatPassword: "",
      loginDisabled: false,
      registerDisabled: false,
      invalidLoginCredentials: false,
      invalidRegisterUsername: true,
      duplicateRegisterUsername: false,
      invalidRegisterEmail: true,
      duplicateRegisterEmail: false,
      invalidRegisterPassword: true,
      invalidRegisterRepeatPassword: false,
      invalidRegisterTerms: true,
      loginError: false,
      registerError: false,
      showRegisterErrors: false
    };

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLoginIdChanged = this.onLoginIdChanged.bind(this);
    this.onLoginPasswordChanged = this.onLoginPasswordChanged.bind(this);
    this.onRegisterUsernameChanged = this.onRegisterUsernameChanged.bind(this);
    this.onRegisterEmailChanged = this.onRegisterEmailChanged.bind(this);
    this.onRegisterPasswordChanged = this.onRegisterPasswordChanged.bind(this);
    this.onRegisterRepeatChanged = this.onRegisterRepeatChanged.bind(this);
    this.acceptTermChanged = this.acceptTermChanged.bind(this);
  }

  componentDidMount() {
    axios.get('api/users/self').then(
      res => this.doRedirect(),
      err => this.setState({'loadingLoggedInfo': false})
    )
  }

  onLoginSubmit(e) {
    if (!this.state.loginDisabled) {
      console.log(this.state);
      this.setState({
        'loginDisabled': true,
        'invalidLoginCredentials': false,
        'loginError': false
      });
      axios.post('/api/login',{'username':this.state.loginId, 'password': this.state.loginPassword})
        .then(response => {
          this.doRedirect();
        }, err => {
          if (err.response.status === 401) {
            this.setState({
              'invalidLoginCredentials': true,
              'loginDisabled': false
            });
          } else {
            this.setState({
              'loginError': true,
              'loginDisabled': false
            });
          }
        });
    }
    e.preventDefault();
  }

  doRedirect() {
    const query = new URLSearchParams(this.props.location.search);
    const redirectTo = query.get('redirectTo');
    this.props.history.push(redirectTo ? redirectTo : "/");
  }

  onRegisterSubmit(e) {
    if (!this.state.registerDisabled) {
      if (this.state.invalidRegisterUsername ||
        this.state.invalidRegisterEmail ||
        this.state.invalidRegisterPassword ||
        this.state.invalidRegisterRepeatPassword ||
        this.state.invalidRegisterTerms) {
        this.setState({'showRegisterErrors': true});
      } else {
        this.setState({
          'registerDisabled': true,
          'showRegisterErrors': false,
          'duplicateRegisterUsername': false,
          'duplicateRegisterEmail': false,
          'registerError': false
        });
        axios.post('/api/users', {
          'username': this.state.registerUsername,
          'email': this.state.registerEmail,
          'password': this.state.registerPassword
        }).then(
          res => {
            //TODO alert
            alert("Registrato con successo");
            this.setState({
              'registerDisabled': false
            });
          }, err => {
            if (err.response.status === 409 && err.response.data.duplicateFields) {
              let duplicateUsername = false;
              if (err.response.data.duplicateFields.includes('username')) {
                duplicateUsername = true;
              }
              let duplicateEmail = false;
              if (err.response.data.duplicateFields.includes('email')) {
                duplicateEmail = true;
              }
              this.setState({
                'duplicateRegisterUsername': duplicateUsername,
                'duplicateRegisterEmail': duplicateEmail,
                'registerDisabled': false,
                'showRegisterErrors': true
              });
            } else {
              this.setState({
                'registerError': true,
                'registerDisabled': false,
                'showRegisterErrors': true
              });
            }
          }
        )
      }
    }
    e.preventDefault();
  }

  onLoginIdChanged(c) {
    this.setState({loginId: c});
  }
  onLoginPasswordChanged(c) {
    this.setState({loginPassword: c});
  }
  onRegisterUsernameChanged(c) {
    this.setState({
      registerUsername: c,
      invalidRegisterUsername: !validateUsername(c),
      duplicateRegisterUsername: false
    });
  }
  onRegisterEmailChanged(c) {
    this.setState({
      registerEmail: c,
      invalidRegisterEmail: !validateEmail(c),
      duplicateRegisterEmail: false
    });
  }
  onRegisterPasswordChanged(c) {
    this.setState((state, props) =>({
      registerPassword: c,
      invalidRegisterPassword: !validatePassword(c),
      invalidRegisterRepeatPassword: state.registerRepeatPassword !== c
    }));
  }
  onRegisterRepeatChanged(c) {
    this.setState((state, props) =>({
      registerRepeatPassword: c,
      invalidRegisterRepeatPassword: state.registerPassword !== c
    }));
  }
  acceptTermChanged(c) {
    this.setState({invalidRegisterTerms: !c});
  }

  render() {
    if (this.state.loadingLoggedInfo) {
      return <SinglePage><p>Caricando...</p></SinglePage>
    }
    return (
      <SinglePage pageTitle={this.props.isRegister ? 'Registrati' : 'Accedi'}>
        <div className="login container">
          <div className="row scrollable h-100">
            <div className={'col-md-6 align-self-center d-md-block' + (this.props.isRegister ? ' d-none' : '')}>
              <div className="login-form position-relative">
                <div className="form-title position-relative">
                  <h2>Accedi</h2>
                  <div className="row-guidelines" />
                </div>

                <form onSubmit={this.onLoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="LoginId">E-mail o username</label>
                    <InputField
                      type="text"
                      id="LoginId"
                      value={this.state.loginId}
                      onChange={this.onLoginIdChanged}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LoginPassword">Password</label>
                    <InputField
                      type="password"
                      id="LoginPassword"
                      value={this.state.loginPassword}
                      onChange={this.onLoginPasswordChanged}/>
                  </div>
                  <div className="form-check">
                    <CheckboxField className="form-check-input">Ricordami</CheckboxField>
                    {this.state.invalidLoginCredentials && <p>Username e/o password errati</p>}
                    {this.state.loginError && <p>C'è stato un errore durante il login, riprova più tardi</p>}
                  </div>

                  <div className="row align-self-center">
                    <div className="col-auto">
                      <ButtonField disabled={this.state.loginDisabled} isSubmit={true} text="Accedi" />
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

                <form onSubmit={this.onRegisterSubmit}>
                  <div className="form-group">
                    <label htmlFor="RegisterUsername">Username</label>
                    <InputField
                      type="text"
                      id="RegisterUsername"
                      value={this.state.registerUsername}
                      onChange={this.onRegisterUsernameChanged}/>
                    {this.state.showRegisterErrors && this.state.invalidRegisterUsername && <p>Lo username deve essere lungo almeno 4 caratteri</p>}
                    {this.state.showRegisterErrors && this.state.duplicateRegisterUsername && <p>Lo username scelto è già in uso</p>}

                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterEmail">E-mail</label>
                    <InputField
                      type="text"
                      id="RegisterEmail"
                      value={this.state.registerEmail}
                      onChange={this.onRegisterEmailChanged}/>
                    {this.state.showRegisterErrors && this.state.invalidRegisterEmail && <p>L'email indicata non è valida</p>}
                    {this.state.showRegisterErrors && this.state.duplicateRegisterEmail && <p>Esiste già un account associato alla mail indicata</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterPassword">Password</label>
                    <InputField
                      type="password"
                      id="RegisterPassword"
                      value={this.state.registerPassword}
                      onChange={this.onRegisterPasswordChanged}/>
                    {this.state.showRegisterErrors && this.state.invalidRegisterPassword && <p>La password deve contenere almeno una lettera minuscola, una maiuscola, un numero e deve essere lunga almeno 6 caratteri</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="RegisterRepeatPassword">Ripeti password</label>
                    <InputField
                      type="password"
                      id="RegisterRepeatPassword"
                      value={this.state.registerRepeatPassword}
                      onChange={this.onRegisterRepeatChanged}/>
                    {this.state.showRegisterErrors && this.state.invalidRegisterRepeatPassword && <p>I valori delle password sono diversi</p>}
                  </div>
                  <div className="form-check">
                    <CheckboxField className="form-check-input" onChange={this.acceptTermChanged}>Accetto i <a href="#">Termini di servizio</a>.</CheckboxField>
                    {this.state.showRegisterErrors && this.state.invalidRegisterTerms && <p>Devi accettare i termini per poterti registrare</p>}
                    {this.state.showRegisterErrors && this.state.registerError && <p>C'è stato un errore nell'effettuare la registrazione, riprova più tardi.</p>}
                  </div>

                  <div className="row align-self-center">
                    <div className="col-auto">
                      <ButtonField disabled={this.state.registerDisabled} isSubmit={true} text="Registrati" />
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
