const fs = require('fs').promises;
const multer = require('multer');
const { FILE_MAX_SIZE } = require('../utils/constants');
const readingTime = require('reading-time');
const Post = require('../models/postModel');
const renderRes = require('../utils/renderRes');
const { MAX_COMMENT_LENGTH } = require('../utils/constants');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Not an image! Please upload only images.'), false);
};

const upload = multer({
  fileFilter: multerFilter,
  storage: multerStorage,
});
exports.upload = (req, res, next) => {
  upload.single('coverImg')(req, res, async (err) => {
    // if there is an error comming from the multerFilter
    if (req.file?.buffer?.length > FILE_MAX_SIZE)
      return renderRes({
        res,
        status: 400,
        message: 'Image size should be less than 5 MB',
      });
    if (err) return renderRes({ res, status: 400, message: err.message });
    req.coverImg = req.file
      ? `cover-img-${req.currentUser._id}-${Date.now()}.${
          req.file.mimetype.split('/')[1]
        }`
      : undefined;
    next();
  });
};

exports.getPosts = async (req, res) => {
  const { category, search, page, pageSize } = req.query;
  console.log('page= ', page);
  const filterObj = {};
  if (category && category !== 'all') filterObj.category = category;
  if (search) filterObj.title = { $regex: new RegExp(search, 'i') };
  let query = Post.find(filterObj).sort({ createdAt: -1 });
  if (page) {
    const PAGE_SIZE = +pageSize ? +pageSize : 10;
    const skip = +page ? (+page - 1) * PAGE_SIZE : 0;
    const limit = PAGE_SIZE;
    query = query.skip(skip).limit(limit);
  }
  try {
    const posts = await query;
    const count = await Post.countDocuments(filterObj);
    renderRes({ res, status: 200, data: { count, posts } });
  } catch (err) {
    renderRes({ res, status: 500, message: err.message });
  }
};

exports.addNewPost = async (req, res) => {
  const { title, content, category, summary } = req.body;
  const author = req.currentUser;
  const coverImg = req.coverImg;
  const rd = readingTime(content).text;
  // console.log({ title, summary, content, category, coverImg, author });
  try {
    const post = await Post.create({
      title,
      summary,
      content,
      category,
      coverImg,
      author,
      readingTime: rd,
    });
    // upload image
    const path = 'public/img/posts';
    await fs.writeFile(`${path}/${coverImg}`, req.file.buffer);
    //
    renderRes({ res, status: 201, data: { post } });
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors });
  }
};

exports.getPost = async (req, res) => {
  // const { postId } = req.params;
  const { post: postId } = req.query;
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error('No post could be found');
    renderRes({ res, status: 200, data: { post } });
  } catch (err) {
    renderRes({ res, status: 400, message: err.message });
  }
};
exports.deletePost = async (req, res) => {};
exports.updatePost = async (req, res) => {};

exports.likePost = async (req, res) => {
  let post;
  const { post: postId } = req.query;
  try {
    // 1- check if post exists
    try {
      post = await Post.findById(postId || '');
    } catch {
      throw new Error('Post not found');
    }
    // if so, add or delete like
    const hasAlreadyLikedPost = post.likes.likes.some(
      (like) => like.user.toHexString() === req.currentUser._id.toHexString()
    );
    const likes = hasAlreadyLikedPost
      ? {
          totalLikes: post.likes.totalLikes - 1,
          likes: post.likes.likes.filter(
            (like) =>
              like.user.toHexString() !== req.currentUser._id.toHexString()
          ),
        }
      : {
          totalLikes: post.likes.totalLikes + 1,
          likes: [...post.likes.likes, { user: req.currentUser._id }],
        };
    post = await Post.findByIdAndUpdate(
      post._id,
      {
        likes,
      },
      { new: true }
    );
    //
    renderRes({ res, status: 200, data: { post } });
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors });
  }
};

exports.commentOnPost = async (req, res) => {
  let post;
  const { post: postId } = req.query;
  const { comment } = req.body;
  try {
    // 1- check if post exists
    try {
      post = await Post.findById(postId || '');
    } catch {
      throw new Error('Post not found');
    }
    // if so
    const hasAlreadyCommented = post.comments.comments.some(
      (commentObj) =>
        commentObj.user._id.toHexString() === req.currentUser._id.toHexString()
    );

    if (hasAlreadyCommented)
      throw new Error('User can only comment once in each post !');
    if (!comment || comment.trim().length > MAX_COMMENT_LENGTH)
      throw new Error('Comment must have less than 10000 characters');
    // user hasn't commented yet and the comment size is less than 10000 then,
    const comments = {
      totalComments: post.comments.totalComments + 1,
      comments: [
        ...post.comments.comments,
        { user: req.currentUser._id, comment },
      ],
    };
    post = await Post.findByIdAndUpdate(
      post._id,
      {
        comments,
      },
      { new: true, runValidators: true }
    );
    //
    renderRes({ res, status: 200, data: { post } });
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors });
  }
};

exports.deleteComment = async (req, res) => {};
exports.updateComment = async (req, res) => {};
