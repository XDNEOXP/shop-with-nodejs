const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const CartItem = require('./CartItem')

const Cart = db.define(
    'cart',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        customer_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
)

Cart.hasMany(CartItem, {
    foreignKey: 'cart_id',
})

module.exports = Cart
