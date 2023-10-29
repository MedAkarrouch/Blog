const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const likeController = require('../controllers/likeController')

router.post(
  '/addLike',
  authController.protect,
  authController.restrictToUsers,
  likeController.addLike
)

router.delete(
  '/removeLike',
  authController.protect,
  authController.restrictToUsers,
  likeController.removeLike
)

module.exports = router
