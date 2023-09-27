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
// router.get('/:postId', postController.getPost);
router.get('/getPost', postController.getPost);
router.get('/addLike', authController.protect, postController.likePost);
router.post(
  '/addComment',
  authController.protect,
  postController.commentOnPost
);
router.patch(
  '/updateComment',
  authController.protect,
  postController.updateComment
);
router.delete(
  '/deleteComment',
  authController.protect,
  postController.deleteComment
);
router.post('/deletePost', authController.protect, postController.deletePost);

module.exports = router;
