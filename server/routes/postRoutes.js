const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')

router.get('/', postController.getPosts)

router.post(
  '/addNewPost',
  authController.protect,
  postController.upload,
  postController.addNewPost
)
router.get('/stats', authController.protect, postController.getStats)
router.get('/getPost', postController.getPost)
router.delete('/deletePost', authController.protect, postController.deletePost)
router.post(
  '/updatePost',
  authController.protect,
  postController.upload,
  postController.updatePost
)
router.get('/getUserPosts', authController.protect, postController.getUserPosts)

module.exports = router
