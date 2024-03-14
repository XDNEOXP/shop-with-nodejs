const { DataTypes } = require('sequelize')
const db = require('../configs/db')

const CartItem = db.define(
    'cart_items',
    {
        cart_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        product_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.NUMBER,
        },
        quantity: {
            type: DataTypes.NUMBER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
)

module.exports = CartItem
