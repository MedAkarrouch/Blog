const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const utils = require('../utils/utils');

router.get('/getMe', userController.getCurrentUser);
router.patch(
  '/updateMe',
  authController.protect,
  userController.upload,
  userController.updateMe
);
router.patch(
  '/updatePassword',
  authController.protect,
  userController.updatePassword
);

module.exports = router;
