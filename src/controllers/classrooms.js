var mongoose = require('mongoose');
var Classroom = mongoose.model('Classroom');
var Activity = mongoose.model('Activity');

exports.list_classrooms = function(req, res) {
  const includeCoordinates = req.query.withCoordinates !== undefined;
  const includeName = req.query.withClassroomName !== undefined;
  const includeType = req.query.withClassroomType !== undefined;
  const includeFloor = req.query.withClassroomFloor !== undefined;
  const includeCourse = req.query.withCourseInSchedule !== undefined;

  //req.query.withCoordinates
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const toIncludeInClass = {};
  if (includeName) toIncludeInClass.name = 1;
  if (includeType) toIncludeInClass.type = 1;
  if (includeFloor) toIncludeInClass.floor = 1;
  if (includeCoordinates) toIncludeInClass.mapCoordinates = 1;
  const toIncludeInActivity = {classroom: 1, from:1, to: 1};
  if (includeCourse) {toIncludeInActivity.course = 1; toIncludeInActivity.description = 1;}

  Promise.all(
    [
      Classroom.find({}).select(toIncludeInClass),
      Activity.find({date: today}).select(toIncludeInActivity)
    ]).then(
    function (values) {
      const classActivities = {};
      values[1].forEach(function(activity) {
        if (!classActivities[activity.classroom]) {
          classActivities[activity.classroom] = [];
        }
        classActivities[activity.classroom].push(activity);
      });

      res.json(values[0].map(function(classroom) {
        const res = classroom.toObject();
        res.activities = classActivities[classroom._id] ? classActivities[classroom._id] : [];
        return res
      }));
    },
    function (err) {
      res.send(err);
    }
  );
};
