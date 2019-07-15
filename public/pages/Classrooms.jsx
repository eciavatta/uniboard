import React from 'react';

import SinglePage from '../layouts/SinglePage'
import ClassroomList from "../components/classroom/ClassroomsList";

import './Classrooms.scss';
import ClassroomDetails from "../components/classroom/ClassroomDetails";
import InputField from '../components/inputs/InputField'
import CheckboxField from '../components/inputs/CheckboxField'
import axios from "axios";
import ClassroomUtils from "../helpers/classroomUtils";
import SelectField from "../components/inputs/SelectField";

const REFRESH_TIMEOUT = 500 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

export default class Classrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'classroomActivities': {},
      'filteredClassrooms': this.props.classroomStaticData
    };

    this.classroomBaseData = [];
    this.classroomNameFilter = "";
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
    this.classroomNameFilterChanged = this.classroomNameFilterChanged.bind(this);


    this.updateData();
  }

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.classroomStaticData !== this.props.classroomStaticData) {
      this.classroomBaseData = this.props.classroomStaticData;
      this.updateFilteredClassrooms();
    }
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
    const filteredClassrooms = this.classroomBaseData
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
      }).filter(classroom => {
        return classroom.name.includes(this.classroomNameFilter);
      });
    this.setState({'filteredClassrooms': filteredClassrooms});
  }
  classroomNameFilterChanged(c) {
    this.classroomNameFilter = c;
    this.updateFilteredClassrooms();
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
    let selectedClassroom = ClassroomUtils.findClassroomById(window.location.hash.substr(1), this.props.classroomStaticData);
    return (
      <SinglePage>
        <div className="classrooms container-fluid">
          <div className="row position-relative">
            <div className="col-md-3">
              <div className="filter-box position-relative">
                <InputField placeholder="Filtra aule" onChange={this.classroomNameFilterChanged} />
                <div className="column-guidelines" />
              </div>
            </div>
            <div className="col-md">
              <div className="filter-box selects position-relative">
                <div className="row">
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showClassroomsChanged}>Aule</CheckboxField>
                  </div>
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showLaboratoriesChanged}>Laboratori</CheckboxField>
                  </div>
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showFloor1Changed}>Piano terra</CheckboxField>
                  </div>
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showFloor2Changed}>Primo piano</CheckboxField>
                  </div>
                  <div className="col-auto">
                    <SelectField options={{'name': 'Nome', 'proximity': 'Vicinanza'}} onChange={(value) => console.log(value)} value={'name'}>
                      Ordina per:
                    </SelectField>
                  </div>
                </div>
                <div className="column-guidelines" />
              </div>
            </div>
            <div className="col-md-auto">
              <div className="new-box">
                Legenda
              </div>
            </div>
            <div className="row-guidelines" />
          </div>
          <div className="row position-relative classrooms-row">
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
