const Comment = require('../models/commentModel')
const renderRes = require('../utils/renderRes')
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      post: req.query.post,
      user: req.currentUser._id,
      comment: req.body.comment,
    })
    renderRes({ res, status: 200, data: { comment } })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.deleteComment = async (req, res) => {
  let commentDoc
  const user = req.currentUser._id
  const { comment: _id } = req.query
  try {
    try {
      commentDoc = await Comment.findOne({ user, _id })
      if (!commentDoc) throw new Error()
    } catch (error) {
      throw new Error('Comment not found')
    }
    await Comment.findByIdAndDelete(commentDoc._id)
    res.status(200).json({
      status: 'success',
      message: 'Comment successfully deleted',
      data: {
        comment: commentDoc,
      },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.updateComment = async (req, res) => {
  let commentDoc
  const user = req.currentUser._id
  const { comment: _id } = req.query
  try {
    try {
      commentDoc = await Comment.findOne({ user, _id })
      if (!commentDoc) throw new Error()
    } catch (error) {
      throw new Error('Comment not found')
    }
    // if so then
    const comment = await Comment.findByIdAndUpdate(
      commentDoc._id,
      { comment: req.body.comment },
      {
        runValidators: true,
        new: true,
      }
    )
    renderRes({
      res,
      status: 200,
      data: { message: 'Comment successfully updated', comment },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.getPostComments = async (req, res) => {
  let comments, count
  const { post, page, pageSize } = req.query
  let query = Comment.find({ post })
    .populate({
      path: 'user',
      select: 'photo fullName',
    })
    .sort({ createdAt: -1 })
  if (page) {
    const PAGE_SIZE = +pageSize ? +pageSize : 10
    const skip = +page ? (+page - 1) * PAGE_SIZE : 0
    const limit = PAGE_SIZE
    query = query.skip(skip).limit(limit)
  }
  try {
    try {
      comments = await query
      count = await Comment.countDocuments({ post })
    } catch (error) {
      throw new Error('Post not found')
    }
    renderRes({
      res,
      status: 200,
      data: { count, totalComments: comments.length, comments },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
    renderRes({
      res,
      status: 200,
      data: { totalComments: comments.length, comments },
    })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
