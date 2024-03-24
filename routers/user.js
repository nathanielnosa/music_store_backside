const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyAndAdmin, verifyAndAuthenticate, verifyToken } = require('../middleware/verify')

router.route('/stats')
  .get(verifyAndAdmin, userController.getUserStats)
  
router.route('/:id')
  .put(verifyAndAdmin, userController.updateUser)
  .delete(verifyAndAuthenticate, userController.deleteUser)
  .get(verifyAndAdmin, userController.getUser)

router.route('/')
  .get(verifyAndAdmin, userController.getUsers)

module.exports = router