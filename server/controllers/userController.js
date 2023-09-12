const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const renderRes = require('../utils/renderRes');

exports.getCurrentUser = async (req, res, next) => {
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
