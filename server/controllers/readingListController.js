const ReadingList = require('../models/readingListModel')
const Post = require('../models/postModel')
const renderRes = require('../utils/renderRes')
const { userHasAlreadyAddedPostToReadingList } = require('../utils/utils')

exports.getReadingList = async (req, res) => {
  const { page, pageSize } = req.query
  let query = ReadingList.find({ user: req.currentUser._id }).populate({
    path: 'post',
    select: 'category title createdAt readingTime coverImg',
  })
  if (Number(page)) {
    const PAGE_SIZE = Number(pageSize) || 10
    const skip = Number(page) ? (+page - 1) * PAGE_SIZE : 0
    const limit = PAGE_SIZE
    query = query.skip(skip).limit(limit)
  }
  try {
    const count = await ReadingList.countDocuments({
      user: req.currentUser._id,
    })
    const list = await query
    renderRes({
      res,
      status: 200,
      data: { count, readingList: list },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message })
  }
}

exports.addToReadingList = async (req, res) => {
  try {
    const { post } = req.query
    try {
      const postDoc = await Post.findById(post)
      if (!postDoc) throw Error()
    } catch {
      throw new Error('Post not found')
    }
    await ReadingList.create({
      user: req.currentUser._id,
      post,
    })
    res.status(200).json({
      status: 'success',
      message: 'Post successfully added to the reading list',
    })
  } catch (err) {
    const error = userHasAlreadyAddedPostToReadingList(err) || err
    renderRes({ res, status: 400, message: error.message })
  }
}

exports.removePostFromReadingList = async (req, res) => {
  try {
    const { post } = req.query
    try {
      const postDoc = await Post.findById(post)
      if (!postDoc) throw Error()
    } catch {
      throw new Error('Post not found')
    }
    await ReadingList.deleteOne({ user: req.currentUser._id, post })
    res.status(200).json({
      status: 'success',
      message: 'Post successfuly removed from the reading list',
    })
  } catch (error) {
    renderRes({ res, status: 400, message: error.message })
  }
}
