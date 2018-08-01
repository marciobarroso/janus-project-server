import {Router} from 'restify-router';

import HealthCheck from 'controllers/HealthCheckController'
import * as AuthController from 'controllers/AuthController';

const router = new Router();

const mock = (req, res, next) => {res.send(); return next();};

router.get('/health-check', HealthCheck);
router.post('/auth/register', AuthController.register);
router.get('/auth/me', AuthController.me);
router.post('/auth/login', mock);
router.get('/auth/logout', mock);

export default router;
