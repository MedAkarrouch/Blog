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
    renderRes({
      res,
      status: 200,
      data: { message: 'Comment successfully deleted' },
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
    renderRes({ res, status: 200, data: { comment } })
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors })
  }
}
exports.getPostComments = async (req, res) => {
  let comments
  const { post } = req.query
  try {
    try {
      comments = await Comment.find({ post })
        .populate({
          path: 'user',
          select: 'photo fullName',
        })
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error('Post not found')
    }
    renderRes({
      res,
      status: 200,
      data: { totalComments: comments.length, comments },
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
