import React from "react";

import "./ClassroomDetails.scss";

import ClassroomUtils from '../../helpers/classroomUtils';
import ActivitiesTable from '../ActivitiesTable';

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
      'weekActivities': null,
      'activitiesClassroom': null,
    };

    this.loadWeekData = this.loadWeekData.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.noInfo = this.noInfo.bind(this);
    this.noWeekInfo = this.noWeekInfo.bind(this);
    this.doReport = this.doReport.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.classroom !== this.props.classroom && this.props.classroom) {//to initialize schedule only after classroom is added
      this.activitiesClassroom = this.props.classroom;
      this.loadWeekData();//Should not change state in render
    }
  }
  componentDidMount() {
    if (this.props.classroom) {
      this.activitiesClassroom = this.props.classroom;
      this.loadWeekData();//Should not change state in render
    }
  }

  render() {
    return (
      <div className="classroom-details scrollable h-100 position-relative">
        {this.props.classroom ? this.showInfo() : this.noInfo()}
        <div className="column-guidelines" style={{bottom: '-15px'}} />
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

      {this.state.weekActivities
        ? <ActivitiesTable activities={this.state.weekActivities}
                           currWeek={this.state.weekStart}
                           selectedDay={Math.min(Math.max(new Date().getDay(), 1), 5)}/>
        : this.noWeekInfo()}

      <button disabled={!this.props.classroomActivities} onClick={this.doReport}>Effettua segnalazione</button>
      <button onClick={() => alert(/*TODO*/"TODO")}>Mostra su mappa</button>
    </div>);
  }

  noInfo() {
    return (
      <p>Nessuna aula selezionata</p>
    )
  }

  noWeekInfo() {
    return (
      <p>Caricando le informazioni delle attività...</p>
    )
  }

  loadWeekData() {
    const savedClassroom = this.props.classroom;
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    axios.get('/api/classrooms/' + this.props.classroom._id + '/activities?fromDate=' + weekStart.getTime() + '&toDate=' + weekEnd.getTime()).then(
      res => {
        if (savedClassroom === this.activitiesClassroom) {
          console.log("Aggiornate attività settimana");
          console.log(res.data);
          this.setState({
            'weekActivities':res.data,
            'weekStart': weekStart
          })
        }
      }, err => {
        if (savedClassroom === this.activitiesClassroom) {
          console.log(err.response);
          //todo alert
          alert("C'è stato un errore nel recuperare gli orari della'aula, riprova più tardi");
        }
      }
    )
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
}
