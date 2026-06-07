class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Unauthenticated session. Please login.") {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Unauthorized. Admin privileges required.") {
    super(message, 403);
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database operation failed.") {
    super(message, 500);
  }
}

class ServerError extends AppError {
  constructor(message = "Internal server error.") {
    super(message, 500);
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  ServerError
};
