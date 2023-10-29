const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const utils = require('../utils/utils')

router.get('/getMe', userController.getCurrentUser)
router.patch(
  '/updateMe',
  authController.protect,
  authController.restrictToUsers,
  userController.upload,
  userController.updateMe
)
router.patch(
  '/updatePassword',
  authController.protect,
  authController.restrictToUsers,
  userController.updatePassword
)
router.post(
  '/deleteMe',
  authController.protect,
  authController.restrictToUsers,
  userController.deleteMe
)

module.exports = router
