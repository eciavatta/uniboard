var mongoose = require('mongoose');
var Classroom = mongoose.model('Classroom');

exports.list_classrooms = function(req, res) {
  //req.query.withCoordinates
  Classroom.find({}, function(err, classrooms) {
    if (err)
      res.send(err);
    console.log(classrooms);
    res.json({dio:"porcino"});
  });
};
