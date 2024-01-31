const mongoose = require("mongoose");

const infoDeskModel = new mongoose.Schema({
  info: {
    type: String,
  },
});

const InfoDesk = mongoose.model("InfoDesk", infoDeskModel);

module.exports = InfoDesk;
