const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReportSchema = new Schema({
  classroom: {
    type: mongoose.Types.ObjectId,
    ref: 'Classroom',
    required: "Report classroom is required"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: "Report user is required"
  },
  actualStatusFree: {
    type: Boolean,
    required: "Report actual status is required",
  }
}, { timestamps: { createdAt: 'timestamp' } });

UserReportSchema.index({timestamp: -1});

module.exports = mongoose.model('UserReport', UserReportSchema);
