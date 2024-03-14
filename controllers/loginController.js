const passport = require('passport')

const get = (req, res) => {
    const flash = req.flash()
    res.render('login', {
        title: 'Login',
        flash: flash,
        customer: req.customer,
    })
}

const post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
})

module.exports = {
    get,
    post,
}
