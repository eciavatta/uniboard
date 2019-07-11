import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from "./pages/Main";
import Classrooms from "./pages/Classrooms";
import NotFound from "./pages/NotFound";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './App.scss'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Route render={({ location }) => (

          <TransitionGroup>
            <CSSTransition timeout={500} classNames='fade' key={location.key}>
              <Switch location={location}>
                <Route path="/" exact component={Main} />
                <Route path="/classrooms" component={Classrooms} />
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
