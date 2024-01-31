//configure env
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('./config/cloudinary')

const color = require("colors");

const app = express();
const port = 8000;

const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");
const user = require("./models/userModel");
// const MongoStore = require('connect-mongo');
const middleware = require("./middlewares/authmiddlware");
// app.use(middleware);

app.use(express.json());
app.use(express.urlencoded({ session: false }));

//Bootstrap access
app.use(express.static("./public"));
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());

app.use(express.static("./assets"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//extract style and script from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use express router
app.use("/", require("./routes"));

// app.use('/auth', require('./routes/auth'));

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} ✔ `.bgBrightMagenta);
});
