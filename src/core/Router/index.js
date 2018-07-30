import {Router} from 'restify-router';

import HealthCheck from 'controllers/HealthCheck'

const router = new Router();

router.get('/health-check', HealthCheck);

export default router;