const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
      trim: true,
    },
    agenda: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
