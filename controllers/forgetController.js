const { validationResult } = require('express-validator')
const ejs = require('ejs')
const path = require('path')
const Customer = require('../models/Customer')
const sendMail = require('../utils/sendMail')
const md5 = require('md5')

const get = (req, res) => {
    const flash = req.flash()
    res.render('forget', {
        title: 'Forget Password',
        flash: flash,
        errors: [],
        customer: req.user,
    })
}

const post = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('forget', {
            title: 'Forget Password',
            flash: req.flash(),
            errors: errors.array(),
            customer: req.user,
        })
        return
    }

    const existanceUser = await Customer.findOne({
        where: {
            email: req.body.email,
        },
    })

    if (!existanceUser) {
        res.render('forget', {
            title: 'Forget Password',
            flash: [`${req.body.email} does not exist`],
            errors: [],
            customer: req.user,
        })
        return
    }

    const token = md5(req.body.email + new Date())
    await Customer.update(
        {
            token,
            token_used: 0,
        },
        {
            where: {
                email: req.body.email,
            },
        }
    )

    const html = await ejs.renderFile(
        path.join(__dirname, './../views/mail/forget.ejs'),
        {
            link: `http://${process.env.HOST}:${process.env.PORT}/reset?token=${token}`,
        }
    )

    await sendMail({
        to: req.body.email,
        subject: `Reset Password`,
        html,
    })

    res.render('forget', {
        title: 'Forget Password',
        flash: { success: 'the reset link has been sent to your email' },
        errors: [],
        customer: req.user,
    })
}

module.exports = {
    get,
    post,
}
