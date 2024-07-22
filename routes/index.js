const upload = require("../middlewares/multer.js");
const express = require("express");
const router = express.Router();
const renderControllers = require("../controllers/renderControllers");
const userControllers = require("../controllers/userControllers");
const apiControllers = require("../controllers/apiControllers");
const authMiddleware = require("../middlewares/authmiddlware");

// new start
console.log(
  "\n-X-----------X-------- ----X------------X------------X------------X-----------X-"
    .brightRed
);

// *********************** Login / Register  *********************** \\

// open Admin
router.get("/admin", renderControllers.showAdmin);

// login Admin
router.post(
  "/loginAdmin",
  authMiddleware.authenticateToken,
  authMiddleware.isAdmin,
  userControllers.loginVendor
);

// Start the application
router.get("/", renderControllers.showStart);

// open guest
router.get("/guest", renderControllers.showGuest);

// register guest
router.post("/createGuest", userControllers.createGuest);

//login Guest
router.post("/loginGuest", userControllers.loginGuest);

// open vendor
router.get("/vendor", renderControllers.showVendor);

// send OTP Email
router.get("/verifyOtp", renderControllers.showOTPVerify);

// register Vender
router.post("/vendor", userControllers.createVendor);

//login vender
router.post("/loginVendor", userControllers.loginVendor);

// forgotPassword
router.get("/forgotPassword", renderControllers.showForgotPassword);

// *********************** DashBoard *********************** \\

// dashboard
router.get(
  "/dashboard",
  authMiddleware.authenticateToken,
  renderControllers.showDashboard
);

// Update infoDEsk
router.post(
  "/updateInfodesk",
  // authMiddleware.authenticateToken,
  // authMiddleware.isAdmin,
  userControllers.updateInfoDesk
);

// profile
router.get(
  "/profile",
  authMiddleware.authenticateToken,
  renderControllers.showProfile
);

// All Vendors
router.get(
  "/allVendors",
  authMiddleware.authenticateToken,
  renderControllers.showAllVendors
);

// Add New Vendor by Super Admin
router.get(
  "/AddVendor",
  authMiddleware.authenticateToken,
  renderControllers.ShowAddVendor
);

// All Users
router.get(
  "/allUsers",
  authMiddleware.authenticateToken,
  renderControllers.showAllUsers
);

// Events
router.get(
  "/events",
  authMiddleware.authenticateToken,
  renderControllers.showEvents
);

// Add Event
router.post(
  "/addEvent",
  authMiddleware.authenticateToken,
  userControllers.ShowAddEvent
);

// Add Booth
router.post("/addBooth", userControllers.addBooth);

// Booths
router.get(
  "/booths",
  authMiddleware.authenticateToken,
  renderControllers.showBooths
);

//logout
router.get("/logout", userControllers.logout);

//update
router.post("/update", userControllers.updateUser);

//upload image
router.post("/uploadImage", userControllers.uploadImage);

// *********************** APIS *********************** \\

// Fetch InfoDEsk
router.get("/infoDeskAPI", apiControllers.infoDeskAPI);

// Fetch Vendors
router.get("/vendorsAPI", apiControllers.vendorsAPI);

// Fetch booths
router.get("/boothsAPI", apiControllers.boothsAPI);

// Fetch events
router.get("/eventsAPI", apiControllers.eventsAPI);

// *********************** IMAGE UPLAODS *********************** \\

// Upload Image
router.post(
  "/addImage",
  authMiddleware.authenticateToken,
  upload.single("finput"),
  userControllers.updateProfilePhoto
);

// router.post("/addImage",authMiddleware.authenticateToken,  upload.single("finput"), async(req, res) => {
//   console.log(upload);
//   console.log(req.url) ;
//   console.log(req.headers) ;
//   console.log(req.body.finput) ;
//   console.log(req.file) ;
// });

// console.log(`Image uploaded to: ${imagePath}`);

// router.get("/test", authMiddleware.requireSignIn, userControllers.testCont);

module.exports = router;
