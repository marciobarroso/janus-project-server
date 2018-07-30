import {INTERNAL_SERVER_ERROR} from 'http-status';

const ErrorHandler = (req, res, err, callback) => {
  res.statusCode = err.code || INTERNAL_SERVER_ERROR;
  res.json(res.statusCode, {message: err.message, success: false});
  return callback();
};

export default ErrorHandler;
