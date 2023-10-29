const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const readingListController = require('../controllers/readingListController')

router.get('/', authController.protect, readingListController.getReadingList)
router.post(
  '/addToReadingList',
  authController.protect,
  authController.restrictToUsers,
  readingListController.addToReadingList
)

router.delete(
  '/removePostFromReadingList',
  authController.protect,
  authController.restrictToUsers,
  readingListController.removePostFromReadingList
)

module.exports = router
