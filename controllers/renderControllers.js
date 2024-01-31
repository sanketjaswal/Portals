// const express = require("express");
const User = require("../models/userModel.js");
const Vender = require("../models/vendorModel.js");
const Events = require("../models/eventsModel.js");
const Booth =  require("../models/boothModel.js")
const InfoDesk = require("../models/infoDeskModel.js")

// Start
module.exports.showStart = (req, res) => {
  console.log("App Started".bgBrightYellow.bold);
  return res.render("start.ejs", {
    title: "Welcome",
  });
};

//show admin login
module.exports.showAdmin = (req, res) => {
  console.log("Admin opened".bgBrightMagenta.bold);
  return res.render("adminLogin.ejs", {
    title: "Admin | Sign in",
  });
};

// open Guest
module.exports.showGuest = (req, res) => {
  console.log("Guest opened".brightMagenta.bold);
  return res.render("guest.ejs", {
    title: "Register | Sign up",
  });
};

// Open vender
module.exports.showVendor = (req, res) => {
  console.log(" Vender opened".brightMagenta.bold);
  return res.render("vendor.ejs", {
    title: "Login | Sign in",
  });
};

//open oTP verification
module.exports.showOTPVerify = (req, res) => {
  console.log("oTP verification ✔ ".brightRed.bold);
  return res.render("otpVerification.ejs", {
    title: "OTP Verification",
    user: req.user,
  });
};

// Forgot Password
module.exports.showForgotPassword = (req, res) => {
  console.log("Forgot Password opened".brightYellow.bold);
  return res.render("forgotPassword.ejs", {
    title: "Reset Password",
  });
};

// Inside Dashboard routes

// Open Dashboard
module.exports.showDashboard = async(req, res) => {
  console.log("Dashboard opened ✔ ".brightBlue.bold);
  // console.log(req.user);
  
  try {
    const info = await InfoDesk.find();
    // console.log(info[0].info)
    return res.render("dashboard.ejs", {
      title: "User Dashboard",
      user: req.user,
       info: info[0].info
    });
  }  catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open Profile
module.exports.showProfile = (req, res) => {
  console.log("Your Profile Opened ✔ ".brightBlue.bold);
  return res.render("profile.ejs", {
    title: "Your Profile",
    user: req.user,
  });
};

// Open all vendors
module.exports.showAllVendors = async (req, res) => {
  console.log("All Vendors ✔ ".brightBlue.bold);
  try {
    const allData = await Vender.find();
    return res.render("vendors.ejs", {
      title: "All Vendors",
      user: req.user,
      vendors: allData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Open ADD vendors
module.exports.ShowAddVendor = async (req, res) => {
  console.log("Add New Vendor by Admin Opened ✔ ".brightBlue.bold);
  try {
    // const allData = await Vender.find();
    return res.render("addVendor.ejs", {
      title: "Add New Vendor",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open all Users
module.exports.showAllUsers = async (req, res) => {
  console.log("All Users ✔ ".brightBlue.bold);
  try {
    const allData = await User.find();
    // res.json(allData);
    return res.render("users.ejs", {
      title: "All Users",
      user: req.user,
      users: allData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Open Profile
module.exports.showBooths = async(req, res) => {
  console.log("All Booths Opened ✔ ".brightBlue.bold);
  try {
    const allData = await Booth.find();
    // res.json(allData);
    return res.render("booths.ejs", {
      title: "Shop Booths",
      user: req.user,
      booths: allData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open Events
module.exports.showEvents = async (req, res) => {
  console.log("All Events ✔ ".brightBlue.bold);
  try {
    const allData = await Events.find();
    return res.render("events.ejs", {
      title: "All Events",
      user: req.user,
      events: allData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports.showDashboard = async (req, res) => {
//   console.log(req.cookies.auth);
//   const token = req.cookies.auth;

//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   JWT.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });

//     try {
//       const theUser = await User.findById(decodedToken.id);

//       console.log(`result : ${theUser}`);

//       console.log("Dashboard opened ✔ ".brightBlue);
//       return res.render("dashboard.ejs", {
//         title: "User Dashboard",
//         user: theUser,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });
// };
// <%- vendors[0].firstname; %>
