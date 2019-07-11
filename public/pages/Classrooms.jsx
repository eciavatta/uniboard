import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomsList";

import './Main.scss';
import ClassroomDetails from "../components/classroom/ClassroomDetails";

let classroomTestData = [];

for (let i = 0; i < 20; i++) {
  classroomTestData.push({
    id: i,
    name: `Aula 2.${i}`,
    state: 'free'
  })
}

export default class Classrooms extends React.Component {

  render() {
    return (
      <SinglePage>
        <div className="row position-relative">
          <div className="col-3 position-relative">
            <ClassroomList items={classroomTestData} />
            <div className="column-guidelines invisible" />
          </div>

          <div className="col-9 position-relative">
            <ClassroomDetails />
            <div className="column-guidelines invisible" />
          </div>
          <div className="row-guidelines invisible" />
        </div>
      </SinglePage>
    );
  }

}
