import { Router } from "express";
import { cityRouter } from "../routes/city.router";
import { clientRouter } from "../routes/client.router";

const routes = Router();

routes.use(cityRouter);
routes.use(clientRouter);

export { routes };