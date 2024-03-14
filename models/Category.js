const { DataTypes } = require('sequelize')
const db = require('../configs/db')

const Category = db.define(
    'categories',
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
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
)

module.exports = Category
