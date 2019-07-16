import React from 'react';

import SinglePage from '../layouts/SinglePage';
import ActivitiesTable from '../components/ActivitiesTable';

//import './Lessons.scss';

import axios from 'axios';

const Status = {
  LOADING: 0,
  ERROR: 1,
  NOT_LOGGED: 2,
  NO_COURSES: 3,
  OK: 4
};

export default class Lessons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'status': Status.LOADING,
      'weekChangeDisabled': false,
      'selectedDay': Math.min(Math.max(new Date().getDay(), 1), 5)
    };

    this.weekDelta = 0;

    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.loadWeekData = this.loadWeekData.bind(this);
    this.showTableOrOther = this.showTableOrOther.bind(this);
  }

  componentDidMount() {
    this.loadWeekData(0);
  }

  render() {
    return (
      <SinglePage pageTitle="Lezioni">
        {this.showTableOrOther()}
      </SinglePage>
    );
  }

  showTableOrOther() {
    switch (this.state.status) {
      case Status.LOADING:
        return (
          <p>Caricando</p>
        );
      case Status.ERROR:
        return (
          <p>Errore</p>
        );
      case Status.NOT_LOGGED:
        return (
          <p>Devi fare login per fare sto robo</p>
        );
      case Status.NO_COURSES:
        return (
          <p>Non hai settato nessun corso, settali dalla pagina del tuo <a href="/profile">profilo</a></p>
        );
      case Status.OK:
        return (
          <div>
            <ActivitiesTable activities={this.state.weekActivities}
                             currWeek={this.state.currWeek}
                             selectedDay={this.state.selectedDay}/>
            <button disabled={this.state.weekChangeDisabled} onClick={this.prevWeek}>Settimana precedente</button>
            <button disabled={this.state.weekChangeDisabled} onClick={this.prevDay}>Giorno precedente</button>
            <button disabled={this.state.weekChangeDisabled} onClick={this.nextDay}>Giorno successivo</button>
            <button disabled={this.state.weekChangeDisabled} onClick={this.nextWeek}>Settimana successiva</button>
          </div>
        )
    }
  }


  nextDay() {
    const currDay = this.state.selectedDay;
    if (currDay < 5) {
      this.setState({'selectedDay': currDay + 1});
    } else {
      this.setState({'selectedDay': 1});
      this.loadWeekData(this.weekDelta + 1);
    }
  }
  prevDay() {
    const currDay = this.state.selectedDay;
    if (currDay > 1) {
      this.setState({'selectedDay': currDay - 1});
    } else {
      this.setState({'selectedDay': 5});
      this.loadWeekData(this.weekDelta - 1);
    }
  }
  prevWeek() {this.loadWeekData(this.weekDelta - 1);}
  nextWeek() {this.loadWeekData(this.weekDelta + 1);}
  loadWeekData(weekDelta) {
    this.weekDelta = weekDelta;
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 7 * weekDelta); //sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    this.setState({
      'weekChangeDisabled': true,
      'currWeek': weekStart,
    });

    axios.get('/api/users/self/courses/schedule?fromDate=' + weekStart.getTime() + '&toDate=' + weekEnd.getTime()).then(
      res => {
        if (res.status === 204) {
          this.setState({
            'status': Status.NO_COURSES,
            'weekChangeDisabled': false
          });
        } else {
          console.log("Aggiornate attività settimana");
          console.log(res.data);
          this.setState({
            'weekActivities':res.data,
            'weekChangeDisabled': false,
            'status': Status.OK,
            'activities': res.data
          });
        }
      }, err => {
        if (err.response.status === 403) {
          this.props.history.push("/login?redirectTo=%2Flessons");
        } else {
          this.setState({
            'status': Status.ERROR,
            'weekChangeDisabled': false
          });
        }
      }
    )
  }
}
