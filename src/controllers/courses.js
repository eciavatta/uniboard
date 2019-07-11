const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const unexpectedError = require('../utils').unexpectedError;

exports.list_courses = function(req,res) {
  Course.find({}, function (err, courses) {
    if (err) {
      unexpectedError(err, res);
    } else {
      res.json(courses);
    }
  });
};
