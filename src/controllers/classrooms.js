const mongoose = require('mongoose');
const Classroom = mongoose.model('Classroom');
const Activity = mongoose.model('Activity');

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

      res.json(queryResults[0].map(function(classroom) {
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
