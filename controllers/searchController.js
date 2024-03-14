const { Op } = require('sequelize')
const Product = require('../models/Product')
const Category = require('../models/Category')

const searchController = async (req, res) => {
    const products = await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${req.query.search}%`,
            },
        },
        include: Category,
    })
    res.render('search', {
        title: `Serach For ${req.query.search}`,
        customer: req.user,
        products,
    })
}

module.exports = searchController
