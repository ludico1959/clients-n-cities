import { Router } from 'express';
import { CityController } from '../app/controller/CityController';
import createCityValidation from '../app/validations/city/createCity';

const cityRouter = Router();

cityRouter.post('/api/v1/cities', createCityValidation, new CityController().create);
cityRouter.get('/api/v1/cities/state/:state', new CityController().listByState);
cityRouter.get('/api/v1/cities/name/:name', new CityController().findByName);

export { cityRouter };
