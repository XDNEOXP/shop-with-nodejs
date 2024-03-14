const logoutController = (req, res, next) => {
    req.logOut((error) => {
        if (error) {
            next(error)
        }
    })
    res.redirect('/')
}

module.exports = logoutController
