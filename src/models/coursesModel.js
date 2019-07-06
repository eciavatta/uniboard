const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  name: {
    type: String,
    required: "Course name is required"
  },
  teachers: {
    type: [String],
    required: "A course should have at least a teacher",
    validate: {
      validator: function(v) {
        return v.length > 0
      },
      message: "A course should have at least a teacher"
    }
  },
  tutors: {
    type: [String]
  },
  degree: {
    type: String,
    required: "A course should belong to a degree"
  },
  year: {
    type: Number,
    required: "A course should have a year"
  }
});

CoursesSchema.index({name: 1});

module.exports = mongoose.model('Course', CoursesSchema);
