const LocalStrategy = require('passport-local').Strategy
const Customer = require('../models/Customer')

const initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        const customer = await Customer.findOne({
            where: {
                email,
            },
        })

        if (customer == null) {
            return done(null, false, { message: 'Customer not found' })
        }

        try {
            if (Customer.validPassword(customer, password)) {
                done(null, customer)
            } else {
                done(null, false, { message: 'password is wrong' })
            }
        } catch (error) {
            done(error)
        }
    }
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser)
    )
    passport.serializeUser((customer, done) => done(null, customer.id))
    passport.deserializeUser(
        async (id, done) =>
            await done(
                null,
                await Customer.findOne({
                    where: {
                        id: id,
                    },
                })
            )
    )
}

module.exports = initializePassport
