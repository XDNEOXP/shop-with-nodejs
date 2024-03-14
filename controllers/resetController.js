const { validationResult } = require('express-validator')
const Customer = require('../models/Customer')

const get = async (req, res) => {
    const existanceUser = await Customer.findOne({
        where: {
            token: req.query.token,
            token_used: 0,
        },
    })

    if (!existanceUser) {
        res.render('reset', {
            title: 'Reset Password',
            flash: [`Link is expired`],
            errors: [],
            customer: req.user,
            token: req.query.token,
        })
        return
    }

    res.render('reset', {
        title: 'Reset Password',
        flash: [],
        errors: [],
        customer: req.user,
        token: req.query.token,
    })
}

const post = async (req, res) => {
    const existanceUser = await Customer.findOne({
        where: {
            token: req.query.token,
            token_used: 0,
        },
    })

    if (!existanceUser) {
        res.render('reset', {
            title: 'Reset Password',
            flash: [`Link is expired`],
            errors: [],
            customer: req.user,
            token: req.query.token,
        })
        return
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('reset', {
            title: 'Reset Password',
            flash: req.flash(),
            errors: errors.array(),
            customer: req.user,
            token: req.query.token,
        })
        return
    }

    await Customer.update(
        {
            password: await Customer.encryptPassword(req.body.password),
            token_used: 1,
        },
        {
            where: {
                token: req.query.token,
            },
        }
    )

    res.redirect('/login')
}

module.exports = {
    get,
    post,
}
