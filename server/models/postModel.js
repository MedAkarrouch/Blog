const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
  {
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
          ]
          // return categories.includes(el.toLowerCase().trim());
          return categories.includes(el)
        },
        message: 'Category is invalid',
      },
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [400, 'Content must have more than 400 characters'],
      maxlength: [100000, 'Content must have less than 100000  characters'],
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
      minlength: [200, 'Summary must have more or equal than 200 characters'],
      maxlength: [300, 'Summary must have less or equal than 300  characters'],
    },
    coverImg: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    readingTime: {
      type: String,
      required: [true, 'Reading time is required'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

postSchema.virtual('likesCount', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  count: true,
})

postSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true,
})

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  options: { sort: { createdAt: -1 } },
})

postSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
})

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'fullName photo',
  })
    .populate('commentsCount')
    .populate('likesCount')
  next()
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
