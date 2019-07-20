import React from "react";

import './ActivitiesTable.scss'

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

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
    this.getActivitiesStartingAt = this.getActivitiesStartingAt.bind(this);
  }

  render() {
    const timeTable = this.buildTimeTable();

    const dayStart = 9 * 2;
    const dayEnd = 19 * 2;
    const timePerDay = dayEnd - dayStart;

    const rows = [];
    for (let i = dayStart; i < dayEnd; i++) {
      rows.push(i);
    }
    let days = [0,1,2,3,4];
    if (this.props.isMobile) {
      days = [this.props.selectedDay - 1];
    }
    const dayColumns = Array(5);
    days.forEach(day => {
      const numberOfActivities = timeTable[day].map(set => set.size).filter(x => x > 0);
      if (numberOfActivities.length === 0 || numberOfActivities.length === 1) {
        dayColumns[day] = 1;
      } else {
        dayColumns[day] = numberOfActivities.reduce(lcm);
      }
    });

    const activitiesSize = [];
    for (let i = 0; i < 5; i++) {
      activitiesSize.push(new Array(timePerDay).fill(0));
    }

    let thead = (
      <thead>
        <tr>
          <th scope="col" />
          {(!this.props.isMobile || this.props.selectedDay === 1) && <th className={this.getClassOfDayCell(1)} colSpan={dayColumns[0]} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(1))}</th>}
          {(!this.props.isMobile || this.props.selectedDay === 2) && <th className={this.getClassOfDayCell(2)} colSpan={dayColumns[1]} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(2))}</th>}
          {(!this.props.isMobile || this.props.selectedDay === 3) && <th className={this.getClassOfDayCell(3)} colSpan={dayColumns[2]} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(3))}</th>}
          {(!this.props.isMobile || this.props.selectedDay === 4) && <th className={this.getClassOfDayCell(4)} colSpan={dayColumns[3]} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(4))}</th>}
          {(!this.props.isMobile || this.props.selectedDay === 5) && <th className={this.getClassOfDayCell(5)} colSpan={dayColumns[4]} scope="col">{ActivitiesTable.dateToString(this.getDayOfWeekDate(5))}</th>}
        </tr>
      </thead>
    );

    return (
      <div className="activities-table timetables">
        <table className="table">
          { !this.props.isMobile || !this.props.hideHeaderOnMobile ? thead : null }
          <tbody>
          {rows.map(rowTimeIndex => {
            return (
              <tr key={rowTimeIndex}>
                {(rowTimeIndex % 2 === 0) &&
                <th rowSpan="2">{rowTimeIndex / 2}:00 - {(rowTimeIndex / 2) + 1}:00</th>}
                {days.map(day => {
                  const dayActivities = timeTable[day];
                  const dayActivitiesSize = activitiesSize[day];
                  const res = [];
                  const startingActivities = this.getActivitiesStartingAt(day + 1, rowTimeIndex);
                  startingActivities.forEach(activity => {
                    const concurrentActivitiesNumbers = [];
                    const startIndex = Math.max(0, activity.from - dayStart);
                    const endIndex = Math.min(timePerDay, activity.to - dayStart);
                    for (let i = startIndex; i < endIndex; i++) {
                      concurrentActivitiesNumbers.push(dayActivities[i].size);
                    }
                    const maxOfConcurrentActivities = Math.max.apply(null, concurrentActivitiesNumbers);
                    const activitySize = dayColumns[day]/maxOfConcurrentActivities;
                    for (let i = startIndex; i < endIndex; i++) {
                      dayActivitiesSize[i] += activitySize;
                    }
                    res.push(
                      <td key={day + "_" + rowTimeIndex + "_" + activity._id}
                          rowSpan={activity.to - activity.from}
                          colSpan={activitySize}>
                        {activity.course
                          ? activity.course.name
                          : activity.description}
                      </td>);
                  });
                  const fillerSize = dayColumns[day] - dayActivitiesSize[rowTimeIndex - dayStart];
                  if (fillerSize > 0) {
                    res.push(<td key={day + "_" + rowTimeIndex + "_filler"} colSpan={fillerSize}/>);
                  }
                  return res;
                })}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

  buildTimeTable() {
    //init array with sets
    const dayStart = 9 * 2;
    const dayEnd = 19 * 2;
    const timePerDay = dayEnd - dayStart;
    const timeTable = Array(5);
    for (let i = 0; i < 5; i++) {
      const dayArray = Array(timePerDay);
      for (let j = 0; j < timePerDay; j++) {
        dayArray[j] = new Set();
      }
      timeTable[i] = dayArray;
    }

    //populate
    this.props.activities.forEach(activity => {
      const activityDay = new Date(activity.date).getDay();
      if (activityDay > 0 && activityDay < 6 ) {
        for (let time = activity.from; time < activity.to; time++) {
          if (time >= dayStart && time < dayEnd) {
            timeTable[activityDay - 1][time - dayStart].add(activity)
          }
        }
      }
    });

    return timeTable;
  }

  getClassOfDayCell(day) {
    if (this.props.selectedDay !== day || this.props.isMobile) {
      return "";
    }
    return "selectedColumn";
  }

  getDayOfWeekDate(i) {
    const res = new Date(this.props.currWeek);
    res.setDate(res.getDate() + i);
    return res
  }

  getActivitiesStartingAt(day, from) {
    const res = new Set();
    for (let i = 0; i < this.props.activities.length; i++) {
      const activityDate = new Date(this.props.activities[i].date);
      if (this.props.activities[i].from === from &&
        activityDate.getDay() === day) {
        res.add(this.props.activities[i]);
      }
    }
    return res;
  }

  static dateToString(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options)
  }
}
