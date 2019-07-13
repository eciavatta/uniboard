import React from "react";

import "./ClassroomDetails.scss";

import ClassroomUtils from '../../helpers/classroomUtils';
import axios from "axios";

const FLOOR_TO_WORDS = [
  "Piano sotterraneo",
  "Piano terra",
  "Primo piano"
];

const STATUS_TO_WORDS = [
  "Occupata",
  "Libera",
  "Libera",
  "Lezione",
  "Sconosciuto"
];

export default class ClassroomDetails extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      'weekActivities': [],
      'currWeek': null
    };

    this.changeWeek = this.changeWeek.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.noInfo = this.noInfo.bind(this);
    this.weekInfo = this.weekInfo.bind(this);
    this.noWeekInfo = this.noWeekInfo.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);

    if (this.props.classroom) {
      this.changeWeek(0);
    }
  }

  changeWeek(weekDelta) {
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 7 * weekDelta); //sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    //TODO disabilita pulsanti fino a che non ho risposta
    axios.get('/api/classrooms/' + this.props.classroom._id + '/activities?fromDate=' + weekStart.getTime() + '&toDate=' + weekEnd.getTime()).then(
      weekActivities => {
        console.log("Aggiornate attività settimana");
        console.log(weekActivities);
        this.setState({
          'weekActivities':weekActivities,
          'currWeek': weekStart
        })
        //TODO abilita pulsanti
      }, err => {
        console.log(err.response);
        //TODO abilita pulsanti e allerta utente
      }
    )
  }

  render() {
    return (
      <div className="classroom-details">
        {this.props.classroom ? this.showInfo() : this.noInfo()}
        <div className="column-guidelines" style={{left: '15px', right: '15px', bottom: '-15px'}} />
      </div>
    );
  }

  showInfo() {
    return (<div>
      <div className="infotable position-relative">
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Piano</th>
            <th scope="col">Capienza</th>
            <th scope="col">Stato</th>
            <th scope="col">Temperatura</th>
            <th scope="col">Sensori</th>
            <th scope="col">Sensori</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{FLOOR_TO_WORDS[this.props.classroom.floor]}</td>
            <td>100 posti</td>
            <td>{STATUS_TO_WORDS[ClassroomUtils.getStateOfClassroom(this.props.classroom, this.props.classroomActivities, ClassroomUtils.dateToHalfHoursTime(new Date())).code]}</td>
            <td>N.A.</td>
            <td>N.A.</td>
            <td>N.A.</td>
          </tr>
          </tbody>
        </table>
      </div>

      {this.state.currWeek ? this.weekInfo() : this.noWeekInfo()}
    </div>);
  }

  noInfo() {
    return (
      <p>Nessuna aula selezionata</p>
    )
  }

  weekInfo() {
    return (
      <div className="timetables">
        <table className="table">
          <thead>
          <tr>
            <th scope="col" />
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeek(1))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeek(2))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeek(3))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeek(4))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeek(5))}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th rowSpan="2" className="no-border-bottom">8:00 - 9:00</th>
            <td>Programmazione in Cobol</td>
            <td>Filosofia</td>
            <td>Storia dell'arte</td>
            <td>Letteratura cinese</td>
            <td>Anatomia</td>
          </tr>
          <tr>
            <td>Programmazione in Cobol</td>
            <td>Filosofia</td>
            <td>Storia dell'arte</td>
            <td>Letteratura cinese</td>
            <td>Anatomia</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }

  noWeekInfo() {
    return (
      <p>Caricando le informazioni delle attività...</p>
    )
  }

  getDayOfWeek(i) {
    const res = new Date(this.state.currWeek);
    res.setDate(res.getDate() + i);
    return res
  }

  static dateToString(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options)
  }
}
