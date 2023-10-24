const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const Like = require('../models/likeModel')
const ReadingList = require('../models/readingListModel')
const fs = require('fs').promises
const multer = require('multer')
const { FILE_MAX_SIZE, COMMENTS_PER_PAGE } = require('../utils/constants')
const readingTime = require('reading-time')
const renderRes = require('../utils/renderRes')

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
  let PAGE_SIZE, skip, limit, posts
  const { category, search, page, pageSize, sortBy } = req.query
  console.log('page= ', page)
  console.log('sortBy= ', sortBy)
  const filterObj = {}
  if (category && category !== 'all') filterObj.category = category
  if (search) filterObj.title = { $regex: new RegExp(search, 'i') }
  let query = Post.find(filterObj)
  if (sortBy !== 'popular') query = query.sort({ createdAt: -1 })

  if (page) {
    PAGE_SIZE = +pageSize ? +pageSize : 10
    skip = +page ? (+page - 1) * PAGE_SIZE : 0
    limit = PAGE_SIZE
    // query = query.skip(skip).limit(limit)
  }

  try {
    if (sortBy !== 'popular') posts = await query.skip(skip).limit(limit)
    else {
      posts = await query
      posts = posts
        .sort((a, b) => b.likesCount - a.likesCount)
        .sort((a, b) => {
          if (a.likesCount === b.likesCount)
            return b.commentsCount - a.commentsCount
          else return b.likesCount - a.likesCount
        })
        .slice(skip, skip + limit)
    }

    const count = await Post.countDocuments(filterObj)
    renderRes({ res, status: 200, data: { count, posts } })
  } catch (err) {
    console.log(err)
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
  let options = {}
  // const { postId } = req.params;
  const { post: postId, commentsPage } = req.query
  if (+commentsPage) {
    options.skip = +commentsPage ? (+commentsPage - 1) * COMMENTS_PER_PAGE : 0
    options.limit = COMMENTS_PER_PAGE
  }
  try {
    const post = await Post.findById(postId)
      .populate({
        path: 'comments',
        options: { sort: { 'comments.createdAt': -1 }, ...options },
        // options: { limit: COMMENTS_PER_PAGE },
      })
      .populate({ path: 'likes', select: 'user -_id -post' })
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
    // Delete likes
    await Like.deleteMany({ post: postId })
    // Delete from readingList
    await ReadingList.deleteMany({ post: postId })
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

exports.updatePost = async (req, res) => {
  let post
  const { post: postId } = req.query
  const { category, title, summary, content } = req.body
  const coverImg = req.coverImg
  // console.log(coverImg)
  // console.log(req.file)
  // console.log('** ', req.body)

  const updateObj = {
    title,
    category,
    summary,
    content,
    readingTime: readingTime(content).text,
  }
  if (coverImg) updateObj.coverImg = coverImg

  try {
    try {
      post = await Post.findOne({
        _id: postId,
        author: req.currentUser._id,
      })
      if (!post) throw Error()
    } catch {
      throw new Error('Post not found')
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: post.title,
        summay: post.summary,
        content: post.content,
        category: post.category,
        readingTime: post.readingTime,
        ...updateObj,
      },
      {
        runValidators: true,
        new: true,
      }
    )
    // const updatedPost = await Post.findByIdAndUpdate(postId, updateObj, {
    //   runValidators: true,
    //   new: true,
    // })
    // upload image
    if (coverImg) {
      const path = 'public/img/posts'
      await fs.writeFile(`${path}/${coverImg}`, req.file.buffer)
    }
    // return response
    renderRes({
      res,
      status: 200,
      data: { post: updatedPost, message: 'Post successfully updated' },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}

exports.getUserPosts = async (req, res) => {
  const { page, pageSize, sortBy } = req.query
  let skip, limit
  let query = Post.find({ author: req.currentUser._id })
  if (Number(page)) {
    const PAGE_SIZE = Number(pageSize) || 10
    skip = Number(page) ? (+page - 1) * PAGE_SIZE : 0
    limit = PAGE_SIZE
    if (sortBy !== 'stats-desc' && sortBy !== 'stats-asc')
      query = query.skip(skip).limit(limit)
  }
  if (sortBy === 'date-desc') query = query.sort({ createdAt: -1 })
  else if (sortBy === 'date-asc') query = query.sort({ createdAt: 1 })
  try {
    const count = await Post.countDocuments({ author: req.currentUser._id })
    let posts = await query
    if (sortBy === 'stats-desc') {
      posts = posts
        .sort((a, b) => b.likesCount - a.likesCount)
        .sort((a, b) => {
          if (a.likesCount === b.likesCount)
            return b.commentsCount - a.commentsCount
          else return b.likesCount - a.likesCount
        })
        .slice(skip, skip + limit)
    } else if (sortBy === 'stats-asc') {
      posts = posts
        .sort((a, b) => a.likesCount - b.likesCount)
        .sort((a, b) => {
          if (a.likesCount === b.likesCount)
            return a.commentsCount - b.commentsCount
          else return a.likesCount - b.likesCount
        })
        .slice(skip, skip + limit)
    }
    renderRes({
      res,
      status: 200,
      data: { count, posts },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}

exports.getStats = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.currentUser._id })
    const totalPosts = posts.length
    const totalLikes = posts.reduce((acc, post) => acc + post.likesCount, 0)
    const totalComments = posts.reduce(
      (acc, post) => acc + post.commentsCount,
      0
    )
    const averageLikesPerPost =
      totalPosts > 0 ? Math.ceil(totalLikes / totalPosts) : 0
    const averageCommentsPerPost =
      totalPosts > 0 ? Math.ceil(totalComments / totalPosts) : 0

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalPosts,
          totalLikes,
          totalComments,
          averageLikesPerPost,
          averageCommentsPerPost,
        },
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err.message,
    })
  }
  // Total comments
  // Total posts
  //Total likes
  // Avg likes per post
  // Avg comments per post
}
