import {UNAUTHORIZED} from 'http-status';

export default (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token)
    res.send(UNAUTHORIZED);
  else
    return next();
};
