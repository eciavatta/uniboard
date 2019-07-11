const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');
const crypto = require('crypto');
const utils = require('../utils');

const hashPassword = utils.hashPassword;
const unexpectedError = utils.unexpectedError;

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
  if (!req.user) {
    res.status(403);
    res.send("You are not logged in");
  } else {
    res.json(req.user);
  }
};

exports.get_courses_self = function(req,res) {

};
exports.add_course_self = function(req,res) {

};
exports.remove_course_self = function(req,res) {

};
exports.get_courses_schedule_self = function(req,res) {

};
