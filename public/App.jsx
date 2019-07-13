import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from "./pages/Main";
import Classrooms from "./pages/Classrooms";
import NotFound from "./pages/NotFound";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './App.scss'

import ClassroomUtils from './helpers/classroomUtils'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {classroomStaticData: []};

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
            <CSSTransition timeout={500} classNames='fade' key={location.key}>
              <Switch location={location}>
                <Route exact path="/" render={() => <Main classroomStaticData={this.state.classroomStaticData}/>}/>
                <Route path="/classrooms" render={() => <Classrooms classroomStaticData={this.state.classroomStaticData}/>}/>
                <Route path="/lessons" component={Classrooms} />
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
