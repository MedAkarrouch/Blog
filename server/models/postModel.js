const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'lifestyle',
        'travel',
        'food and cooking',
        'health and wellness',
        'fashion and beauty',
        'technology',
        'finance',
        'education',
        'news',
      ],
      message: 'Category is invalid',
    },
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  coverImg: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: ['Author is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Likes
  // Comments
});
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'fullName photo',
  });
  next();
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
