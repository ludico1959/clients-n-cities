import { Router } from "express";
import { cityRouter } from "../routes/city.router";

const routes = Router();

routes.use(cityRouter);

export { routes };