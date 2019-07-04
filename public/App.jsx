import React from 'react';
import { hot } from 'react-hot-loader';
import Header from './layouts/Header';
import Card from './components/Card';

const App = () => (
  <div>
    <Header />
    <Card />
  </div>
);

export default hot(module)(App);
