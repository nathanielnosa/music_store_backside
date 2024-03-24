const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { verifyAndAdmin, verifyAndAuthenticate, verifyToken } = require('../middleware/verify')

router.route('/:id')
  .put(verifyAndAuthenticate, cartController.updateCart)
  .delete(verifyAndAuthenticate, cartController.deleteCart)
  .get(verifyAndAuthenticate, cartController.getCart)

router.route('/')
  .post(verifyToken, cartController.createCart)
  .get(verifyAndAdmin, cartController.getCarts)

module.exports = router