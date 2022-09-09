const nodemailer = require('nodemailer');

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
        subject: `TODO Welcome Email`,
        html: `<h1>WELCOME</h1>
        <p>Hello, ${obj.username}! Welcome to our app!</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            return console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail

