const ejs = require('ejs')
const path = require('path')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const sendMail = require('../utils/sendMail')

const get = async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            customer_id: req.user.id,
        },
        include: CartItem,
    })
    res.render('checkout', {
        title: 'Checkout',
        customer: req.user,
        cartItems: cart ? cart.cart_items : [],
    })
}

const post = async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            customer_id: req.user.id,
        },
        include: CartItem,
    })

    const html = await ejs.renderFile(
        path.join(__dirname, './../views/mail/bill.ejs'),
        {
            title: '',
            cartItems: cart.cart_items,
        }
    )

    await sendMail({
        to: req.user.email,
        subject: `Aroma Bill`,
        html,
    })

    await CartItem.destroy({
        where: {
            cart_id: cart.id,
        },
    })
    res.redirect('/cart')
}

module.exports = {
    get,
    post,
}
