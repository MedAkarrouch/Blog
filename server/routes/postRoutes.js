const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

router.post(
  '/addNewPost',
  authController.protect,
  postController.upload,
  postController.addNewPost
);
router.get('/', postController.getPosts);
router.get('/:postId', postController.getPost);
router.post('/upload', authController.protect, postController.upload);

module.exports = router;
