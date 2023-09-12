const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Fullname must have more than 3 characters'],
    maxlength: [25, 'Fullname must have less than 26 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must have more than 8 characters'],
    maxlength: [30, 'Password must have less than 31 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm password is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  photo: {
    type: String,
    default: 'default-user.jpg',
  },
  // social media links
  // followers
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
