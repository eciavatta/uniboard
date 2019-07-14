const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');
const Course = mongoose.model('Course');
const Activity = mongoose.model('Activity');
const crypto = require('crypto');
const utils = require('../utils');

const hashPassword = utils.hashPassword;
const unexpectedError = utils.unexpectedError;
const ensureAuthenticated = utils.ensureAuthenticated;

exports.add_user = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //TODO validate pass
  new User({'username': username}).save(function (err, user) {
    if (err) {
      if (err.code === 11000) {
        res.status(409);
        res.send("Username is already taken");
      } else {
        unexpectedError(err, res)
      }
    } else {
      const salt = crypto.randomBytes(16).toString('base64');
      hashPassword(password,salt,function (err, hash) {
        if (err) {
          unexpectedError(err, res)
        } else {
          new UserPassword({'salt': salt, 'hash': hash, '_id':user._id}).save(function (err) {
            if (err) {
              unexpectedError(err, res)
            } else {
              res.json(user);
            }
          })
        }
      })
    }
  })
};

exports.get_self = function(req,res) {
  if (ensureAuthenticated(req,res)) {
    res.json(req.user);
  }
};

exports.get_self_score = function(req,res) {
  if (ensureAuthenticated(req,res)) {
    User.aggregate([
      {$match: {'reportScore': {$gt: req.user.reportScore}}},
      {$group: {
        _id: null,
        count: { $sum: 1 },
        min: { $min: "$reportScore"}
      }},
      { $project: { _id: 0 } }
    ]).then(
      queryResult => {
        let aggregateData = queryResult[0];
        if (!aggregateData) {
          aggregateData = {};
        }
        res.json({
          score: req.user.reportScore,
          position: (aggregateData.count ? aggregateData.count : 0) + 1,
          toNext: aggregateData.min ? aggregateData.min - req.user.reportScore : 0
        });
      }, err => {
        unexpectedError(err, res);
      }
    )
  }
};

exports.get_courses_self = function(req,res) {
  if (ensureAuthenticated(req,res)) {
    User.findById(req.user._id).populate({'path': 'courses'}).select('courses -_id').exec(function (err, userCourses) {
      if (err) {
        unexpectedError(err,res);
      } else {
        res.json(userCourses);
      }
    });
  }
};

exports.add_course_self = async function(req,res) {
  if (ensureAuthenticated(req,res)) {
    if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      res.status(400);
      res.send("Invalid course id");
    } else {
      Course.findById(req.params.courseId, function (err, course) {
        if (err) {
          unexpectedError(err, res);
        } else if (!course) {
          res.status(404);
          res.send("Course not found");
        } else {
          User.updateOne({'_id': req.user._id}, {$addToSet: { 'courses': course._id }}, function(err, updateData) {
            if (err) {
              unexpectedError(err, res);
            } else if (updateData.nModified === 0) {
              res.status(409);
              res.send("Users already has provided course");
            } else {
              res.status(204);
              res.send();
            }
          });
        }
      });
    }
  }
};
exports.remove_course_self = function(req,res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    res.status(400);
    res.send("Invalid course id");
  }
  if (ensureAuthenticated(req,res)) {
    User.updateOne({'_id': req.user._id}, {$pull: { 'courses': req.params.courseId }}, function(err, updateData) {
      if (err) {
        unexpectedError(err, res);
      } else if (updateData.nModified === 0) {
        res.status(404);
        res.send("Users does not have provided course");
      } else {
        res.status(204);
        res.send();
      }
    });
  }
};

exports.get_courses_schedule_self = function(req,res) {
  if (ensureAuthenticated(req, res)) {
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

    if (req.user.courses.length === 0) {
      res.status(204);
      res.send();
    } else {
      Activity.find({'course': {$in: req.user.courses}, 'date': {$gte: fromDate, $lt: toDate}}).populate('course', 'name').then(
        activities => res.json(activities),
        err => unexpectedError(err, res));
    }
  }
};
