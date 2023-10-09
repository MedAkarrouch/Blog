const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
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
  comment: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Comment is required'],
    maxlength: [10000, 'Comment must have less than 10000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullName photo',
  })
  next()
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
