import bcrypt from 'bcryptjs';
import {BAD_REQUEST, UNAUTHORIZED} from 'http-status';

import ApiError from 'core/exceptions/ApiError';
import User from 'model/User';

const create = (name, password, email) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const data = {
    name: name,
    password: hash,
    email: email
  };

  return new Promise(resolve => {
    User.create(data)
      .then(user => resolve(user))
      .catch(error => {
        if (error.code === 11000) {
          throw new ApiError('Duplicated value', BAD_REQUEST);
        } else {
          throw new ApiError(error.message, error.code);
        }
      });
  });
};

const get = (id) => {
  return new Promise(resolve => {
    return User.findById(id, {password: 0, __v: 0}).lean().exec((error, found) => {
      if(error) {
        throw new ApiError('User not found', BAD_REQUEST);
      } else {
        resolve(found);
      }
    });
  });
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    return User.findOne({email}).lean().exec((error, found) => {
      if (error) {
        reject(new ApiError('User not found', BAD_REQUEST));
      } else if (!bcrypt.compareSync(password, found.password)) {
        reject(new ApiError('Unauthorized', UNAUTHORIZED));
      } else {
        resolve(found);
      }
    });
  });
};

export {
  create,
  get,
  login
};
