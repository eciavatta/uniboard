import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from "./pages/Main";
import Classrooms from "./pages/Classrooms";
import NotFound from "./pages/NotFound";

import './App.scss'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/classrooms" component={Classrooms} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }

}

export default hot(module)(App);
