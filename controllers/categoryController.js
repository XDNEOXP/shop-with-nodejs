const Product = require('../models/Product')
const Category = require('../models/Category')

const categoryController = async (req, res) => {
    const products = await Product.findAll({
        where: {
            category_id: req.query.id ? req.query.id : '',
        },
        include: Category,
    })
    res.render('category', {
        title: 'Shop Category',
        customer: req.user,
        products,
    })
}

module.exports = categoryController
