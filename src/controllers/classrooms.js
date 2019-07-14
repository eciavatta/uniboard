const mongoose = require('mongoose');
const Classroom = mongoose.model('Classroom');
const Activity = mongoose.model('Activity');
const UserReport = mongoose.model('UserReport');
const User = mongoose.model('User');
const utils = require('../utils');
const ensureAuthenticated = utils.ensureAuthenticated;
const unexpectedError = utils.unexpectedError;

exports.list_classrooms = function(req, res) {
  Classroom.find({}).then(
    classrooms => res.json(classrooms),
    err => unexpectedError(err, res)
  );
};

exports.list_classrooms_activities = async function (req, res) {
  try {
    let onDate = new Date(parseInt(req.query.onDate));
    if (isNaN(onDate.getTime())) {
      onDate = new Date();
    }
    const onDateDay = new Date(onDate.getFullYear(), onDate.getMonth(), onDate.getDate());

    const groupedActivities = await Activity.aggregate([
      {$match: {date: onDateDay}},
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: {
          path: '$course',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$classroom',
          activities: {
            $push: {
              course: '$course',
              description: '$description',
              date: '$date',
              from: '$from',
              to: '$to'
            }
          }
        }
      },
      {
        $project: {
          '_id': 1,
          'activities.course._id': 1,
          'activities.course.name': 1,
          'activities.date': 1,
          'activities.from': 1,
          'activities.to': 1
        }
      }
    ]);

    const classroomsWithActivities = new Set(groupedActivities.map(group => group._id.toString()));
    const allClassrooms = await Classroom.find({}).select({'_id': 1});
    allClassrooms.forEach(classroom => {
      if (!classroomsWithActivities.has(classroom._id.toString())) {
        groupedActivities.push({'_id': classroom._id, 'activities': []});
      }
    });
    const enrichedData = await Promise.all(groupedActivities.map(async function (classroomData) {
      const activities = classroomData.activities;
      if (req.user) {
        activities
          .filter(activity => req.user.courses.includes(activity.course._id))
          .forEach(activity => activity.attendedByUser = true);
      }

      if (req.query.includeCurrentStatusByReport) {
        const now = new Date();
        const [previousReports, currentActivity] = await findPreviousReportsAndCurrentActivity(now, classroomData._id, activities);
        const [reportsAfterGroup, isFreeByReports] = removeBeforeNewestGroupAndGetAgreedValue(previousReports);
        const isFreeBySchedule = currentActivity === null;
        if (isFreeByReports !== null && isFreeBySchedule !== isFreeByReports) {
          const validFrom = dateToHalfHours(now);
          let validTo;
          if (currentActivity !== null) {
            validTo = currentActivity.to;
          } else {
            const latestReportOfGroup = reportsAfterGroup[reportsAfterGroup.length - VALID_GROUP_SIZE];
            const hourAfterLatest = new Date(latestReportOfGroup.timestamp);
            hourAfterLatest.setHours(hourAfterLatest.getHours() + 1);
            validTo = dateToHalfHours(hourAfterLatest);
            const earliestNextActivity = getEarliestActivityAfterTime(validFrom, activities);
            if (earliestNextActivity && validTo > earliestNextActivity.from) {
              validTo = earliestNextActivity.from;
            }
          }
          classroomData.statusByReport = {
            'isFree': isFreeByReports,
            'validFrom': validFrom,
            'validTo': validTo
          };
        }
      }

      return classroomData;
    }));

    res.json(enrichedData);
  } catch (err) {
    unexpectedError(err, res);
  }
};

exports.add_report = function(req, res) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isActuallyFree = req.body.isActuallyFree;
  /*TODO if (now.getHours() < 9 || now.getHours() >= 19 || now.getDay() === 0 || now.getDay() === 6) {
    res.status(400);
    res.send("Reports are not accepted now");
  } else */if (!(isActuallyFree === true || isActuallyFree === false)) {
    res.status(400);
    res.send("Body should contain boolean isActuallyFree");
  } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    res.send("Invalid classroom id");
  } else if (ensureAuthenticated(req,res)) {
    Classroom.findById(req.params.id, async function (err, classroom) {
      if (err) {
        unexpectedError(err, res);
      } else if (!classroom) {
        res.status(404);
        res.send("No classroom matching provided id was found");
      } else {
        const newReport = new UserReport({
          classroom: classroom._id,
          user: req.user._id,
          actualStatusFree: isActuallyFree,
        });
        try {
          const classroomActivities = await Activity.find({'classroom': classroom._id, 'date': today});
          const [sortedPreviousReports, currentActivity] = await findPreviousReportsAndCurrentActivity(now, classroom._id, classroomActivities);
          doAddReport(newReport, sortedPreviousReports, currentActivity === null, res);
        } catch (err) {
          unexpectedError(err, res);
        }
      }
    })
  }
};

exports.get_classroom_activities = function(req,res) {
  const now = new Date();
  let fromDate = new Date(parseInt(req.query.fromDate));
  if (isNaN(fromDate.getTime())) {
    fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  let toDate = new Date(parseInt(req.query.toDate));
  if (isNaN(toDate.getTime())) {
    toDate = new Date(fromDate);
    toDate.setDate(fromDate.getDate() + 1);
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    res.send("Invalid classroom id");
  } else {
    Activity.find({'classroom': req.params.id, 'date': {$gte: fromDate, $lt: toDate}}).populate('course', 'name').then(
      activities => res.json(activities),
      err => unexpectedError(err, res)
    );
  }
};

/**
 * Finds valid userReport for a classroom, considering its current/previous activity
 * @returns Array [[valid UserReports], Currently scheduled activity or null if none]
 */
async function findPreviousReportsAndCurrentActivity(now, classroomId, classroomActivities) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const time = dateToHalfHours(now);
  const currActivity = getActivityAtTime(time, classroomActivities);
  let from;
  if (currActivity) {
    from = dateFromHalfHours(today, currActivity.from);
  } else {
    const previousHour = new Date(now);
    previousHour.setHours(now.getHours() - 1);
    const previousTime = dateToHalfHours(previousHour);
    const prevActivity = getActivityAtTime(previousTime, classroomActivities);
    if (prevActivity) {
      from = dateFromHalfHours(today, prevActivity.to);
    } else {
      from = previousHour;
    }
  }
  return [await UserReport.find({'timestamp': {$gte: from}, 'classroom': classroomId}).sort({'timestamp': -1}), currActivity ? currActivity : null];
}

const VALID_GROUP_SIZE = 3;

function doAddReport(newReport, sortedPreviousReports, freeBySchedule, res) {
  const [filteredReports, agreedStatus] = removeBeforeNewestGroupAndGetAgreedValue(sortedPreviousReports);
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
function removeBeforeNewestGroupAndGetAgreedValue(sortedReports) {
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
  res.setHours(Math.floor(time / 2));
  if (time % 2 > 0) {
    res.setMinutes(30);
  }
  return res;
}

/**
 * @param time time in half hours since midnight (same format as from and to in activity)
 * @param activities a list of activities for a classroom
 * @return Object an activity in the list that is planned during the specified time, or null if none is planned at that time
 */
function getActivityAtTime(time, activities) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].from <= time && activities[i].to > time) {
      return activities[i];
    }
  }
  return null;
}

/**
 * @param time time in half hours since midnight (same format as from and to in activity)
 * @param activities a list of activities for a classroom
 * @return Object the earliest activity that is planned to start after the specified time
 */
function getEarliestActivityAfterTime(time, activities) {
  let earliest = null;
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].from > time) {
      if (!earliest || (earliest && activities[i].from < earliest.from)) {
        earliest = activities[i];
      }
    }
  }
  return earliest;
}
