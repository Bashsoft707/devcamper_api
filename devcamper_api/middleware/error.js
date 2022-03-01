const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err, req, res, next) => {

    let error = {...err}
    error.message = err.message

  // error for developers
  console.log(err.stack.red);

  if(err.name === 'CastError') {
      next(`Bootcamp not found with id of ${req.params.id}`)
      error = new ErrorResponse(message, 404)
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error.message || 'Server error',
  });
};

module.exports = errorHandler;
