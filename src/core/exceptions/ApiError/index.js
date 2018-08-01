class ApiError extends Error {
  constructor(message, code) {
    super();
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
