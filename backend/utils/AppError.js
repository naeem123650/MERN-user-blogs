class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // This flag helps us differentiate between operational errors and programming errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
