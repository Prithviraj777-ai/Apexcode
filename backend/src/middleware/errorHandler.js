const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Mongoose Cast Errors (Invalid ID)
  if (err.name === 'CastError') {
    err.statusCode = 400;
    err.message = `Invalid resource ID: ${err.value}`;
    err.isOperational = true;
  }

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = Object.values(err.errors).map(val => val.message).join(', ');
    err.isOperational = true;
  }

  // Handle Duplicate Key Errors (MongoDB 11000)
  if (err.code === 11000) {
    err.statusCode = 400;
    err.isOperational = true;
    let message = "Duplicate field value entered.";
    if (err.keyValue) {
      const keys = Object.keys(err.keyValue).join(', ');
      const values = Object.values(err.keyValue).join(', ');
      message = `Duplicate value: '${values}' for field: '${keys}'. Please use another value!`;
    } else if (err.errmsg) {
      const match = err.errmsg.match(/(["'])(\\?.)*?\1/);
      const value = match ? match[0] : '';
      message = `Duplicate field value: ${value}. Please use another value!`;
    }
    err.message = message;
  }

  // Handle JWT Validation Errors
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid authentication token. Please login again.';
    err.isOperational = true;
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Authentication token expired. Please login again.';
    err.isOperational = true;
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }

  // Production response (do not leak stack details)
  return res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.isOperational ? err.message : 'Something went wrong on our end.'
  });
};

module.exports = errorHandler;

