const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    abnnumber: {
      type: String,
      required: false,
    },
    business: {
      type: String,
      required: false,
    },
    blocked: {
      type: Boolean,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      required: false,
    }
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
