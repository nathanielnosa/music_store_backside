const Product = require('../models/Products')

const createProduct = async (req, res) => {
  const { title, description, collections,artist, inStock, price, image } = req.body
  try {
    const newProduct = await Product.create({
      title,
      description,
      inStock,
      price,
      collections,
      artist,
      image
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}
const updateProduct = async (req, res) => {
  const { title, description, collections,artist,isAvailable, inStock, price, image } = req.body
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (title) foundProduct.title = title
    if (description) foundProduct.description = description
    if (collections) foundProduct.collections = collections 
    if (artist) foundProduct.artist = artist 
    if (inStock) foundProduct.inStock = inStock
    if (isAvailable) foundProduct.isAvailable = isAvailable
    if (price) foundProduct.price = price
    if (image) foundProduct.image = image

    const result = await foundProduct.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(302).json("No product with id found")
    const result = await foundProduct.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(302).json("No product with id found")
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getProducts = async (req, res) => {
  const query = req.query.new
  const collection = req.query.collection
  try {
    let product;
    if (query) {
      product = await Product.find().sort({ createdAt: -1 }).limit(3).exec()
    } else if (collection) {
      product = await Product.find({
        collections: {
          $in: [collection]
        }
      }).exec()
    } else {
      product = await Product.find().exec()
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}


module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getProducts }