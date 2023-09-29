const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const commentController = require('../controllers/commentController')

router.post('/addComment', authController.protect, commentController.addComment)
router.delete(
  '/deleteComment',
  authController.protect,
  commentController.deleteComment
)
router.patch(
  '/updateComment',
  authController.protect,
  commentController.updateComment
)
router.get('/getPostComments', commentController.getPostComments)

module.exports = router
