import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from "./pages/Main";
import Classrooms from "./pages/Classrooms";
import Authentication from "./pages/Authentication";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './App.scss'
import ClassroomUtils from './helpers/classroomUtils'
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {classroomStaticData: [], isLogged: false};

    this.getClassroomData = this.getClassroomData.bind(this);

    this.getClassroomData();
  }

  getClassroomData() {
    axios.get('/api/classrooms').then(
      res => this.setState({classroomStaticData: ClassroomUtils.prepareClassroomData(res.data)}),
      err => {
        console.log("Error while retrieving classroom data, trying again in a while");
        console.log(err.response);
        setTimeout(() => this.getClassroomData(), 5000)
      }
    )
  }

  render() {
    return (
      <Router>
        <Route render={({ location }) => (

          <TransitionGroup>
            <CSSTransition timeout={350} classNames='fade' key={location.key}>
              <Switch location={location}>
                <Route exact path="/" render={(props) => <Main classroomStaticData={this.state.classroomStaticData} location={props.location} history={props.history}/>}/>
                <Route path="/classrooms" render={(props) => <Classrooms classroomStaticData={this.state.classroomStaticData} history={props.history} location={props.location}/>}/>
                <Route path="/lessons" component={Lessons} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" render={(props) => <Authentication isRegister={false} location={props.location} history={props.history}/>} />
                <Route path="/register" render={(props) => <Authentication isRegister={true} location={props.location} history={props.history}/>} />
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    );
  }

}

export default hot(module)(App);
