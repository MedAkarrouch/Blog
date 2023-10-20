const Like = require('../models/likeModel')
const Post = require('../models/postModel')
const renderRes = require('../utils/renderRes')
const { userHasAlreadyLikedPost } = require('../utils/utils')

exports.addLike = async (req, res) => {
  try {
    const { post } = req.query
    try {
      const postDoc = await Post.findById(post)
      if (!postDoc) throw Error()
    } catch {
      throw new Error('Post not found')
    }
    const like = await Like.create({
      user: req.currentUser._id,
      post,
    })
    res.status(200).json({
      status: 'success',
      message: 'Like successfully added',
    })
  } catch (err) {
    const error = userHasAlreadyLikedPost(err) || err
    renderRes({ res, status: 400, message: error.message })
  }
}

exports.removeLike = async (req, res) => {
  try {
    const { post } = req.query
    try {
      const postDoc = await Post.findById(post)
      if (!postDoc) throw Error()
    } catch {
      throw new Error('Post not found')
    }
    await Like.deleteOne({ user: req.currentUser._id, post })
    res.status(200).json({
      status: 'success',
      message: 'Like successfuly removed',
    })
  } catch (error) {
    renderRes({ res, status: 400, message: error.message })
  }
}
