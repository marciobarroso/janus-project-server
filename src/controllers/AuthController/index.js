import * as AuthService from 'services/AuthService';

const register = (req, res, next) => {
  return AuthService.register(req.body.name, req.body.password, req.body.email)
    .then(token => {
      res.send({auth: true, token});
      return next();
    }).catch(error => next(error));
};

const me = (req, res, next) => {
  var token = req.headers['x-access-token'];
  return AuthService.me(token)
    .then(user => {
      res.send(user);
      return next();
    }).catch(error => next(error));
};

const login = (req, res, next) => {
  return AuthService.login(req.body.email, req.body.password)
    .then(token => {
      res.send({auth: true, token});
      return next();
    }).catch(error => next(error));
};

export {
  register,
  me,
  login
};
