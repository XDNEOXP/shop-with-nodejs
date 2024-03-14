const md5 = require('md5')
const { validationResult } = require('express-validator')
const Customer = require('../models/Customer')

const get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        flash: [],
        errors: [],
        customer: req.customer,
    })
}

const post = async (req, res) => {
    const existanceUser = await Customer.findOne({
        where: {
            email: req.body.email,
        },
    })

    if (existanceUser) {
        res.render('signup', {
            title: 'Signup',
            flash: [`${req.body.email} already exist`],
            errors: [],
            customer: req.customer,
        })
        return
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('signup', {
            title: 'Signup',
            flash: '',
            errors: errors.array(),
            customer: req.customer,
        })
        return
    }

    await Customer.create({
        id: md5(req.body.email + new Date()),
        name: req.body.name,
        email: req.body.email,
        password: await Customer.encryptPassword(req.body.password),
        created_at: new Date(),
    })
    req.flash('success', 'Successfuly Created!')
    res.redirect('/login')
}

module.exports = {
    get,
    post,
}
