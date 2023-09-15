const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (el) {
        const categories = [
          'lifestyle',
          'travel',
          'food and cooking',
          'health and wellness',
          'fashion and beauty',
          'technology',
          'finance',
          'education',
          'news',
        ];
        // return categories.includes(el.toLowerCase().trim());
        return categories.includes(el);
      },
      message: 'Category is invalid',
    },
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [400, 'Content must have more than 400 characters'],
    maxlength: [9999, 'Content must have less than 10000  characters'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    lowercase: true,
    trim: true,
    minlength: [10, 'Title must have more than 10 characters'],
    maxlength: [99, 'Title must have less than 100  characters'],
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
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
