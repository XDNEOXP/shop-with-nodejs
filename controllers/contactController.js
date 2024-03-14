const contactController = (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        customer: req.user,
    })
}

module.exports = contactController
