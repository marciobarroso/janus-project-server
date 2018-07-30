import bcrypt from 'bcryptjs';

import {UserCreateService} from 'services/User';

const UserCreateController = (req, res, next) => {
  const name = req.body.name;
  const password = bcrypt.hashSync(req.body.password, 8);
  const email = req.body.email;

  UserCreateService(name, password, email)
    .then(token => {
      res.json({ auth: true, token: token });
      return next();
    })
    .catch(error => next(error));
};

export {UserCreateController};
