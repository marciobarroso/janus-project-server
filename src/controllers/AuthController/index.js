import * as AuthService from 'services/AuthService';

const register = (req, res, next) => {
  AuthService.register(req.body.name, req.body.password, req.body.email)
    .then(token => {
      res.json({auth: true, token});
      return next();
    }).catch(error => next(error))
};

const me = (req, res, next) => {
  var token = req.headers['x-access-token'];
  AuthService.me(token)
    .then(user => {
      res.send(user);
      return next();
    }).catch(error => next(error));
};

export {
  register,
  me
};
