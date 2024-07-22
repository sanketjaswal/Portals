const User = require("../models/userModel.js");
const Vender = require("../models/vendorModel.js");
const Event = require("../models/eventsModel.js");
const Booth = require("../models/boothModel.js");
const InfoDesk = require("../models/infoDeskModel.js");
const upload = require("../middlewares/multer.js");
const cloudinary = require("../config/cloudinary.js");
const authHelper = require("../middlewares/auth_helper.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

//send otp email
// module.exports.sendOtp = async (req, res) => {
//   console.log(req.body);
//   const { firstname, lastname, email, password, confirmPassword, otp } =
//     req.body;
// };

// register Vendor
module.exports.createVendor = async (req, res) => {
  // console.log(req.body);
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    otp,
    phone,
    abnnumber,
    business,
    address,
  } = req.body;

  console.log(req.body);

  try {
    //validations
    if (!firstname) {
      return res.send({ message: "firstname is Required" });
    }
    if (!lastname) {
      return res.send({ message: "lastname is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!confirmPassword) {
      return res.send({ message: "confirmPassword is Required" });
    }

    if (password !== confirmPassword) {
      res.status(500).send({
        success: false,
        message: "Passwords don't match",
        error,
      });
    }
    //Check User
    const existingUser = await Vender.findOne({ email });

    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please login",
      });
    }

    //hash the password
    const hashedPassword = await authHelper.hashPassword(password);

    if (phone) {
      console.log("Email Not verified, But Registered ✔ ".brightGreen);
      //save
      const user = new Vender({
        firstname,
        lastname,
        email,
        password,
        phone,
        abnnumber,
        business,
        address,
      }).save();

      return res.redirect("/allVendors");
    }

    if (!otp) {
      // otp email sent
      const generatedOTP = await authHelper.sendMail(email);
      console.log("generatedOTP : " + generatedOTP);

      //hash the otp and make cookie
      const hashedOTP = await authHelper.hashPassword(generatedOTP);
      console.log("hashedOTP : " + hashedOTP);

      res.cookie("otp", hashedOTP);

      const theUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      };

      req.user = theUser;
      return res.render("otpVerification.ejs", {
        title: "OTP Verification",
        user: req.user,
      });
    } else {
      if (!otp) {
        return res.send({ message: "otp is Required" });
      }

      const cookiOTP = req.cookies.otp;
      const matchOTP = await authHelper.comparePassword(otp, cookiOTP);

      if (matchOTP) {
        console.log("Email verified ✔ ".brightGreen);
        //save
        const user = new Vender({
          firstname,
          lastname,
          email,
          password,
          phone,
          abnnumber,
          business,
          address,
        }).save();

        return res.redirect("/vendor");
      } else {
        console.log("wrong Otp");
      }
    }

    // window.location.assign("/");

    // const result = await authHelper.sendMail(email);
    // console.log(result);

    // res.send({
    //   success: true,
    //   message: "Vendor Registered Successfully",
    //   user,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resgistration",
      error,
    });
  }
};

// update Vendor
module.exports.updateUser = async (req, res) => {
  try {
    const {
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      abnnumber,
      business,
    } = req.body;
    const foundUser = await Vender.findByIdAndUpdate(id, {
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      abnnumber,
      business,
    });
    setTimeout(() => {
      return res.redirect("/profile");
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

// logIN Vendor
module.exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    //valicdation4
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }

    //check user
    const user = await Vender.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    //check password
    const match = await authHelper.comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.cookie("auth", token);
    return res.redirect("/dashboard");

    // res.send("ok");

    // res.json({
    //   title: "Dashboard",
    //   success: true,
    //   message: "Login successfully",
    //   user: {
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //     email: user.email,
    //   },
    //   token: token,
    // });

    // next();

    // res.redirect("/dashboard");
    // return res.render("dashboard.ejs", {
    //   title: "Dashboard",
    //   success: true,
    //   message: "Login successfully",
    //   user: {
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //     email: user.email,
    //   },
    //   token: "Bearer " + token,
    // });
    // res.json();
    // next();
  } catch (error) {
    console.log(error.bgBright);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// logOut
module.exports.logout = async (req, res) => {
  // console.log(req.cookies);
  try {
    await res.clearCookie("auth");
    console.log(`cookie clear ✔ `.brightCyan);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

// test
module.exports.testCont = async (req, res) => {
  console.log("protected route");
};

// register Guest
module.exports.createGuest = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email } = req.body;
  try {
    console.log("createGuest");
    //validations
    if (!firstname) {
      return res.send({ message: "firstname is Required" });
    }
    if (!lastname) {
      return res.send({ message: "lastname is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }

    const existingUser = await User.findOne({ email });

    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please login",
      });
    }

    //save
    const user = new User({
      firstname,
      lastname,
      email,
    }).save();

    // res.send({
    //   success: true,
    //   message: "User Registered Successfully",
    //   user,
    // });
  } catch (error) {
    console.error(error);
  }
};

// login Guest
module.exports.loginGuest = async (req, res) => {
  console.log(req.body);
  console.log("LoginGuest");

  try {
    const { email } = req.body;

    // /valicdation
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "invalid email",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    res.status(201).send({
      success: true,
      message: "USer Login Successfull",
    });
  } catch (error) {
    console.error(error);
  }
};

// add New event
module.exports.ShowAddEvent = async (req, res) => {
  const { eventname, agenda, date, time, organizer } = req.body;

  try {
    console.log(eventname, agenda, date, time, organizer);
    const user = new Event({
      eventname,
      agenda,
      date,
      time,
      organizer,
    }).save();

    return res.redirect("/events");

    return console.log(user);
  } catch (error) {
    console.log(error);
  }
};

// upload Image
module.exports.uploadImage = async (req, res) => {
  upload.single("image"),
    function (req, res) {
      cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error 69",
          });
        }

        res.status(200).json({
          success: true,
          message: "Image Uploaded",
          data: result,
        });
      });
    };
};

// Update InfoDesk
module.exports.updateInfoDesk = async (req, res) => {
  const id = "669e35128306619c698309d7";
  const { info } = req.body;

  try {
    await InfoDesk.findByIdAndUpdate(id, { info: info });
    setTimeout(() => {
      return res.redirect("/dashboard");
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

// add new booth
module.exports.addBooth = async (req, res) => {
  const { boothName, description, dimensions, color, hoarding, pricing } =
    req.body;
  try {
    for (let i = 88; i <= 100; i++) {
      const boothData = new Booth({
        boothName: `Booth ${i}`,
        description: `description ${i}`,
        dimensions,
        color,
        hoarding,
        pricing,
      });
      await boothData.save();
    }
    return res.redirect("/booths");
  } catch (error) {
    console.log(error);
  }
};

// update Profile Photo
module.exports.updateProfilePhoto = async (req, res) => {
  // upload.single("profileImage");
  try {
    let filedr = req.body;
    console.log(`${filedr}`.bgBlue);
    // upload image to cloudinary
    // let gg =  `C:\Users\Admin\Downloads\ ${req.body.finput}`;
    const data = await cloudinary.uploadToCloudinary(
      `C:/Users/Admin/Downloads/${req.body.finput}`,
      "user-images"
    );
    // save Image url and public ID in the database
    console.log("The comming Data => ".brightCyan + data);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
