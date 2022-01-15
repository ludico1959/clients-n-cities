import { Router } from 'express';
import { cityRouter } from './city.routes';
import { clientRouter } from './client.routes';

const router = Router();

router.use(cityRouter);
router.use(clientRouter);

export { router };
