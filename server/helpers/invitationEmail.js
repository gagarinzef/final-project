const nodemailer = require('nodemailer');

const invitationEmail = (obj) => {
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
        subject: `TODO - Invitation Project`,
        html: `<h3>Hello, ${obj.username}!</h3  >
        <p>You have invitation from ${obj.name} to join project ${obj.projectName}, <a href="http://localhost:3000/invitation?UserId=${obj.UserId}&ProjectId=${obj.ProjectId}">click here<a/> to approve!<p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            return console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = invitationEmail;

// "http://localhost:3000/userprojects?UserId=${obj.UserId}&ProjectId=${obj.ProjectId}"