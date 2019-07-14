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
      'currWeek': null,
      'activitiesClassroom': null,
      'weekChangeDisabled': true
    };

    this.changeWeek = this.changeWeek.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.noInfo = this.noInfo.bind(this);
    this.weekInfo = this.weekInfo.bind(this);
    this.noWeekInfo = this.noWeekInfo.bind(this);
    this.getDayOfWeekDate = this.getDayOfWeekDate.bind(this);
    this.getActivityAt = this.getActivityAt.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.doReport = this.doReport.bind(this);
  }

  render() {
    if (this.state.activitiesClassroom !== this.props.classroom && this.props.classroom) {//to initialize schedule only after classroom is added
      setTimeout(() => this.changeWeek(0), 0);//prevents infinite loops
    }
    return (
      <div className="classroom-details">
        {this.props.classroom ? this.showInfo() : this.noInfo()}
        <div className="column-guidelines" style={{left: '15px', right: '15px', bottom: '-15px'}} />
      </div>
    );
  }

  showInfo() {
    this.classroomStateCode = ClassroomUtils.getStateOfClassroom(
      this.props.classroom, this.props.classroomActivities, ClassroomUtils.dateToHalfHoursTime(new Date())).code;
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
            <td>{STATUS_TO_WORDS[this.classroomStateCode]}</td>
            <td>N.A.</td>
            <td>N.A.</td>
            <td>N.A.</td>
          </tr>
          </tbody>
        </table>
      </div>

      {this.state.currWeek ? this.weekInfo() : this.noWeekInfo()}

      <button disabled={this.state.weekChangeDisabled} onClick={this.prevWeek}>Settimana precedente</button>
      <button disabled={this.state.weekChangeDisabled} onClick={this.nextWeek}>Settimana successiva</button>
      <button disabled={!this.props.classroomActivities} onClick={this.doReport}>Effettua segnalazione</button>
      <button onClick={() => alert(/*TODO*/"TODO")}>Mostra su mappa</button>
    </div>);
  }

  noInfo() {
    return (
      <p>Nessuna aula selezionata</p>
    )
  }

  weekInfo() {
    const dayStart = 9 * 2;
    const dayEnd = 19 * 2;

    const colSpanLeft = [0, 0, 0, 0, 0];
    const rows = [];
    for (let i = dayStart; i < dayEnd; i++) {
      rows.push(i);
    }
    const days = [0,1,2,3,4];

    return (
      <div className="timetables">
        <table className="table">
          <thead>
          <tr>
            <th scope="col" />
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeekDate(1))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeekDate(2))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeekDate(3))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeekDate(4))}</th>
            <th scope="col">{ClassroomDetails.dateToString(this.getDayOfWeekDate(5))}</th>
          </tr>
          </thead>
          <tbody>
          {rows.map(rowTimeIndex => {
            return (
              <tr key={rowTimeIndex}>
                {(rowTimeIndex % 2 === 0) &&
                  <th rowSpan="2" className="no-border-bottom">{rowTimeIndex / 2}:00 - {(rowTimeIndex / 2) + 1}:00</th>}
                {days.map(day => {
                  if (colSpanLeft[day] > 0) {
                    colSpanLeft[day]--;
                    return null;
                  } else {
                    const startingActivity = this.getActivityAt(day + 1, rowTimeIndex);
                    if (startingActivity) {
                      colSpanLeft[day] = startingActivity.to - startingActivity.from - 1;
                      return (
                        <td key={rowTimeIndex + "_" + day} rowSpan={Math.min(dayEnd, startingActivity.to) - startingActivity.from}>
                          {startingActivity.course ? startingActivity.course.name : startingActivity.description}
                        </td>)
                    } else {
                      return <td key={rowTimeIndex + "_" + day}/>
                    }
                  }
                })}
              </tr>
            )
          })}
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

  changeWeek(weekDelta) {
    const savedClassroom = this.props.classroom;
    this.weekDelta = weekDelta;
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 7 * weekDelta); //sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    this.setState({
      'weekChangeDisabled': true,
      'currWeek': weekStart,
      'activitiesClassroom': savedClassroom
    });

    axios.get('/api/classrooms/' + this.props.classroom._id + '/activities?fromDate=' + weekStart.getTime() + '&toDate=' + weekEnd.getTime()).then(
      res => {
        if (savedClassroom === this.state.activitiesClassroom) {
          console.log("Aggiornate attività settimana");
          console.log(res.data);
          this.setState({
            'weekActivities':res.data,
            'weekChangeDisabled': false
          })
        }
      }, err => {
        if (savedClassroom === this.state.activitiesClassroom) {
          console.log(err.response);
          this.setState({'weekChangeDisabled': false});
          //todo alert
          alert("C'è stato un errore nel recuperare gli orari della'aula, riprova più tardi");
        }
      }
    )
  }
  prevWeek() {this.changeWeek(this.weekDelta - 1);}
  nextWeek() {this.changeWeek(this.weekDelta + 1);}


  getDayOfWeekDate(i) {
    const res = new Date(this.state.currWeek);
    res.setDate(res.getDate() + i);
    return res
  }

  getActivityAt(day, from) {
    const dayOfWeek = this.getDayOfWeekDate(day);
    for (let i = 0; i < this.state.weekActivities.length; i++) {
      const activityDate = new Date(this.state.weekActivities[i].date);
      if (this.state.weekActivities[i].from === from &&
        activityDate.getFullYear() === dayOfWeek.getFullYear() &&
        activityDate.getMonth() === dayOfWeek.getMonth() &&
        activityDate.getDate() === dayOfWeek.getDate()) {
        return this.state.weekActivities[i];
      }
    }
    return null;
  }

  doReport() {
    if (this.classroomStateCode >= 0 && this.classroomStateCode < 4) {
      const classroomStatusFree = this.classroomStateCode !== 0;
      if (confirm("L'aula ci risulta " + (classroomStatusFree ? "libera" : "occupata") +
        ". Vuoi segnalare che l'aula è in realtà " + (classroomStatusFree ? "occupata" : "libera") + "?")) {
        axios.post('/api/classrooms/' + this.props.classroom._id + '/reports', {'isActuallyFree': !classroomStatusFree}).then(
          res => {
            //TODO alert
            alert("Grazie per la tua segnalazione!");
          }, err => {
            let msg = "C'è stato un errore inaspettato nell'effettuare la richiesta, riprova più tardi";
            console.log(err.response);
            if (err.response.status ===  403) {
              msg = "Devi essere autenticato per effettuare questa operazione";
            }
            //TODO alert
            alert(msg);
          }
        )
      }
    } else {
      //TODO alert
      alert("Al momento non è possibile effettuare una segnalazione, attendi il completo caricamento della pagina");
    }
  }

  static dateToString(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options)
  }
}
