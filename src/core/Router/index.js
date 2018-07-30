import {Router} from 'restify-router';

import HealthCheck from 'controllers/HealthCheck'
import {UserCreateController} from 'controllers/User';

const router = new Router();

router.get('/health-check', HealthCheck);
router.post('/user/register', UserCreateController);

export default router;
