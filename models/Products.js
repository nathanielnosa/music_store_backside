const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  collection: { type: Array },
  inStock: { type: Number },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel