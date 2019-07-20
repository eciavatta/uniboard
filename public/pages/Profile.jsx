import React from 'react';
import SinglePage from '../layouts/SinglePage';
import InputField from '../components/inputs/InputField';
import axios from 'axios';

import './Profile.scss'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'searchResult': null,
      'courseSearchValue': "",
      'courseButtonsDisabled': false
    };

    this.onSearchCourses = this.onSearchCourses.bind(this);
    this.doRemoveCourse = this.doRemoveCourse.bind(this);
    this.doAddCourse = this.doAddCourse.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    Promise.all([
      axios.get('/api/users/self'),
      axios.get('/api/users/self/score'),
      axios.get('/api/users/self/courses')
    ]).then(
      ([user, userScore, userCourses]) => {
        this.setState({
          'user': user.data,
          'userScore': userScore.data,
          'userCourses': userCourses.data.courses
        })
      },
      err => {
        if (err.response.status === 403) {
          this.props.history.push("/login?redirectTo=%2Fprofile");
        } else {
          this.setState({
            'error': true
          })
        }
      }
    )
  }

  onSearchCourses(e) {
    if (e.length < 3) {
      this.setState({
        'searchResult': null,
        'searchError': false
      });

      return;
    }

    axios.get('api/courses?nameContains=' + encodeURIComponent(e)).then(
      res => this.setState({'searchResult': res.data}),
      err => this.setState({'searchError':true})
    );
  }

  doAddCourse(course) {
    if (!this.state.courseButtonsDisabled) {
      this.setState({'courseButtonsDisabled': true});
      axios.post("/api/users/self/courses/" + course._id).then(
        res => {
          this.setState((state, props) => {
            const newUserCourses = state.userCourses.slice(0);
            newUserCourses.push(course);
            return {
              'userCourses': newUserCourses,
              'courseButtonsDisabled': false
            }
          });
        },
        err => {
          this.setState({'courseButtonsDisabled': false});
          //TODO alert
          alert("C'è stato un errore nell'aggiunta del corso, riprova più tardi");
        }
      )
    }
  }

  doRemoveCourse(course) {
    if (!this.state.courseButtonsDisabled) {
      this.setState({'courseButtonsDisabled': true});
      axios.delete("/api/users/self/courses/" + course._id).then(
        res => {
          this.setState((state, props) => {
            const newUserCourses = state.userCourses.filter(userCourse => course._id !== userCourse._id);
            return {
              'userCourses': newUserCourses,
              'courseButtonsDisabled': false
            }
          });
        },
        err => {
          this.setState({'courseButtonsDisabled': false});
          //TODO alert
          alert("C'è stato un errore nella rimozione del corso, riprova più tardi");
        }
      )
    }
  }

  doLogout() {
    axios.get('/api/logout').then(
      res => {
        window.isLogged = false;
        this.props.history.push("/login");
      },
      err => {
        console.log("Error while logging out");
        console.log(err.response);
      }
    );
  }

  render() {
    return (
      <SinglePage isLogged={true} pageTitle="Profilo">
        <div className="profile container">
          <div className="scrollable h-100">
            {this.renderLoadingOrError()}
            {this.renderProfile()}
          </div>
        </div>
      </SinglePage>
    );
  }

  renderLoadingOrError() {
    if (this.state.error) {
      return <div>C'è stato un errore nel caricamento delle informazioni, riprova più tardi.</div>
    } else if (!this.state.user) {
      return <div>Caricando...</div>
    }
  }

  renderProfile() {
    if (this.state.user) {
      return (
        <div className="profile-wrapper position-relative">
          <div className="profile-header position-relative">
            <div className="row">
              <div className="col">
                <h2>Ciao {this.state.user.username}!</h2>
              </div>
              <div className="col-auto">
                <button onClick={this.doLogout} className="mini-button">Disconnetti</button>
              </div>
            </div>

            <div className="row-guidelines" />
          </div>

          <div className="row trophies">
            <div className="col-md-auto">
              {/* this.state.userScore.score > 0 && */}
              <div className="user-position">{this.state.userScore.position}</div>
              <div className="user-score">{this.state.userScore.score} punti</div>
            </div>
            <div className="col-md">
              <div className="user-position-description">
                <span>Congratulazioni! Sei il {this.state.userScore.position}&#176; utente con più punti!</span>
                {this.state.userScore.toNext > 0
                  ? <span>Ti mancano solo {this.state.userScore.toNext} punti per raggiungere il prossimo utente! Continua a fare
                    segnalazioni per scalare la classifica!</span>
                  : <span>Non c'è nessuno con più punti di te, ma dovrai continuare a fare segnalazioni per mantenere la tua
                    posizione!</span>}
              </div>
            </div>
          </div>

          <div className="manage-classrooms position-relative">
            <div className="row">
              <div className="col-md-6 add-box">
                <div className="box-title position-relative">
                  Aggiungi nuovi corsi

                  <div className="row-guidelines" />
                </div>

                <div className="box-inputs">
                  <InputField placeholder="Nome corso" onChange={this.onSearchCourses}/>
                </div>

                <div className="box-results position-relative">
                  {this.showSearchResult()}

                  <div className="row-guidelines" />
                  <div className="column-guidelines" />
                </div>
              </div>

              <div className="col-md-6 remove-box">
                <div className="box-title position-relative">
                  Rimuovi corsi già selezionati

                  <div className="row-guidelines" />
                </div>

                <div className="box-inputs text-right d-none d-md-block">
                  <button className="mini-button">Rimuovi tutti</button>
                </div>

                <div className="box-results position-relative">
                  {this.state.userCourses.length > 0
                    ? this.state.userCourses.map((course) => this.showCourse(course, true))
                    : <span>Non hai ancora aggiunto nessun corso. Aggiungi dei corsi per poterli visualizzare negli orari</span>}

                  <div className="row-guidelines" />
                  <div className="column-guidelines" />
                </div>
              </div>
            </div>
          </div>

          <div className="row-guidelines" />
          <div className="column-guidelines" />
        </div>
      )
    }
  }

  showCourse(course, isOfUser) {
    return (
      <div key={course._id} className="row result-item">
        <div className="col result-name">
          {course.name} A.A. {course.year}-{course.year + 1}
        </div>
        <div className="col-auto result-button">
          {isOfUser
            ? <button disabled={this.state.courseButtonsDisabled} onClick={(e) => this.doRemoveCourse(course)} className="mini-button">Rimuovi</button>
            : <button disabled={this.state.courseButtonsDisabled} onClick={(e) => this.doAddCourse(course)} className="mini-button">Aggiungi</button>}
        </div>
      </div>
    )
  }

  showSearchResult() {
    if (this.state.searchError) {
      return <span>C'è stato un errore nell'effettuare la ricerca, riprova più tardi</span>
    } else if (this.state.searchResult === null) {
      return <span>Digita per cercare</span>;
    } else if (this.state.searchResult) {
      const noUserResults = this.state.searchResult.filter(course => !this.state.userCourses.map(userCourse => userCourse._id).includes(course._id));
      if (noUserResults.length === 0) {
        return <span>Nessun risultato</span>;
      } else {
        return noUserResults.map(course => this.showCourse(course, this.state.userCourses.map(userCourse => userCourse._id).includes(course._id)));
      }
    }
  }
}
