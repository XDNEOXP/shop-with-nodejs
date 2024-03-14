const express = require('express')
require('dotenv').config()
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const router = require('./routes')
const errorHandler = require('./helpers/errorHandler')
const initializePassport = require('./helpers/passport')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
)
app.use(methodOverride('_method'))
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
app.use(errorHandler.handler404)
app.use(errorHandler.handlerServerError)

app.listen(port, () => {
    console.log(`server is running on http://${process.env.HOST}:${port}`)
})
