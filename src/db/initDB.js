const mongoose = require('mongoose');
require('../models/classroomsModel');
require('../models/coursesModel');
require('../models/activitiesModel');

db = mongoose.connect('mongodb://localhost/uniboardDB', { useNewUrlParser: true});

const Classroom = mongoose.model('Classroom');
const Course = mongoose.model('Course');
const Activity = mongoose.model('Activity');

function doClose() {
  console.log("Disconnecting...");
  mongoose.connection.close(() => console.log("Disconnected"));
}

async function doInsert() {
  function idByMatch(items, matchFunction) {
    for (let i = 0; i < items.length; i++) {
      if (matchFunction(items[i])) {
        return items[i]._id;
      }
    }
    throw "No matching item found for function:\n" + matchFunction.toString();
  }

  let classroomPromises = [];
  let classrooms = require('./classrooms.json');
  for (let i = 0; i < classrooms.length; i++) {
    classroomPromises.push(new Classroom(classrooms[i]).save());
  }
  console.log("Inserting classrooms...");
  let insertedClassrooms = await Promise.all(classroomPromises);
  function classromByName(name) {
    return idByMatch(insertedClassrooms, (classroom) => classroom.name === name)
  }
  console.log("Done");

  let coursesPromises = [];
  let courses = require('./courses.json');
  for (let i = 0; i < courses.length; i++) {
    coursesPromises.push(new Course(courses[i]).save());
  }
  console.log("Inserting courses...");
  let insertedCourses = await Promise.all(coursesPromises);
  function courseByName(name) {
    return idByMatch(insertedCourses, (course) => course.name === name)
  }
  console.log("Done");

  //Popola attività nella settimana precedente, corrente e successiva
  //I dati nel json devono essere aggiustati: date indica il giorno della settimana (1: lunedì), e course e classroom hanno il nome, che deve essere sostituito dall'id
  function isLeapYear(e){var r=e.getFullYear();return 0==(3&r)&&(r%100!=0||r%400==0)}
  function getDOY(e){var t=e.getMonth(),a=e.getDate(),n=[0,31,59,90,120,151,181,212,243,273,304,334][t]+a;return t>1&&isLeapYear(e)&&n++,n}
  function dateFromDay(d,y){var a=new Date(y,0);return new Date(a.setDate(d))}
  let now = new Date();
  let currentWeekZero = getDOY(now) - now.getDay();
  let activitiesPromises = [];
  let activities = require('./activities.json');
  for (let weeki = -1; weeki <= 1; weeki++) {
    for (let i = 0; i < activities.length; i++) {
      let currentActivity = Object.assign({}, activities[i]);
      if (currentActivity.course) {currentActivity.course = courseByName(currentActivity.course)}
      currentActivity.classroom = classromByName(currentActivity.classroom);
      currentActivity.date = dateFromDay(currentWeekZero + weeki * 7 + currentActivity.date, now.getFullYear());
      activitiesPromises.push(new Activity(currentActivity).save());
    }
  }
  console.log("Inserting activities...");
  let insertedActivities = await Promise.all(activitiesPromises);
  console.log("Done");

  console.log("All Done");
}

doInsert().then(doClose, function (err) {
  console.log("Error while inserting");
  console.log(err);
  doClose();
});

