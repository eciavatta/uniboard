import React from 'react';
import { hot } from 'react-hot-loader';
import Header from './layouts/Header';
import ClassroomList from './components/classroom/ClassroomList'
import MapMain from './components/map/MapMain'

let classroomTestData = [
  {
    id: '123456789',
    details: {
      name: 'Aula 2.3'
    }
  },
  {
    id: '987654321',
    details: {
      name: 'Aula 2.4'
    }
  }
];

const App = () => (
  <div>
    <Header />
    <ClassroomList items={classroomTestData} />
    <MapMain initialFloor={1}/>
  </div>
);

export default hot(module)(App);
