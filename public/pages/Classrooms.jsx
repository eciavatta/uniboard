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
      'filteredClassrooms': this.props.classroomStaticData,
      'classroomNameFilter': "",
      'showClassrooms': true,
      'showLaboratories': true,
      'sortBy': 'name',
    };

    this.keepUpdating = true;

    this.updateData = this.updateData.bind(this);
    this.showClassroomsChanged = this.showClassroomsChanged.bind(this);
    this.showLaboratoriesChanged = this.showLaboratoriesChanged.bind(this);
    this.classroomNameFilterChanged = this.classroomNameFilterChanged.bind(this);
    this.sortByChanged = this.sortByChanged.bind(this);
  }

  componentWillUnmount() {
    this.keepUpdating = false;//or we get a memory leak
  }

  componentDidMount() {
    this.updateData();
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

  getFilteredClassroom() {
    if (!this.props.classroomStaticData || this.props.classroomStaticData.length === 0) {
      return [];
    }

    const filteredClassrooms = this.props.classroomStaticData
      .filter(classroom => {
        if (classroom.roomType === "Classroom") {
          return this.state.showClassrooms;
        } else if (classroom.roomType === "Laboratory") {
          return this.state.showLaboratories;
        }
        return false;
      }).filter(classroom => {
        return classroom.name.toLowerCase().includes(this.state.classroomNameFilter);
      }).sort((c1, c2) => c1.name.localeCompare(c2.name));
    //we always sort by name first, so if two classrooms have the same value for the sort by they will be sorted by name as secondary value

    if (this.state.sortBy === 'proximity') {
      if (!window.uniboardApp) {
        //TODO alert
        alert("Scarica l'app di uniboard per poter usare questa funzionalità");
      } else {
        //TODO
      }
    } else if (this.state.sortBy === 'free') {
      filteredClassrooms.sort((c1, c2) => {
        const nowTime = ClassroomUtils.dateToHalfHoursTime(new Date());
        const c1StatusCode = ClassroomUtils.getStateOfClassroom(c1, this.state.classroomActivities, nowTime).code;
        const c2StatusCode = ClassroomUtils.getStateOfClassroom(c2, this.state.classroomActivities, nowTime).code;
        const codeForSort = (code) => {
          if (code === 2) {return 0;}
          if (code === 1) {return 1;}
          return 2;
        };
        return codeForSort(c1StatusCode) - codeForSort(c2StatusCode);
      })
    }

    return filteredClassrooms;
  }
  classroomNameFilterChanged(c) {
    this.setState({
      'classroomNameFilter': c
    });
  }
  showClassroomsChanged(c) {
    this.setState({
      'showClassrooms': c
    });
  }
  showLaboratoriesChanged(c) {
    this.setState({
      'showLaboratories': c
    });
  }
  sortByChanged(c) {
    this.setState({
      'sortBy': c
    });
  }

  render() {
    let selectedClassroom = ClassroomUtils.findClassroomById(window.location.hash.substr(1), this.props.classroomStaticData);
    return (
      <SinglePage>
        <div className="classrooms container-fluid">
          <div className="row position-relative d-none d-lg-flex">
            <div className="col-md-3">
              <div className="filter-box position-relative">
                <InputField placeholder="Filtra aule" onChange={this.classroomNameFilterChanged} value={this.state.classroomNameFilter} />
                <div className="column-guidelines" />
              </div>
            </div>
            <div className="col-md">
              <div className="filter-box selects position-relative">
                <div className="row">
                  <div className="col-auto">
                    <SelectField options={{'name': 'Nome', 'free': 'Libere', 'proximity': 'Vicinanza'}} onChange={this.sortByChanged} value={'name'}>
                      Ordina per:
                    </SelectField>
                  </div>
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showClassroomsChanged}>Aule</CheckboxField>
                  </div>
                  <div className="col-auto">
                    <CheckboxField checked={true} onChange={this.showLaboratoriesChanged}>Laboratori</CheckboxField>
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
              <ClassroomList classrooms={this.getFilteredClassroom()} classroomActivities={this.state.classroomActivities}/>
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
