import { Router } from "express";
import { CityController } from "../app/controller/CityController";

const cityRouter = Router();

cityRouter.post('/cities', new CityController().create);

export { cityRouter };