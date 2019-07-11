const crypto = require('crypto');

/**
 * @param password the password string
 * @param salt the salt string
 * @param callback callback function (error, hash string)
 */
exports.hashPassword = function(password, salt, callback) {
  crypto.pbkdf2(password, salt, 10000, 256, 'sha256', function(err, hash) {
    if (hash) {
      hash = hash.toString('base64');
    }
    callback(err, hash);
  });
};

exports.unexpectedError = function(err, res) {
  console.log(err);
  res.status(500);
  res.send("An unexpected error occurred");
};
