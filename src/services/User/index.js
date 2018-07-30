import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {INTERNAL_SERVER_ERROR} from 'http-status';

import ApiError from 'core/exceptions/ApiError';
import Settings from 'core/Settings';
import User from 'model/User';

const UserCreateService = (name, password, email) => {
  const hash = bcrypt.hashSync(password, 8);
  const data = {
    name: name,
    password: hash,
    email: email
  };

  return User.create(data)
    .then(user => {
      return jwt.sign({ id: user._id }, Settings.get('app.secret'), {
        expiresIn: 86400 // expires in 24 hours
      });
    })
    .catch(error => {
      throw new ApiError('Sorry, I could create a new user for you =(', INTERNAL_SERVER_ERROR);
    });
};

export {UserCreateService};
