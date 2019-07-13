import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomsList";

import './Classrooms.scss';
import ClassroomDetails from "../components/classroom/ClassroomDetails";

export default class Classrooms extends React.Component {

  render() {
    return (
      <SinglePage>
        <div className="classrooms container-fluid p-lg-3 p-xl-5">
          <div className="row position-relative">
            <div className="col-md-3">
              <div className="new-box">Campo di ricerca qui</div>
            </div>
            <div className="col-md">
              <div className="new-box">Filtri per le classi qui</div>
            </div>
            <div className="col-md-auto">
              <div className="new-box">Legenda qui</div>
            </div>
            <div className="row-guidelines" />
          </div>
          <div className="row position-relative" style={{marginTop: '15px', height: 'calc(100% - 50px)'}}>
            <div className="col-md-3 h-100">
              <ClassroomList />
              <div className="column-guidelines" style={{left: '15px', right: '15px', bottom: '-15px'}} />
            </div>
            <div className="col-md-9 h-100">
              <ClassroomDetails />
            </div>
            <div className="row-guidelines" />
          </div>
        </div>
      </SinglePage>
    );
  }

}
