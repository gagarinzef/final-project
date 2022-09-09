const nodemailer = require('nodemailer');

const verifyEmail = (obj) => {
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
        subject: `TODO Welcome Email`,
        html: `<p>Please verify your email, <a href="http://localhost:3000/verified/${obj.token}">Click here!<a/><p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            return console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = verifyEmail;