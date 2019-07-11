const mongoose = require('mongoose');
const Classroom = mongoose.model('Classroom');
const Activity = mongoose.model('Activity');
const UserReport = mongoose.model('UserReport');
const User = mongoose.model('User');
const unexpectedError = require('../utils').unexpectedError;

exports.list_classrooms = function(req, res) {
  let onDate = new Date(parseInt(req.query.onDate));
  if (isNaN(onDate.getTime())) {
    onDate = new Date();
  }
  const today = new Date(onDate.getFullYear(), onDate.getMonth(), onDate.getDate());

  const classroomQueryResult = Classroom.find({});
  const activityQueryResult = Activity.find({date: today}).select({_id: 0}).populate('course','name -_id');
  Promise.all([classroomQueryResult, activityQueryResult]).then(
    function (queryResults) {
      const classActivities = {};
      queryResults[1].forEach(function(activity) {
        if (!classActivities[activity.classroom]) {
          classActivities[activity.classroom] = [];
        }
        const activityObj = activity.toObject();
        delete activityObj.classroom;
        if (activityObj.course) {
          activityObj.course = activity.course.name;
        }
        classActivities[activity.classroom].push(activityObj);
      });

      Promise.all(queryResults[0].map(async function(classroom) {
        const resObj = classroom.toObject();
        resObj.activities = classActivities[classroom._id] ? classActivities[classroom._id] : [];
        //TODO improve function efficiency by doing a bulk version, and already use known activities.
        const previousReportData = await findPreviousReports(new Date(), classroom);
        const isFreeByReports = removeBeforeNewestGroup(previousReportData[0])[1];
        if (isFreeByReports !== null) {
          resObj.isFreeByReports = isFreeByReports;
        }
        return resObj;
      })).then(promiseRes => res.json(promiseRes), err => res.send(err));
    },
    function (err) {
      res.send(err);
    }
  );
};

exports.add_report = function(req, res) {
  const now = new Date();
  const isActuallyFree = req.body.isActuallyFree;
  /*if (now.getHours() < 9 || now.getHours() >= 19 || now.getDay() === 0 || now.getDay() === 6) {
    res.status(400);
    res.send("Reports are not accepted now");
  } else */if (!(isActuallyFree === true || isActuallyFree === false)) {
    res.status(400);
    res.send("Body should contain boolean isActuallyFree");
  } else if (!req.user) {
    res.status(403);
    res.send("You need to be authenticated to perform this operation");
  } else {
    Classroom.findById(req.params.id, async function (err, classroom) {
      if (err) {
        if (err.name === 'CastError' && err.path === '_id') {
          res.status(400);
          res.send("Invalid classroom id");
        } else {
          unexpectedError(err, res);
        }
      } else if (!classroom) {
        console.log(classroom);
        res.status(404);
        res.send("No classroom matching provided id was found");
      } else {
        const newReport = new UserReport({
          classroom: classroom._id,
          user: req.user._id,
          actualStatusFree: isActuallyFree,
        });
        try {
          const previousReportsData = await findPreviousReports(now, classroom);
          doAddReport(newReport, previousReportsData[0], previousReportsData[1], res);
        } catch (err) {
          unexpectedError(err, res);
        }
      }
    })
  }
};

/**
 * Finds valid userReport for a classroom, considering its current/previous activity
 * @returns Array [[valid UserReports], boolean no activity is scheduled now for classroom]
 */
async function findPreviousReports(now, classroom) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const time = dateToHalfHours(now);
  const currActivity = await Activity.findOne({'classroom': classroom._id, 'date': today, 'from': {$lte: time}, 'to': {$gt: time}});
  let from;
  let freeBySchedule;
  if (currActivity) {
    from = dateFromHalfHours(today, currActivity.time);
    freeBySchedule = false;
  } else {
    freeBySchedule = true;
    const previousHour = new Date(now);
    previousHour.setHours(now.getHours() - 1);
    const previousTime = dateToHalfHours(previousHour);
    const prevActivity = await Activity.findOne(
      {'classroom': classroom._id, 'date': today, 'from': {$lte: previousTime}, 'to': {$gt: previousTime}});
    if (prevActivity) {
      from = dateFromHalfHours(today, prevActivity.to);
    } else {
      from = previousHour;
    }
  }
  return [await UserReport.find({'timestamp': {$gte: from}, 'classroom': classroom._id}).sort({'timestamp': -1}), freeBySchedule];
}

const VALID_GROUP_SIZE = 3;

function doAddReport(newReport, sortedPreviousReports, freeBySchedule, res) {
  console.log("");
  const processedReports = removeBeforeNewestGroup(sortedPreviousReports);
  const filteredReports = processedReports[0];
  const agreedStatus = processedReports[1];
  if ((agreedStatus !== null ? newReport.actualStatusFree === agreedStatus : newReport.actualStatusFree === freeBySchedule) || //The report agrees with what the system already thinks
    filteredReports.filter(report => report.user.equals(newReport.user)).length > 0 /*There is already a report from this user*/) {
    //The new report won't be added, but we won't tell the user
    //console.log("Not actually added report");
    res.status(200);
    res.json(newReport);
  } else {
    //console.log("Adding report");
    newReport.save(function (err) {
      if (err) {
        unexpectedError(err, res);
      } else {
        const firstElems = filteredReports.splice(0, VALID_GROUP_SIZE - 1);
        if (firstElems.filter(elem => newReport.actualStatusFree === elem.actualStatusFree).length === VALID_GROUP_SIZE - 1) {
          firstElems.push(newReport);
          const usersToUpdate = firstElems.map(elem => elem.user);
          //console.log("Updating users score");
          User.updateMany({'_id': { $in: usersToUpdate}}, {$inc: { 'reportScore': 1 }}, function(err) {
            if (err) {
              unexpectedError(err, res);
            } else {
              res.status(200);
              res.send(newReport);
            }
          });
        } else {

          res.status(200);
          res.send(newReport);
        }
      }
    });
  }
}

/**
 * A valid group consist of VALID_GROUP_SIZE consecutive UserReport agreeing on the same actual status.
 * Returns an array containing
 *  0: a new array without the elements after the latest valid group.
 *  1: the value agreed on by the latest valid group or null if there was no valid group
 * example with VALID_GROUP_SIZE = 3:
 *  in:    [T F F T T F F F T F T T T F F F]
 *  out:  [[T F F T T F F F] F]
 * @param sortedReports array of user reports sorted from the newest to the oldest
 * @returns Array containing:
 *    0: a new array containing all the reports that were added after the latest valid group and that group, or the an array equal to the input if no valid group was found
 *    1: the value agreed on by the latest valid group or null if there was no valid group
 */
function removeBeforeNewestGroup(sortedReports) {
  let currCount = 0;
  let currValue = null;
  const res = [];
  for (let i = 0; i < sortedReports.length; i++) {
    if (sortedReports[i].actualStatusFree !== currValue) {
      currValue = sortedReports[i].actualStatusFree;
      currCount = 1;
    } else {
      currCount++;
    }
    res.push(sortedReports[i]);
    if (currCount === VALID_GROUP_SIZE) {
      return [res, currValue];
    }
  }
  return [res, null];
}

function dateToHalfHours(d) {
  return d.getHours() * 2 + (d.getMinutes() >= 30 ? 1 : 0);
}

function dateFromHalfHours(today, time) {
  const res = new Date(today);
  res.setHours(time / 2);
  if (time % 2 > 0) {
    res.setMinutes(30);
  }
  return res;
}
