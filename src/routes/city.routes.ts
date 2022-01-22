import { Router } from 'express';
import { CityController } from '../app/controller/CityController';
import createCityValidation from '../app/validations/city/createCityValidation';
import findCityValidation from '../app/validations/city/findCityValidation';

const cityRouter = Router();

cityRouter.post('/api/v1/cities', createCityValidation, new CityController().create);
cityRouter.get('/api/v1/cities', findCityValidation, new CityController().find);

export { cityRouter };
