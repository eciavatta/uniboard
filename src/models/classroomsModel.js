const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: "Classroom name is required"
  },
  mapCoordinates: {
    type: [Number],
    validate: {
      validator: function(v) {
        return v.length % 2 === 0;
      },
      message: "Room map coordinates should be an even quantity"
    },
    required: "Classroom coordinates are required"
  },
  floor: {
    type: Number,
    required: "Room floor is required",
    validate: {
      validator: function(v) {
        return v !== 1 || v !== 2;
      },
      message: "Room floor can only be 1 or 2"
    }
  },
  roomType: {
    type: String,
    required: "Room type is required",
    validate: {
      validator: function(v) {
        return v === "Classroom" || v === "Laboratory";
      },
      message: "Room type can only be Classroom or Laboratory"
    }
  },
  beaconUuid: {
    type: String
  },
  code: {
    type: Number
  }
});

ClassroomSchema.index({name: 1});

module.exports = mongoose.model('Classroom', ClassroomSchema);
