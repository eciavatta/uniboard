const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: "Username is required",
    lowercase: true,
    unique: true
  },
  reportScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);
