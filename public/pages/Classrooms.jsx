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
import ButtonField from "../components/inputs/ButtonField";
import SvgLoader from "../helpers/SvgLoader";

const REFRESH_TIMEOUT = 500 * 1000; //TODO solo durante testing, poi lo mettiamo a 1 minuto o più
const ON_ERROR_REFRESH_TIMEOUT = 10 * 1000;

const SORT_BY_OPTIONS = {'name': "Nome", 'free': "Libere"};
if (window.uniboardApp) {
  SORT_BY_OPTIONS.proximity = "Vicinanza";
}

export default class Classrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: true,
      classroomActivities: {},
      filteredClassrooms: this.props.classroomStaticData,
      classroomNameFilter: "",
      showClassrooms: true,
      showLaboratories: true,
      sortBy: 'name',
      optionsClosed: true
    };

    this.keepUpdating = true;

    this.updateData = this.updateData.bind(this);
    this.checkIfMobile = this.checkIfMobile.bind(this);
    this.showClassroomsChanged = this.showClassroomsChanged.bind(this);
    this.showLaboratoriesChanged = this.showLaboratoriesChanged.bind(this);
    this.classroomNameFilterChanged = this.classroomNameFilterChanged.bind(this);
    this.sortByChanged = this.sortByChanged.bind(this);
    this.onOptionsToggle = this.onOptionsToggle.bind(this);
  }

  componentWillUnmount() {
    this.keepUpdating = false; //or we get a memory leak
    window.removeEventListener('resize', this.checkIfMobile);
  }

  componentDidMount() {
    this.updateData();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
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

  checkIfMobile() {
    this.setState({ isMobile: window.innerWidth < 768 });
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
        return classroom.name.toLowerCase().includes(this.state.classroomNameFilter.toLowerCase());
      }).sort((c1, c2) => c1.name.localeCompare(c2.name));
    //we always sort by name first, so if two classrooms have the same value for the sort by they will be sorted by name as secondary value

    if (this.state.sortBy === 'proximity') {
      if (!window.uniboardApp) {
        //TODO alert
        alert("Scarica l'app di uniboard per poter usare questa funzionalità");
        this.setState({'sortBy': 'name'});
      } else {
        const beacons = JSON.parse(window.uniboardApp.getBeacons());
        if (Object.keys(beacons).length === 0) {
          console.log("No beacon");
          alert("Non è stato individuato alcun beacon, assicurati di aver attivato il bluethooth");
          this.setState({'sortBy': 'name'});
        } else {
          //console.log(beacons);
          //console.log(filteredClassrooms.filter(c => c.beaconUuid).map(c => c.beaconUuid));
          const classToDist = (classroom) => {
            if (!classroom.beaconUuid || !beacons[classroom.beaconUuid]) {
              return 1000;
            } else {
              console.log("Beacon of " + classroom.name);
              return beacons[classroom.beaconUuid];
            }
          };
          filteredClassrooms.sort((c1, c2) => classToDist(c1) - classToDist(c2));
        }
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
    console.log(c);
    this.setState({
      'sortBy': c
    });
  }

  onOptionsToggle(optionsVisible) {
    this.setState({optionsClosed: !optionsVisible});
  }

  render() {
    let selectedClassroom = ClassroomUtils.findClassroomById(this.props.location.hash.substr(1), this.props.classroomStaticData);
    let options = '';
    if (!this.state.isMobile || !this.state.optionsClosed) {
      options = this.getOptions();
    }

    let legend = this.state.isMobile ? (
      <div className="row">
        { this.getLegend() }
      </div>
    ) : '';

    let classroomsDetails = <ClassroomDetails
      history={this.props.history}
      isMobile={this.state.isMobile}
      classroom={selectedClassroom}
      classroomActivities={this.state.classroomActivities}/>;

    return (
      <SinglePage isLogged={this.props.isLogged} hasOptions={true} pageTitle="Aule" onOptionsToggle={this.onOptionsToggle}>
        <div className="classrooms container-fluid">
          { legend }
          { options }

          <div className="classrooms-row row">
            <div className="col-md-3 h-100">
              <ClassroomList
                classrooms={this.getFilteredClassroom()}
                classroomActivities={this.state.classroomActivities}
                selectedClassroom={selectedClassroom}
                classroomDetails={this.state.isMobile ? classroomsDetails : null} />

              <div className="column-guidelines" />
            </div>
            <div className="col-md-9 h-100">
              <ClassroomDetails
                history={this.props.history}
                isMobile={this.state.isMobile}
                classroom={selectedClassroom}
                classroomActivities={this.state.classroomActivities}/>
            </div>

            <div className="row-guidelines" />
          </div>
        </div>
      </SinglePage>
    );
  }

  getOptions() {
    let closeButton = this.state.isMobile ? (
      <div className="col-md-auto">
        <ButtonField text="Salva" onClick={() => this.setState({optionsClosed: true})} />
      </div>
    ) : '';

    return (
      <div className="mobile-fixed">
        <div className="page-options position-relative">
          <div className="row">
            <div className="col-md-3">
              <div className="filter1-box position-relative">
                <InputField placeholder="Filtra aule" onChange={this.classroomNameFilterChanged} value={this.state.classroomNameFilter} />
              </div>
            </div>
            <div className="col-md">
              <div className="filter2-box position-relative">
                <div className="row">
                  <div className="col-md-auto">
                    <SelectField options={SORT_BY_OPTIONS} onChange={this.sortByChanged} value={this.state.sortBy}>
                      Ordina per:
                    </SelectField>
                  </div>
                  <div className="col-auto d-md-none d-lg-flex">
                    <CheckboxField checked={true} onChange={this.showClassroomsChanged}>Aule</CheckboxField>
                  </div>
                  <div className="col-auto d-md-none d-lg-flex">
                    <CheckboxField checked={true} onChange={this.showLaboratoriesChanged}>Laboratori</CheckboxField>
                  </div>

                  { closeButton }
                </div>
              </div>
            </div>

            { this.state.isMobile ? '' : this.getLegend() }
          </div>

          <div className="row-guidelines" />
          <div className="column-guidelines" />
        </div>
      </div>
    )
  }

  getLegend() {
    return (
      <div className="col-md-auto">
        <div className="legend">
          <div className="legend-item legend-occupied">
            <span>Occupata</span>
            <SvgLoader name="legend-underline.svg" />
          </div>
          <div className="legend-item legend-free">
            <span>Libera</span>
            <SvgLoader name="legend-underline.svg" />
          </div>
          <div className="legend-item legend-almost-free">
            <span>Per poco</span>
            <SvgLoader name="legend-underline.svg" />
          </div>
          <div className="legend-item legend-lesson">
            <span>Lezione</span>
            <SvgLoader name="legend-underline.svg" />
          </div>
        </div>
      </div>
    )
  }

}
