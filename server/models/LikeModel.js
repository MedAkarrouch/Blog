const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
likeSchema.index({ user: 1, post: 1 }, { unique: true })
const Like = mongoose.model('Like', likeSchema)
module.exports = Like
