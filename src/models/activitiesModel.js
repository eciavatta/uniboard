const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function isValidTime(v) {
  return v.isInteger && v >= 0 && v <= 48;
}
const ActivitySchema = new Schema({
  classroom: {
    type: mongoose.Types.ObjectId,
    ref: 'Classroom',
    required: "Activity course is required"
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: [
      function() {
        return !(this.description)
      },
      "An activity requires an associated course or a description"
    ]
  },
  description: {
    type: String,
    required: [
      function() {
        return !(this.course)
      },
      "An activity requires an associated course or a description"
    ]
  },
  date: {
    type: Date,
    required: "Activity date is required",
  },
  //from and to represent the time in half-hours passed since midnight
  from: {
    type: Number,
    required: "Activity starting time is required",
    validate: {
      validator: function(v) {
        return isValidTime(v);
      },
      message: "Activity starting time should be a value in range 0-47"
    }
  },
  to: {
    type: Number,
    required: "Activity ending time is required",
    validate: {
      validator: function(v) {
        return isValidTime(v) && this.to > this.from;
      },
      message: "Activity ending time should be a value in range 1-48 and greater than its starting time"
    }
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
