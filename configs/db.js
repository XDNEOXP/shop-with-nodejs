const Sequelize = require('sequelize')

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql',
    }
)

try {
    db.authenticate()
    console.log('Successfully Connected')
} catch (error) {
    console.log(error)
}

module.exports = db
