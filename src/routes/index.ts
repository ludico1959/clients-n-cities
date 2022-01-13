import { Router } from 'express';
import { cityRouter } from './city.router';
import { clientRouter } from './client.router';

const routes = Router();

routes.use(cityRouter);
routes.use(clientRouter);

export { routes };
