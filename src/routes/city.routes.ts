import { Router } from 'express';
import { CityController } from '../app/controller/CityController';
import createCityValidation from '../app/validations/city/createCityValidation';
import getCityValidation from '../app/validations/city/getCityValidation';

const cityRouter = Router();

cityRouter.post('/api/v1/cities', createCityValidation, new CityController().create);
cityRouter.get('/api/v1/cities', getCityValidation, new CityController().find);

export { cityRouter };
