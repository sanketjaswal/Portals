const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

// Hash Password
module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

// Compare Password
module.exports.comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};

// Send verification email
module.exports.sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    text: `The OTP is ${otp}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ✔".brightRed);
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
