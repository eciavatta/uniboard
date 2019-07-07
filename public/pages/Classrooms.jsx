import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomList";

import './Main.scss';

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

export default class Classrooms extends React.Component {

  render() {
    return (
      <SinglePage>
        <ClassroomList items={classroomTestData} />
      </SinglePage>
    );
  }

}
