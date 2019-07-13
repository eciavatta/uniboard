/**
 * @param classroom The classroom that you want to know the status of
 * @param classroomActivities All classroom activities
 * @param time The time at which you want to know the status of the classroom, in half hours from midnight (0-47)
 * @return Object
 *  code (Number) can be:
 *    0: there is an activity in this classroom at the specified time. If this activity is a lesson of a course attended by the user (if logged in) this will be 3 instead
 *    1: there is an activity in this classroom starting in less than 30 minutes, but it is currently free. If this activity is a lesson of a course attended by the user (if logged in) this will be 3 instead instead
 *    2: there is no activity in this classroom and there won't be any for more than 30 minutes
 *    3: special condition of 0 or 1
 *    4: unknown status
 *  isByReport (Boolean) is true if the current status is obtained by user reports
 */

exports.getStateOfClassroom = function(classroom, classroomActivities, time) {
  let activitiesData = classroomActivities[classroom._id];

  if (!activitiesData) {
    return {'code':4, 'isByReport': false};
  }

  let statusByReport = false;
  if (activitiesData.statusByReport && activitiesData.statusByReport.validFrom <= time && activitiesData.statusByReport.validTo > time ) {
    if (!activitiesData.statusByReport) {
      return {'code': 0, 'isByReport': true}; //is occupied but there should not be any activity
    }
    statusByReport = true;
  } else {
    const currentActivity = activitiesData.activities.filter(activity => activity.from <= time && activity.to > time);
    if (currentActivity.length > 0) {
      if (currentActivity.filter(activity => activity.attendedByUser).length > 0) {
        return {'code': 3, 'isByReport': false};
      } else {
        return {'code': 0, 'isByReport': false};
      }
    }
  }
  //is free, but i need to check if there will be an activity shortly
  const nextActivity = activitiesData.activities.filter(activity => activity.from === time + 1);
  if (nextActivity.length > 0) {
    if (nextActivity.filter(activity => activity.attendedByUser).length > 0) {
      return {'code': 3, 'isByReport': statusByReport};
    } else {
      return {'code': 1, 'isByReport': statusByReport};
    }
  } else {
    return {'code': 2, 'isByReport': statusByReport};
  }
};

exports.dateToHalfHoursTime = function(date) {
  return date.getHours() * 2 + (date.getMinutes() >= 30 ? 1 : 0);
};

/**
 * Prepares classroom data retrieved from the api in order to make them match with the data expected by the components
 */
exports.prepareClassroomData = function(classroomData) {
  classroomData.forEach(classroom => {
    let points = "";
    for (let i = 0; i < classroom.mapCoordinates.length; i += 2) {
      points += classroom.mapCoordinates[i] + "," + classroom.mapCoordinates[i+1] + " ";
    }
    classroom.mapCoordinates = points;
  });
  return classroomData;
};

exports.prepareClassroomActivitiesData = function(classroomActivities) {
  const res = {};
  classroomActivities.forEach(classroom => {
    const data = {'activities': classroom.activities};
    if (classroom.statusByReport !== undefined) {
      data.statusByReport = classroom.statusByReport;
    }
    res[classroom._id] = data;
  });
  return res;
};

exports.findClassroomById = function(id, classroom) {
  for (let i = 0; i < classroom.length; i++) {
    if (classroom[i]._id === id) {
      return classroom[i];
    }
  }
  return null;
};

function halfHoursTimeToDate(time) {
  const res = new Date();
  res.setHours(Math.floor(time / 2));
  if (time % 2 > 0) {
    res.setMinutes(30);
  }
  return res;
}
