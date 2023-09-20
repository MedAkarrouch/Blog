const fs = require('fs').promises;
const multer = require('multer');
const Post = require('../models/postModel');
const renderRes = require('../utils/renderRes');

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
  // console.log({ title, summary, content, category, coverImg, author });
  try {
    const post = await Post.create({
      title,
      summary,
      content,
      category,
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

exports.getPost = async (req, res) => {
  const { postId } = req.params;
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
