const JWT = require("jsonwebtoken");
const Vendor = require("../models/vendorModel.js");
const userModel = require("../models/userModel.js");

//admin access
module.exports.isAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Vendor.findById(req.user._id);
    if (user.role !== 'admin') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
        error,
      });
    } else if(user.role === 'admin'){
      next();
      console.log("Authorized Access");
    }else{
      return res.status(401).send({
        success: false,
        message: "Error is admin middleware",
        error,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// authenticate token
module.exports.authenticateToken = async (req, res, next) => {
  // console.log(req.cookies);

  const token = req.cookies.auth;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  JWT.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    try {
      const theUser = await Vendor.findById(decodedToken.id);
      req.user = theUser;
      // console.log(theUser.id);
      console.log("authenticate Token ✔ ".bgBrightGreen);

      // console.log(`result : ${t heUser}`);

      next();
    } catch (error) {
      console.error(error);
    }
  });
};
