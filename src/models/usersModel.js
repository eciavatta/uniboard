const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: "Username is required",
    lowercase: true,
    unique: true
  }
});

module.exports = mongoose.model('User', UserSchema);
