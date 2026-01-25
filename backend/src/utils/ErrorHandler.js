class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const erroMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  const errMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errMessage,
  });
};

export default ErrorHandler;