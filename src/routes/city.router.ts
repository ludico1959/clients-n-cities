import { Router } from "express";
import { CityController } from "../app/controller/CityController";

const cityRouter = Router();

cityRouter.post('/cities', new CityController().create);
cityRouter.get('/cities', new CityController().listAll);

export { cityRouter };