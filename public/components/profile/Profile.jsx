import React from "react";
import axios from "axios";

export default class MapMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "username",
      password: "password",
      loginDisabled: true
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestUser = this.requestUser.bind(this);

    this.requestUser();
  }

  requestUser() {
    axios.get('/api/users/self')
      .then(response => {
        this.setState({'user': response.data, 'loginDisabled': true})
      }, err => {
        console.log(err.response);
        this.setState({'user': null, 'loginDisabled': false})
      });
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    if (!this.state.loginDisabled) {
      console.log(this.state);
      this.setState({'loginDisabled': true});
      axios.post('/login',{'username':this.state.username, 'password': this.state.password})
        .then(response => {
          console.log("Response from login:");
          console.log(response.data);
          this.requestUser();
        }, err => {
          console.log(err.response);
          this.setState({'loginDisabled': false});
        });
      event.preventDefault();
    }
  }

  render() {
    return <div>
      <form onSubmit={this.handleSubmit} hidden={this.state.user !== null}>
        <label>
          Username
          <input type="text" value={this.state.value} onChange={this.handleChangeUsername} />
        </label>
        <label>
          Password
          <input type="password" value={this.state.value} onChange={this.handleChangePassword} />
        </label>
        <input type="submit" value="Submit" disabled={this.state.loginDisabled}/>
      </form>
      <p hidden={!(this.state.user)}>{JSON.stringify(this.state.user)}</p>
    </div>
  }
}
