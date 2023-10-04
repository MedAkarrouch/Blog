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
router.get('/getPost', postController.getPost)
router.get('/addLike', authController.protect, postController.likePost)
router.post('/deletePost', authController.protect, postController.deletePost)
router.get('/getUserPosts', authController.protect, postController.getUserPosts)

module.exports = router
