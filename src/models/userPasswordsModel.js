const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPasswordSchema = new Schema({
  hash: {
    type: String,
    required: "Password hash is required"
  },
  salt: {
    type: String,
    required: "Password salt is required"
  }
});

module.exports = mongoose.model('UserPassword', UserPasswordSchema);
