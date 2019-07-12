/**
 * @param classroom The classroom that you want to know the status of
 * @param time The time at which you want to know the status of the classroom, in half hours from midnight (0-47)
 * @return Object
 *  code (Number) can be:
 *    0: there is an activity in this classroom at the specified time. If this activity is a lesson of a course attended by the user (if logged in) this will be 3 instead
 *    1: there is an activity in this classroom starting in less than 30 minutes, but it is currently free. If this activity is a lesson of a course attended by the user (if logged in) this will be 3 instead instead
 *    2: there is no activity in this classroom and there won't be any for more than 30 minutes
 *    3: special condition of 0 or 1
 *  isByReport (Boolean) is true if the current status is obtained by user reports
 */

exports.getStateOfClassroom = function(classroom, time) {
  let statusByReport = false;
  if (classroom.statusByReport && classroom.statusByReport.validFrom <= time && classroom.statusByReport.validTo > time ) {
    if (!classroom.statusByReport) {
      return {'code': 0, 'isByReport': true}; //is occupied but there should not be any activity
    }
    statusByReport = true;
  } else {
    const currentActivity = classroom.activities.filter(activity => activity.from <= time && activity.to > time);
    if (currentActivity.length > 0) {
      if (currentActivity.filter(activity => activity.attendedByUser).length > 0) {
        return {'code': 3, 'isByReport': false};
      } else {
        return {'code': 0, 'isByReport': false};
      }
    }
  }
  //is free, but i need to check if there will be an activity shortly
  const nextActivity = classroom.activities.filter(activity => activity.from === time + 1);
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

function halfHoursTimeToDate(time) {
  const res = new Date();
  res.setHours(Math.floor(time / 2));
  if (time % 2 > 0) {
    res.setMinutes(30);
  }
  return res;
}
