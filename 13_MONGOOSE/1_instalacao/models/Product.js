const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        retailerID: { type: mongoose.SchemaTypes.ObjectId,
        required: true, index: true }, 
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    })
)

module.exports = Product