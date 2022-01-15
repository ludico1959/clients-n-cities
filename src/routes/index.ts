import { Router } from 'express';
import { cityRouter } from './city.routes';
import { clientRouter } from './client.routes';

const routes = Router();

routes.use(cityRouter);
routes.use(clientRouter);

export { routes };
