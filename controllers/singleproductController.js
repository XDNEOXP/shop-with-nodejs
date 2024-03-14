const Product = require('../models/Product')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Category = require('../models/Category')

const singleproductController = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.query.id,
        },
        include: Category,
    })
    if (!product) {
        res.status(404).render('layout/404', {
            title: '404',
        })
        return
    }
    const cart = await Cart.findOne({
        where: {
            customer_id: req.user ? req.user.id : 0,
        },
        include: CartItem,
    })
    const images = product.img.split(',')
    let added = false
    if (cart) {
        cart.cart_items.map((item) => {
            if (product.id === item.product_id) added = true
        })
    }
    res.render('singleProduct', {
        title: `${product ? product.name : 'Not Found'}`,
        flash: req.flash(),
        customer: req.user,
        product,
        images,
        added,
    })
}

module.exports = singleproductController
