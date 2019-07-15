const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: "Username is required",
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    unique: true
  },
  reportScore: {
    type: Number,
    default: 0,
    required: "User report score is required",
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: "User report score should be an integer value"
    }
  },
  courses: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }],
    default: [],
    required: "User courses are required"
  }
});

module.exports = mongoose.model('User', UserSchema);
