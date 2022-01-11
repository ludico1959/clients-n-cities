import { Router } from "express";
import { ClientController } from "../app/controller/ClientController";

const clientRouter = Router();

clientRouter.post('/api/v1/clients', new ClientController().create);
clientRouter.get('/api/v1/clients', new ClientController().listByName);
clientRouter.get('/api/v1/clients/:id', new ClientController().listById);

export { clientRouter };