const User = require('../models/userModel');
const { FILE_MAX_SIZE } = require('../utils/constants');
const fs = require('fs').promises;
const sharp = require('sharp');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const renderRes = require('../utils/renderRes');
const { isEmailAlreadyTaken, isNameAlreadyTaken } = require('../utils/utils');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log('File', file);
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Not an image! Please upload only images.'), false);
};
const upload = multer({
  fileFilter: multerFilter,
  storage: multerStorage,
});

exports.upload = (req, res, next) => {
  upload.single('photo')(req, res, async (err) => {
    // console.log('FFF : ', req.file.buffer.length);
    // console.log('FFF : ', req.file);
    // if there is an error comming from the multerFilter
    if (req.file?.buffer?.length > FILE_MAX_SIZE)
      return renderRes({
        res,
        status: 400,
        message: 'Image size should be less than 5 MB',
      });
    if (err) return renderRes({ res, status: 400, message: err.message });
    req.photo = req.file
      ? `photo-${req.currentUser._id}-${Date.now()}.${
          req.file.mimetype.split('/')[1]
        }`
      : undefined;
    next();
  });
};

exports.getCurrentUser = async (req, res) => {
  // 1) Getting toke
  let token;
  if (req.headers.authorization?.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];
  if (req.cookies?.jwt) token = req.cookies.jwt;
  console.log(req.cookies);
  try {
    // 2) Cheking if the token exists
    if (!token)
      throw new Error('You are not logged in! Please log in to get access.');
    // 3) Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4) Check if user still exists
    console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user)
      throw new Error('The user belonging to this token does no longer exist');
    // if it exists
    renderRes({ res, status: 200, data: { user } });
  } catch (err) {
    renderRes({ res, status: 401, message: err.message });
  }
};
exports.updateMe = async (req, res) => {
  const { email, fullName } = req.body;
  const updateObj = { email, fullName };
  if (req.photo) updateObj.photo = req.photo;
  try {
    const user = await User.findByIdAndUpdate(req.currentUser._id, updateObj, {
      runValidators: true,
    });
    // upload image
    if (req.photo) {
      const path = 'public/img/users';
      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFile(`${path}/${req.photo}`);
      if (user.photo !== 'default.jpg')
        await fs.unlink(`${path}/${user.photo}`);
    }
    //
    renderRes({ res, status: 201, data: { user } });
  } catch (err) {
    const error = isNameAlreadyTaken(err) || isEmailAlreadyTaken(err) || err;
    renderRes({
      res,
      status: 400,
      message: error.message,
      errors: err.errors,
    });
  }
};
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  console.log({ currentPassword, newPassword, confirmPassword });
  try {
    const user = await User.findById(req.currentUser._id).select('+password');
    if (!(await user.correctPassword(currentPassword || '', user.password)))
      return renderRes({
        res,
        status: 401,
        message: currentPassword
          ? 'Current password is wrong'
          : 'Current password is required',
      });
    // if so
    user.password = newPassword;
    user.passwordConfirm = confirmPassword;
    await user.save();
    renderRes({ res, status: 200, data: { user: req.currentUser } });
  } catch (err) {
    renderRes({ res, status: 400, message: err.message, errors: err.errors });
  }
};
exports.deleteMe = async (req, res) => {
  try {
    // 1- delete all user posts
    // 2- delete user
  } catch (err) {}
};
