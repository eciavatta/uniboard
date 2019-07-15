const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const unexpectedError = require('../utils').unexpectedError;

exports.list_courses = function(req,res) {
  const searchInfo = {};
  if (req.query.nameContains) {
    searchInfo.name = {$regex : ".*" + req.query.nameContains + ".*", '$options' : 'i'};
  }
  Course.find(searchInfo).then(
    courses => res.json(courses),
    err => unexpectedError(err, res)
  );
};
