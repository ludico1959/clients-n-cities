import { Router } from "express";
import { CityController } from "../app/controller/CityController";

const cityRouter = Router();

cityRouter.post('/api/v1/cities', new CityController().create);
cityRouter.get('/api/v1/cities', new CityController().list);

export { cityRouter };