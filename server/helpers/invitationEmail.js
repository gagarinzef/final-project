const nodemailer = require("nodemailer");
const invitation = require("../assets/emailTemplates/invitation");

const invitationEmail = (obj) => {
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
    subject: `TODO - Invitation Project`,
    html: invitation(obj),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log("Email sent: " + info.response);
    }
  });
};

module.exports = invitationEmail;

// "http://localhost:3000/userprojects?UserId=${obj.UserId}&ProjectId=${obj.ProjectId}"
