const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const fs = require('fs').promises
const multer = require('multer')
const { FILE_MAX_SIZE } = require('../utils/constants')
const readingTime = require('reading-time')
const renderRes = require('../utils/renderRes')
const { COMMENT_MAX_LENGTH } = require('../utils/constants')

const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true)
  else cb(new Error('Not an image! Please upload only images.'), false)
}

const upload = multer({
  fileFilter: multerFilter,
  storage: multerStorage,
})
exports.upload = (req, res, next) => {
  upload.single('coverImg')(req, res, async (err) => {
    // if there is an error comming from the multerFilter
    if (req.file?.buffer?.length > FILE_MAX_SIZE)
      return renderRes({
        res,
        status: 400,
        message: 'Image size should be less than 5 MB',
      })
    if (err) return renderRes({ res, status: 400, message: err.message })
    req.coverImg = req.file
      ? `cover-img-${req.currentUser._id}-${Date.now()}.${
          req.file.mimetype.split('/')[1]
        }`
      : undefined
    next()
  })
}

exports.getPosts = async (req, res) => {
  const { category, search, page, pageSize } = req.query
  console.log('page= ', page)
  const filterObj = {}
  if (category && category !== 'all') filterObj.category = category
  if (search) filterObj.title = { $regex: new RegExp(search, 'i') }
  let query = Post.find(filterObj).sort({ createdAt: -1 })
  if (page) {
    const PAGE_SIZE = +pageSize ? +pageSize : 10
    const skip = +page ? (+page - 1) * PAGE_SIZE : 0
    const limit = PAGE_SIZE
    query = query.skip(skip).limit(limit)
  }
  try {
    const posts = await query
    const count = await Post.countDocuments(filterObj)
    renderRes({ res, status: 200, data: { count, posts } })
  } catch (err) {
    renderRes({ res, status: 500, message: err.message })
  }
}

exports.addNewPost = async (req, res) => {
  const { title, content, category, summary } = req.body
  const author = req.currentUser
  const coverImg = req.coverImg
  const rd = readingTime(content).text
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
    })
    // upload image
    const path = 'public/img/posts'
    await fs.writeFile(`${path}/${coverImg}`, req.file.buffer)
    //
    renderRes({ res, status: 201, data: { post } })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}

exports.getPost = async (req, res) => {
  // const { postId } = req.params;
  const { post: postId } = req.query
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error('No post could be found')
    renderRes({ res, status: 200, data: { post } })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message })
  }
}
exports.deletePost = async (req, res) => {
  let postDoc
  const { post: postId } = req.query
  try {
    // check if post exists and belongs to the current user
    try {
      postDoc = await Post.findOne({
        _id: postId,
        author: req.currentUser._id,
      })
      if (!postDoc) throw Error()
    } catch {
      throw new Error('Post not found')
    }
    // Delete post
    await Post.findByIdAndDelete(postId)
    // await Post.findOneAndDelete({ author: req.currentUser._id, post: postId })
    // Delete comments
    await Comment.deleteMany({ post: postId })
    res.status(200).json({
      status: 'success',
      message: 'Post successfully deleted',
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err.message,
    })
  }
}
exports.updatePost = async (req, res) => {}

exports.likePost = async (req, res) => {
  let post
  const { post: postId } = req.query
  try {
    // 1- check if post exists
    try {
      post = await Post.findById(postId || '')
    } catch {
      throw new Error('Post not found')
    }
    // if so, add or delete like
    const hasAlreadyLikedPost = post.likes.likes.some(
      (like) => like.user.toHexString() === req.currentUser._id.toHexString()
    )
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
        }
    post = await Post.findByIdAndUpdate(
      post._id,
      {
        likes,
      },
      { new: true }
    )
    //
    renderRes({ res, status: 200, data: { post } })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.getUserPosts = async (req, res) => {
  const { page, pageSize } = req.query
  let query = Post.find({ author: req.currentUser._id })
  if (page) {
    const PAGE_SIZE = Number(pageSize) || 10
    const skip = Number(page) ? (+page - 1) * PAGE_SIZE : 0
    const limit = PAGE_SIZE
    query = query.skip(skip).limit(limit)
  }

  try {
    const count = await Post.countDocuments({ author: req.currentUser._id })
    let posts = await query
    posts = await Promise.all(
      posts?.map(async (post) => {
        // const comments = await Comment.find({ post: post._id })
        const comments = await Comment.countDocuments({ post: post._id })
        return {
          ...post._doc,
          comments: { totalComments: comments },
        }
      })
    )
    renderRes({
      res,
      status: 200,
      data: { count, posts },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
