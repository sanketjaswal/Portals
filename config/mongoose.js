// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/virtual_exhibition");

// const db = mongoose.connection;

// db.on("error", console.error.bind("Error connecting to mongodb"));
// db.once("open", function () {
//   console.log(`Connected to Database :: MongoDB ✔ `.bgGreen);
// });

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
db.once("open", function () {
  console.log("Connected to Database :: MongoDB ✔".bgGreen);
});

// Additional check for the connection state
db.on("connecting", function () {
  console.log("Connecting to MongoDB...");
});
db.on("connected", function () {
  console.log("Mongoose default connection is open to MongoDB");
});
db.on("disconnected", function () {
  console.log("Mongoose default connection is disconnected");
});
db.on("reconnected", function () {
  console.log("Mongoose default connection is reconnected");
});
