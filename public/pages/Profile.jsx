import React from 'react';
import SinglePage from '../layouts/SinglePage';
import InputField from '../components/inputs/InputField';
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'addingCourse': false,
      'courseSearchValue': "",
      'courseButtonsDisabled': false
    };

    this.changeAddCourseVisibility = this.changeAddCourseVisibility.bind(this);
    this.searchCourseChanged = this.searchCourseChanged.bind(this);
    this.onSearchCourseSubmit = this.onSearchCourseSubmit.bind(this);
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

  changeAddCourseVisibility() {
    this.setState((state, props) => ({
      'addingCourse': !state.addingCourse
    }));
  }

  searchCourseChanged(c) {
    this.setState({
      'courseSearchValue': c
    });
  }

  onSearchCourseSubmit(e) {
    this.setState({
      'searchResult': null,
      'searchError': false
    });
    axios.get('api/courses?nameContains=' + encodeURIComponent(this.state.courseSearchValue)).then(
      res => this.setState({'searchResult': res.data}),
      err => this.setState({'searchError':true})
    );
    e.preventDefault();
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
      <SinglePage>
        {this.renderLoadingOrError()}
        {this.renderProfile()}
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
      return <div>
        <button onClick={this.doLogout}>Log out</button>

        <div>
          <div>Ciao {this.state.user.username}!</div>
        </div>

        <div>
          <div>
            {/*TODO sfondo medaglia, posizione in grande*/}
            {this.state.userScore.score > 0 &&
              <div>{this.state.userScore.position}</div>}
          </div>
          <div>Punteggio: {this.state.userScore.score}</div>
          <div>Congratulazioni! Sei il {this.state.userScore.position}&#176; utente con più punti!</div>
          {this.state.userScore.toNext > 0
            ? <div>Ti mancano solo {this.state.userScore.toNext} punti per raggiungere il prossimo utente! Continua a fare
              segnalazioni per scalare la classifica!</div>
            : <div>Non c'è nessuno con più punti di te, ma dovrai continuare a fare segnalazioni per mantenere la tua
              posizione!</div>}
        </div>

        <div>
          <button onClick={this.changeAddCourseVisibility}>Mostra/nascondi aggiunta corso</button>
          {this.showAddCourse()}
          <div>
            {this.state.userCourses.length > 0
              ? this.state.userCourses.map((course) => this.showCourse(course, true))
              : <div>Non hai ancora aggiunto nessun corso. Aggiungi dei corsi per poterli visualizzare negli orari</div>}
          </div>
        </div>
      </div>
    }
  }

  showCourse(course, isOfUser) {
    return <div key={course._id}>
      {course.name} A.A. {course.year}-{course.year + 1}
      {isOfUser
        ? <button disabled={this.state.courseButtonsDisabled} onClick={(e) => this.doRemoveCourse(course)}>Rimuovi</button>
        : <button disabled={this.state.courseButtonsDisabled} onClick={(e) => this.doAddCourse(course)}>Aggiungi</button>}
    </div>
  }

  showAddCourse() {
    if (this.state.addingCourse) {
      return <div>
        <form onSubmit={this.onSearchCourseSubmit}>
          <InputField placeholder="Nome corso" value={this.state.courseSearchValue} onChange={this.searchCourseChanged}/>
          <button type="submit">Cerca</button>
        </form>
        <div>
          {this.showSearchResult()}
        </div>
      </div>
    }
  }

  showSearchResult() {
    if (this.state.searchError) {
      return <div>C'è stato un errore nell'effettuare la ricerca, riprova più tardi</div>
    } else if (this.state.searchResult === null) {
      return <div>Cercando...</div>;
    } else if (this.state.searchResult) {
      const noUserResults = this.state.searchResult.filter(course => !this.state.userCourses.map(userCourse => userCourse._id).includes(course._id));
      if (noUserResults.length === 0) {
        return <div>Nessun risultato</div>;
      } else {
        return noUserResults.map(course => this.showCourse(course, this.state.userCourses.map(userCourse => userCourse._id).includes(course._id)));
      }
    }
  }
}
