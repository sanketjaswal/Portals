// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/userModel");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     function (email, password, cb) {
//       //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//       return User.findOne({ email, password })
//         .then((user) => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email or password." });
//           }
//           return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch((err) => cb(err));
//     }
//   )
// );

// //
// passport.use(new JwtStrategy({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey   : process.env.JWT_SECRET
// },
// function (jwtPayload, cb) {
//   console.log(jwtPayload);

//   //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//   return User.findById(jwtPayload._id)
//       .then(user => {
//           return cb(null, user);
//       })
//       .catch(err => {
//           return cb(err);
//       });
// }
// ));

// // const passport = require('passport');
// // const authHelper = require("../middlewares/auth_helper");
// // const LocalStrategy = require("passport-local").Strategy;
// // const User = require("../models/userModel");

// // exports.initialize = () => {
// // passport.use(
// //   new LocalStrategy(async (email, password, done) => {
// //     try {
// //       const user = await User.findOne({ email });

// // if (!user) {
// //   console.log("Invalid email");
// //   return done(null, false);
// // }

// //       if (user.password !== password) {
// //         console.log("Invalid password");
// //         return done(null, false);
// //       }
// //       return done(null, user);
// //     } catch (error) {
// //       return done(error, false);
// //     }
// //   })
// // );

// // const authenticate = async (email, password, done) => {
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return done(null, false, { message: "No user found with that email" });
// //     }

// //     const match = await authHelper.comparePassword(password, user.password);
// //     if (match) {
// //       return done(null, user);
// //     }
// //     else{
// //       return done(null, false, { message: "Password Incorrect" });
// //     }
// //   } catch (error) {
// //     return done(error);
// //   }
// // };

// // passport.use(new LocalStrategy({ usernameField: "email" }, authenticate));

// // passport.serializeUser((user, done) => {
// //   done(null, user.id);
// // });

// // passport.deserializeUser(async (_id, done) => {
// //   try {
// //     const user = await User.findById(_id);
// //     done(null, user);
// //   } catch (error) {
// //     done(error, false);
// //   }
// // });
// // };
