const nodemailer = require("nodemailer");
const verify = require("../assets/emailTemplates/verify");

const verifyEmail = (obj) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fp.zurichfox@gmail.com",
      pass: "kpzyiguzhthqabum",
    },
  });

  var mailOptions = {
    from: "fp.zurichfox@gmail.com",
    to: `${obj.email}`,
    subject: `WOK IT OUT - Verify Email`,
    html: verify(obj),
  };

  transporter.sendMail(
    mailOptions
    //   , function (error, info) {
    // if (error) {
    //   console.log(error);
    // }
    // else {
    //     console.log('Email sent: ' + info.response);
    // }}
  );
};

module.exports = verifyEmail;
