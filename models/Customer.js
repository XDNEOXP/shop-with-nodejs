const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../configs/db')

const Customer = db.define(
    'customers',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
        },
        token_used: {
            type: DataTypes.NUMBER,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        defaultValue: 0,
    }
)

Customer.validPassword = (user, pwd) => {
    return bcrypt.compareSync(pwd, user.password)
}

Customer.encryptPassword = async (myPlaintextPassword) => {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(myPlaintextPassword, salt)
    return hash
}

module.exports = Customer
