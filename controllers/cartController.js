const Cart = require('../models/Carts')

const createCart = async (req, res) => {
  const { userId, products } = req.body
  try {
    const newCart = await Cart.create({
      userId,
      products
    })
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}
const updateCart = async (req, res) => {
  const { userId, products } = req.body
  try {
    const foundCart = await Cart.findOne({ _id: req.params.id }).exec()
    if (userId) foundCart.userId = userId
    if (products) foundCart.products = products

    const result = await foundCart.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ _id: req.params.id }).exec()
    if (!foundCart) return res.status(302).json("No Cart with id found")
    const result = await foundCart.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.userId }).exec()
    if (!foundCart) return res.status(302).json("No Cart with id found")
    res.status(200).json(foundCart)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().exec()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}


module.exports = { createCart, updateCart, deleteCart, getCart, getCarts }