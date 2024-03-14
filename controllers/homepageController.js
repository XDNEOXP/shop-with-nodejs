const Product = require('../models/Product')
const Category = require('../models/Category')

const homepageController = async (req, res) => {
    const offset = (Number(req.query.page) - 1) * 25 || 0
    const products = await Product.findAll({
        limit: 25,
        offset,
        include: Category,
    })

    const counts = await Product.count()

    res.render('index', {
        title: 'Home Page',
        products: products ? products : [],
        customer: req.user,
        counts,
        page: req.query.page ? Number(req.query.page) : 1,
    })
}

module.exports = homepageController
