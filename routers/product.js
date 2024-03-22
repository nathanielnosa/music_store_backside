const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { verifyAndAdmin, verifyAndAuthenticate } = require('../middleware/verify')

router.route('/:id')
  .put(verifyAndAdmin, productController.updateProduct)
  .delete(verifyAndAdmin, productController.deleteProduct)
  .get(productController.getProduct)

router.route('/')
  .post(verifyAndAdmin, productController.createProduct)
  .get(productController.getProducts)

module.exports = router