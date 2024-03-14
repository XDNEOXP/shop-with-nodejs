const md5 = require('md5')
const { validationResult } = require('express-validator')

const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')

const get = async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            customer_id: req.user.id,
        },
        include: CartItem,
    })
    res.render('cart', {
        title: 'Cart',
        flash: req.flash(),
        customer: req.user,
        cartItems: cart ? cart.cart_items : [],
    })
}

const post = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('error', 'try again')
        res.redirect(`/product?id=${req.query.id}`)
        return
    }
    const cart = await Cart.findOne({
        where: {
            customer_id: req.user.id,
        },
    })
    const product = await Product.findByPk(req.query.id)
    if (!product) {
        res.redirect(`/product?id=${req.query.id}`)
        return
    }
    if (cart) {
        await CartItem.create({
            cart_id: cart.id,
            product_id: req.query.id,
            name: product.name,
            price: product.price,
            quantity: req.body.qty,
        })
    } else {
        const cartId = md5(req.user.id + new Date())
        await Cart.create({
            id: cartId,
            customer_id: req.user.id,
        })

        await CartItem.create({
            cart_id: cartId,
            product_id: req.query.id,
            name: product.name,
            price: product.price,
            quantity: req.body.qty,
        })
    }

    res.redirect(`/product?id=${req.query.id}`)
}

const put = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('error', 'try again')
        res.redirect('/cart')
        return
    }
    await CartItem.update(
        {
            quantity: req.body.increase
                ? Number(req.body.qty) + 1
                : Number(req.body.qty) - 1,
        },
        {
            where: {
                product_id: req.query.product_id,
            },
        }
    )
    res.redirect('/cart')
}

const deleteCartItem = async (req, res) => {
    await CartItem.destroy({
        where: {
            product_id: req.query.id,
        },
    })
    res.redirect('/cart')
}

module.exports = {
    get,
    post,
    put,
    deleteCartItem,
}
