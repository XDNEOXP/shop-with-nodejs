const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const Category = require('./Category')

const Product = db.define(
    'products',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.NUMBER,
        },
        category_id: {
            type: DataTypes.NUMBER,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    { timestamps: false }
)

Product.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
    },
})

module.exports = Product
