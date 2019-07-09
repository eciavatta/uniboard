const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');
const crypto = require('crypto');
const hashPassword = require('../utils').hashPassword;

exports.add_user = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //TODO validate pass
  new User({'username': username}).save(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      const salt = crypto.randomBytes(16).toString('base64');
      hashPassword(password,salt,function (err, hash) {
        if (err) {
          res.send(err);
        } else {
          new UserPassword({'salt': salt, 'hash': hash, '_id':user._id}).save(function (err, inserted) {
            if (err) {
              res.send(err);
            } else {
              res.send("Done");
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
