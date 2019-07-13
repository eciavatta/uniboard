import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomsList";

import './Classrooms.scss';
import ClassroomDetails from "../components/classroom/ClassroomDetails";
import Main from "./Main";
import axios from "axios";
import ClassroomUtils from "../helpers/classroomUtils";

const REFRESH_TIMEOUT = 5 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class Classrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'classroomActivities': {}
    };

    this.keepUpdating = true;

    this.updateData = this.updateData.bind(this);

    this.updateData();
  }

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  updateData() {
    axios.get('/api/classrooms/activities?includeCurrentStatusByReport=true').then(
      res => {
        if (this.keepUpdating) {
          console.log("Classrooms (list) data updated");
          this.setState({'classroomActivities': ClassroomUtils.prepareClassroomActivitiesData(res.data)});
          setTimeout(this.updateData, REFRESH_TIMEOUT);
        }
      },
      err => {
        if (this.keepUpdating) {
          console.log("Error retrieving classroom list data, will try again in a short while");
          console.log(err);
          console.log(err.response);
          setTimeout(this.updateData, ON_ERROR_REFRESH_TIMEOUT);
        }
      }
    );
  }

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
              <ClassroomList classrooms={this.props.classroomStaticData} classroomActivities={this.state.classroomActivities}/>/>
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
