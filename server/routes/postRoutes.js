const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.post(
  '/addNewPost',
  authController.protect,
  postController.upload,
  postController.addNewPost
);
router.get('/:postId', postController.getPost);
router.post('/AddLike', authController.protect, postController.likePost);
router.post(
  '/AddComment',
  authController.protect,
  postController.commentOnPost
);

module.exports = router;
