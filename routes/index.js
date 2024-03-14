const express = require('express')
const { body } = require('express-validator')

const homepageController = require('../controllers/homepageController')
const signupController = require('../controllers/signupController')
const loginController = require('../controllers/loginController')
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/auth')
const logoutController = require('../controllers/logoutController')
const forgetController = require('../controllers/forgetController')
const resetController = require('../controllers/resetController')
const singleproductController = require('../controllers/singleproductController')
const cartController = require('../controllers/cartController')
const checkoutController = require('../controllers/checkoutController')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

// GET
router.get('/', homepageController)
router.get('/signup', checkNotAuthenticated, signupController.get)
router.get('/login', checkNotAuthenticated, loginController.get)
router.get('/forget', checkNotAuthenticated, forgetController.get)
router.get('/reset', checkNotAuthenticated, resetController.get)
router.get('/product', singleproductController)
router.get('/cart', checkAuthenticated, cartController.get)
router.get('/checkout', checkAuthenticated, checkoutController.get)
router.get('/category', categoryController)

// POST
router.post(
    '/signup',
    checkNotAuthenticated,
    body('name').notEmpty().withMessage('Please Enter Your Name'),
    body('email').isEmail().normalizeEmail().withMessage('Not A Valid E-mail'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password Must Be At Least 8 Characters'),
    signupController.post
)
router.post('/login', checkNotAuthenticated, loginController.post)
router.post(
    '/forget',
    checkNotAuthenticated,
    body('email').isEmail().normalizeEmail().withMessage('Not A Valid E-mail'),
    forgetController.post
)
router.post(
    '/reset',
    checkNotAuthenticated,
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password Must Be At Least 8 Characters'),
    resetController.post
)
router.post(
    '/cart',
    checkAuthenticated,
    body('qty').isNumeric(),
    cartController.post
)
router.post('/checkout', checkAuthenticated, checkoutController.post)

// PUT
router.put(
    '/cart',
    checkAuthenticated,
    body('qty').isNumeric(),
    cartController.put
)

// DELETE
router.delete('/logout', checkAuthenticated, logoutController)
router.delete('/cart', checkAuthenticated, cartController.deleteCartItem)

module.exports = router
