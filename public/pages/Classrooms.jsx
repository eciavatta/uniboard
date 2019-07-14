import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomsList";

import './Classrooms.scss';
import ClassroomDetails from "../components/classroom/ClassroomDetails";
import InputField from '../components/inputs/InputField'
import SelectField from '../components/inputs/SelectField'
import axios from "axios";
import ClassroomUtils from "../helpers/classroomUtils";

const REFRESH_TIMEOUT = 5 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class Classrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'classroomActivities': {},
      'filteredClassrooms': this.props.classroomStaticData
    };

    this.keepUpdating = true;
    this.showClassrooms = true;
    this.showLaboratories = true;
    this.showFloor2 = true;
    this.showFloor1 = true;

    this.updateData = this.updateData.bind(this);
    this.showClassroomsChanged = this.showClassroomsChanged.bind(this);
    this.showLaboratoriesChanged = this.showLaboratoriesChanged.bind(this);
    this.showFloor2Changed = this.showFloor2Changed.bind(this);
    this.showFloor1Changed = this.showFloor1Changed.bind(this);


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

  updateFilteredClassrooms() {
    const filteredClassrooms = this.props.classroomStaticData
      .filter(classroom => {
        if (classroom.floor === 1) {
          return this.showFloor1;
        } else if (classroom.floor === 2) {
          return this.showFloor2;
        }
        return false;
      }).filter(classroom => {
        if (classroom.roomType === "Classroom") {
          return this.showClassrooms;
        } else if (classroom.roomType === "Laboratory") {
          return this.showLaboratories;
        }
        return false;
      });
    this.setState({'filteredClassrooms': filteredClassrooms});
  }
  showClassroomsChanged(c) {
    this.showClassrooms = c;
    this.updateFilteredClassrooms();
  }
  showLaboratoriesChanged(c) {
    this.showLaboratories = c;
    this.updateFilteredClassrooms();
  }
  showFloor2Changed(c) {
    this.showFloor2 = c;
    this.updateFilteredClassrooms();
  }
  showFloor1Changed(c) {
    this.showFloor1 = c;
    this.updateFilteredClassrooms();
  }

  render() {
    if (this.state.filteredClassrooms !== this.props.classroomStaticData) {
      setTimeout(() => this.updateFilteredClassrooms(), 0);
    }
    let selectedClassroom = ClassroomUtils.findClassroomById(window.location.hash.substr(1), this.props.classroomStaticData);
    return (
      <SinglePage>
        <div className="classrooms container-fluid p-lg-3 p-xl-5">
          <div className="row position-relative">
            <div className="col-md-3">
              <div className="filter-box position-relative">
                <InputField placeholder="Filtra aule" onChange={(text) => console.log(text)} />
                <div className="column-guidelines" />
              </div>
            </div>
            <div className="col-md">
              <div className="filter-box selects position-relative">
                <div className="row">
                  <div className="col-auto">
                    <SelectField checked={true} onChange={this.showClassroomsChanged}>Aule</SelectField>
                  </div>
                  <div className="col-auto">
                    <SelectField checked={true} onChange={this.showLaboratoriesChanged}>Laboratori</SelectField>
                  </div>
                  <div className="col-auto">
                    <SelectField checked={true} onChange={this.showFloor1Changed}>Piano terra</SelectField>
                  </div>
                  <div className="col-auto">
                    <SelectField checked={true} onChange={this.showFloor2Changed}>Primo piano</SelectField>
                  </div>
                </div>
                <div className="column-guidelines" />
              </div>
            </div>
            <div className="col-md-auto">
              <div className="new-box">


              </div>
            </div>
            <div className="row-guidelines" />
          </div>
          <div className="row position-relative" style={{marginTop: '15px', height: 'calc(100% - 50px)'}}>
            <div className="col-md-3 h-100">
              <ClassroomList classrooms={this.state.filteredClassrooms} classroomActivities={this.state.classroomActivities}/>
              <div className="column-guidelines" style={{left: '15px', right: '15px', bottom: '-15px'}} />
            </div>
            <div className="col-md-9 h-100">
              <ClassroomDetails
                classroom={selectedClassroom}
                classroomActivities={this.state.classroomActivities}/>
            </div>
            <div className="row-guidelines" />
          </div>
        </div>
      </SinglePage>
    );
  }

}
