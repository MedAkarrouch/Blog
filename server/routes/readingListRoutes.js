const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const readingListController = require('../controllers/readingListController')

router.get('/', authController.protect, readingListController.getReadingList)
router.post(
  '/addToReadingList',
  authController.protect,
  readingListController.addToReadingList
)

router.delete(
  '/removePostFromReadingList',
  authController.protect,
  readingListController.removePostFromReadingList
)

module.exports = router
