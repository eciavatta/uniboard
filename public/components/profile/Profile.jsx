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
    this.doLogout = this.doLogout.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);

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
      axios.post('/api/login',{'username':this.state.username, 'password': this.state.password})
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

  doLogout() {
    axios.get('/api/logout').then(res => {
        console.log(res);
        this.requestUser();
      }, err => {
        console.log(err.response);
      }
    );
  }

  doReport(val) {
    axios.post('/api/classrooms/5d235d4b5239c12674e9c090/reports', {'isActuallyFree': val}).then(res => {
        console.log(res);
      }, err => {
        console.log(err.response);
      }
    );
  }

  addCourse(val) {
    axios.post('/api/users/self/courses/'  + val).then(res => {
        console.log(res);
      }, err => {
        console.log(err.response);
      }
    );
  }

  removeCourse(val) {
    axios.delete('/api/users/self/courses/'  + val).then(res => {
        console.log(res);
      }, err => {
        console.log(err.response);
      }
    );
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
      <div hidden={!(this.state.user)}>
        <p>{JSON.stringify(this.state.user)}</p>
        <p><a onClick={this.doLogout}>Log out</a></p>
        <p><a onClick={(e) => this.doReport(false)}>Try report false</a></p>
        <p><a onClick={(e) => this.doReport(true)}>Try report true</a></p>
        <p><a onClick={(e) => this.addCourse('5d235d505239c12674e9c0b3')}>Try add course A</a></p>
        <p><a onClick={(e) => this.addCourse('5d235d505239c12674e9c0b5')}>Try add course B</a></p>
        <p><a onClick={(e) => this.removeCourse('5d235d505239c12674e9c0b3')}>Try remove course A</a></p>
        <p><a onClick={(e) => this.removeCourse('5d235d505239c12674e9c0b5')}>Try remove course B</a></p>
      </div>
    </div>
  }
}
