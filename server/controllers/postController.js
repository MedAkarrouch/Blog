const fs = require('fs').promises;
const multer = require('multer');
const Post = require('../models/postModel');
const renderRes = require('../utils/renderRes');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log(file);
  console.log('DDDDd');
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Not an image! Please upload only images.'), false);
};

const upload = multer({
  fileFilter: multerFilter,
  storage: multerStorage,
});
exports.upload = (req, res, next) => {
  upload.single('coverImg')(req, res, async (err) => {
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
  try {
    const posts = await Post.find();
    renderRes({ res, status: 200, data: { posts } });
  } catch (err) {
    renderRes({ res, status: 500, message: err.message });
  }
};

exports.addNewPost = async (req, res) => {
  const { title, content, categorie } = req.body;
  const author = req.currentUser;
  const coverImg = req.coverImg;
  try {
    const post = await Post.create({
      title,
      content,
      categorie,
      coverImg,
      author,
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

exports.getPost = async (req, res) => {};
exports.deletePost = async (req, res) => {};
exports.updatePost = async (req, res) => {};
