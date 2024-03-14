const data = require('../public/products.json')
const Product = require('../models/Product')

const importToDatabase = () => {
    data.forEach((product) => {
        Product.create({
            ...product,
        })
    })
}

importToDatabase()
