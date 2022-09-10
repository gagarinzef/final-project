const nodemailer = require('nodemailer');
const welcome = require("../assets/emailTemplates/welcome");

const sendEmail = (obj) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fp.zurichfox@gmail.com',
            pass: 'kpzyiguzhthqabum'
        }
    });

    var mailOptions = {
        from: 'fp.zurichfox@gmail.com',
        to: `${obj.email}`,
        subject: `WOK IT OUT - Welcome Email`,
        html: welcome(obj)
    };

    // transporter.sendMail(mailOptions, function (error, info) {
        // if (error) {
        //     return console.log(error);
        // } else {
        //     return console.log('Email sent: ' + info.response);
        // }
    // });
}

module.exports = sendEmail

