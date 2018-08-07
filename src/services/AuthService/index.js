import {INTERNAL_SERVER_ERROR} from 'http-status';
import jwt from 'jsonwebtoken';
import {UNAUTHORIZED} from 'http-status';

import * as UserService from 'services/UserService';
import ApiError from 'core/exceptions/ApiError';
import Settings from 'core/Settings';

const register = (name, password, email) => {
  return UserService.create(name, password, email)
    .then(user => {
      return jwt.sign({ id: user._id }, Settings.get('app.secret'), {
        expiresIn: 86400 // expires in 24 hours
      });
    })
    .catch(error => {
      throw error;
    });
};

const me = (token) => {
  return new Promise((resolve, reject) => {
    if (!token)
      throw new ApiError('No token provided', UNAUTHORIZED);

    const decoded = jwt.verify(token, Settings.get('app.secret'), function(err, decoded) {
      if (err)
        throw new ApiError('Failed to authenticate token', UNAUTHORIZED);
      return decoded;
    });

    return UserService.get(decoded.id)
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
};

const login = (email, password) => {
  return UserService.login(email, password)
    .then(user => {
      return jwt.sign({ id: user._id }, Settings.get('app.secret'), {
        expiresIn: 86400 // expires in 24 hours
      });
    })
    .catch(error => {
      throw error;
    });
};

export {
  register,
  me,
  login
};
