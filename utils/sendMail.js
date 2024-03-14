const nodemailer = require('nodemailer')

const sendMail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    })

    const info = await transporter.sendMail({
        from: '"Neo" <matrixpicker@gmail.com>', // sender address
        to,
        subject,
        html,
    })

    return info.messageId
}

module.exports = sendMail
