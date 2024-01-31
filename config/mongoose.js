const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/virtual_exhibition");

const db = mongoose.connection;

db.on("error", console.error.bind("Error connecting to mongodb"));
db.once("open", function () {
  console.log(`Connected to Database :: MongoDB ✔ `.bgGreen);
});
