const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { verifyAndAdmin, verifyAndAuthenticate, verifyToken } = require('../middleware/verify')

router.route('/income')
  .get(verifyAndAdmin, orderController.getOrderStats)

router.route('/:id')
  .put(verifyAndAdmin, orderController.updateOrder)
  .delete(verifyAndAdmin, orderController.deleteOrder)
  .get(verifyAndAuthenticate, orderController.getOrder)

router.route('/')
  .post(verifyToken, orderController.createOrder)
  .get(verifyAndAdmin, orderController.getOrders)

module.exports = router