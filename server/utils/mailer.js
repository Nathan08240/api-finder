const mailer = require('nodemailer');
const sendEmail = async (options) => {
    try {
        const transporter = mailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PWD
            }
        });

        const mailOptions = {
            from: 'Nathan Branco',
            to: options.email,
            subject: options.subject,
            html: options.message,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail
}