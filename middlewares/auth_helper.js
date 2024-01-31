const bcrypt  = require("bcrypt");
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");

// Encrypt password
module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//Compare Password
module.exports.comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};

// send verification mail 
module.exports.sendMail= async (email) =>{
  //email transporter
 
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'camden.lehner@ethereal.email',
//         pass: '35cFFarxTP1jHw8w5A'
//     }
// });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sanket@incredimate.com',
      pass: 'fegkcerixzwzpbzd'
    }
  })

  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

// consfigure email content
  const mailOptions = {
    from : 'sanket@incredimate.com',
    to: `${email}`,
    subject: `Sanket - test email`,
    text: `the OTP is ${otp}`,
  }

  // console.log(mailOptions)
  //nikhil@incredimate.com

  // send email
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully ✔ '.brightRed);
    // console.log("mail : " + result);
    return otp;
  } catch (error) {
    console.error("error : ", error)  
  }
}

 