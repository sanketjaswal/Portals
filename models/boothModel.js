const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema(
  {
    boothName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    dimensions: {
      type: String,
      required: true,
      trim: true,
    },
    color:{
      type: String,
      required: false,
    },
    hoarding: {
      type: String,
      required: true,
    },
    pricing: {
      type: String,
      required: false,
    },
    boothPlaceMent: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Booth = mongoose.model("Booth", boothSchema);
module.exports = Booth;
