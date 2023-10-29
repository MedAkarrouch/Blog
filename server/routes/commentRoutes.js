const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const commentController = require('../controllers/commentController')

router.post(
  '/addComment',
  authController.protect,
  authController.restrictToUsers,
  commentController.addComment
)
router.delete(
  '/deleteComment',
  authController.protect,
  authController.restrictToUsers,
  commentController.deleteComment
)
router.patch(
  '/updateComment',
  authController.protect,
  authController.restrictToUsers,
  commentController.updateComment
)
router.get('/getPostComments', commentController.getPostComments)

module.exports = router
