const multer = require('multer')
//
exports.userHasAlreadyAddedPostToReadingList = (err) => {
  if (
    err.code === 11000 &&
    err.keyPattern.hasOwnProperty('user') &&
    err.keyPattern.hasOwnProperty('post')
  )
    return { message: 'Post is already added to the raeding list' }
  else return null
}
exports.userHasAlreadyLikedPost = (err) => {
  if (
    err.code === 11000 &&
    err.keyPattern.hasOwnProperty('user') &&
    err.keyPattern.hasOwnProperty('post')
  )
    return { message: 'User can like a post only once' }
  else return null
}

exports.isEmailAlreadyTaken = (err) => {
  if (err.code === 11000 && err.keyPattern.hasOwnProperty('email'))
    return { message: 'Email is already taken' }
  else return null
}
//
exports.isUsernameAlreadyTaken = (err) => {
  if (err.code === 11000 && err.keyPattern.hasOwnProperty('username'))
    return { message: 'Username is already taken' }
  else return null
}
// exports.isNameAlreadyTaken = (err) => {
//   if (err.code === 11000 && err.keyPattern.hasOwnProperty('fullName'))
//     return { message: 'fullName is already taken' }
//   else return null
// }
//
