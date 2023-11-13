const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const renderRes = require('../utils/renderRes')
const {
  isEmailAlreadyTaken,
  isUsernameAlreadyTaken,
} = require('../utils/utils')

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const createSendToken = (status, user, req, res) => {
  const token = signToken(user._id)
  console.log(token)
  res.cookie('jwt', token, {
    maxAge: 10 * process.env.COOKIE_EXPIRES_IN * 60 * 60 * 1000,
    httpOnly: true,
    // Production
    sameSite: 'none',
    secure: true,
  })

  user.password = undefined

  res.status(status).json({
    status: 'success',
    token,
    data: { user },
  })
}

exports.signup = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body
  try {
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    })
    createSendToken(201, user, req, res)
  } catch (err) {
    const error = isUsernameAlreadyTaken(err) || isEmailAlreadyTaken(err) || err
    renderRes({ res, status: 400, message: error.message, errors: err.errors })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      throw new Error('Please provide email and password')

    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    )
    if (!user || !(await user.correctPassword(password, user.password)))
      throw new Error('Provided email or password is incorrect')
    //
    createSendToken(200, user, req, res)
    // renderRes({ res, status: 200, data: { user } });
  } catch (err) {
    renderRes({ res, status: 401, message: err.message })
  }
}

exports.protect = async (req, res, next) => {
  // 1) Getting toke
  let token
  // if (req.headers.authorization?.startsWith('Bearer'))
  //   token = req.headers.authorization.split(' ')[1];
  if (req.cookies?.jwt) token = req.cookies.jwt
  try {
    // 2) Cheking if the token exists
    if (!token)
      throw new Error('You are not logged in! Please log in to get access.')
    // 3) Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // 4) Check if user still exists
    // console.log(decoded);
    const currentUser = await User.findById(decoded.id)
    if (!currentUser)
      throw new Error('The user belonging to this token does no longer exist')
    // if it exists
    req.currentUser = currentUser
    next()
  } catch (err) {
    renderRes({ res, status: 401, message: err.message })
  }
}

exports.restrictToUsers = async (req, res, next) => {
  // Temporary so no one could break our app
  return renderRes({
    res,
    status: 401,
    message: 'This account is only for exploration.',
  })
  // That's the right one once you've done your portfolio
  // if (req.currentUser?.role === 'demo')
  //   return renderRes({
  //     res,
  //     status: 401,
  //     message:
  //       'This demo account is only for exploration. Please create your own account for full control.',
  //   })
  // else return next()
}

exports.logout = async (req, res) => {
  // res.cookie('jwt', { maxAge: 0 })
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    // domain: 'loor.netlify.app',
    // path: '/',
  })
  // res.clearCookie('jwt')
  res.status(200).json({
    status: 'success',
  })
}
