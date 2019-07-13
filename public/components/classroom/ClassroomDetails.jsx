import React from "react";

import "./ClassroomDetails.scss";

export default class extends React.Component {

  render() {
    return (
      <div className="classroom-details">
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
                <td>Primo piano</td>
                <td>100 posti</td>
                <td>Libera</td>
                <td>N.A.</td>
                <td>N.A.</td>
                <td>N.A.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="timetables">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Lunedì 8 luglio</th>
                <th scope="col">Martedì 9 luglio</th>
                <th scope="col">Mercoledì 10 luglio</th>
                <th scope="col">Giovedì 11 luglio</th>
                <th scope="col">Venerdì 12 luglio</th>
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

        <div className="column-guidelines" style={{left: '15px', right: '15px', bottom: '-15px'}} />
      </div>
    );
  }

}
