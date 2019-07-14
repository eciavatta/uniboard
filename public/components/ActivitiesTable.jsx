import React from "react";

import './ActivitiesTable.scss'

export default class ActivitiesTable extends React.Component {
  /**
   * Props: currWeek: Date della domenica della settimana corrente (giorno 0);
   *        selectedDay: Giorno da visualizzare in mobile
   *        activities: Attività da visualizzare
   */
  constructor(props) {
    super(props);

    this.getClassOfDayCell = this.getClassOfDayCell.bind(this);
    this.getDayOfWeekDate = this.getDayOfWeekDate.bind(this);
    this.getActivityAt = this.getActivityAt.bind(this);
  }

  render() {
    const dayStart = 9 * 2;
    const dayEnd = 19 * 2;

    const colSpanLeft = [0, 0, 0, 0, 0];
    const rows = [];
    for (let i = dayStart; i < dayEnd; i++) {
      rows.push(i);
    }
    const days = [0,1,2,3,4];

    return (
      <div className="activities-table timetables">
        <table className="table">
          <thead>
          <tr>
            <th scope="col" />
            <th className={this.getClassOfDayCell(1)} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(1))}</th>
            <th className={this.getClassOfDayCell(2)} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(2))}</th>
            <th className={this.getClassOfDayCell(3)} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(3))}</th>
            <th className={this.getClassOfDayCell(4)} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(4))}</th>
            <th className={this.getClassOfDayCell(5)} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(5))}</th>
          </tr>
          </thead>
          <tbody>
          {rows.map(rowTimeIndex => {
            return (
              <tr key={rowTimeIndex}>
                {(rowTimeIndex % 2 === 0) &&
                <th rowSpan="2">{rowTimeIndex / 2}:00 - {(rowTimeIndex / 2) + 1}:00</th>}
                {days.map(day => {
                  if (colSpanLeft[day] > 0) {
                    colSpanLeft[day]--;
                    return null;
                  } else {
                    const startingActivity = this.getActivityAt(day + 1, rowTimeIndex);
                    if (startingActivity) {
                      colSpanLeft[day] = startingActivity.to - startingActivity.from - 1;
                      return (
                        <td key={rowTimeIndex + "_" + day}
                            rowSpan={Math.min(dayEnd, startingActivity.to) - startingActivity.from}
                            className={this.getClassOfDayCell(day + 1)}>
                          {startingActivity.course ? startingActivity.course.name : startingActivity.description}
                        </td>)
                    } else {
                      return <td key={rowTimeIndex + "_" + day}
                                 className={this.getClassOfDayCell(day + 1)}/>
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

  getClassOfDayCell(day) {
    if (this.props.selectedDay === day) {
      return "selectedColumn";
    }
    return "";
  }

  getDayOfWeekDate(i) {
    const res = new Date(this.props.currWeek);
    res.setDate(res.getDate() + i);
    return res
  }

  getActivityAt(day, from) {
    const dayOfWeek = this.getDayOfWeekDate(day);
    for (let i = 0; i < this.props.activities.length; i++) {
      const activityDate = new Date(this.props.activities[i].date);
      if (this.props.activities[i].from === from &&
        activityDate.getFullYear() === dayOfWeek.getFullYear() &&
        activityDate.getMonth() === dayOfWeek.getMonth() &&
        activityDate.getDate() === dayOfWeek.getDate()) {
        return this.props.activities[i];
      }
    }
    return null;
  }

  static dateToString(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options)
  }
}
