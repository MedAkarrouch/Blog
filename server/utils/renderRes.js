function renderRes({ res, status, message, data, errors }) {
  res.status(status).json({
    status: message ? 'error' : 'success',
    data: message ? { message } : { ...data },
    validationErrors: errors
      ? Object.entries(errors).map((obj) => {
          const field = obj.at(0);
          const error = obj.at(1).message;
          return { field, error };
        })
      : null,
  });
}

module.exports = renderRes;
