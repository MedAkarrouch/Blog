exports.isEmailAlreadyTaken = (err) => {
  if (err.code === 11000 && err.keyPattern.hasOwnProperty('email'))
    return { message: 'Email is already taken' };
  else return null;
};
exports.isNameAlreadyTaken = (err) => {
  if (err.code === 11000 && err.keyPattern.hasOwnProperty('fullName'))
    return { message: 'fullName is already taken' };
  else return null;
};
