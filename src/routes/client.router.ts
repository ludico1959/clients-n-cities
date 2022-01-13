import { Router } from 'express';
import { ClientController } from '../app/controller/ClientController';

const clientRouter = Router();

clientRouter.post('/api/v1/clients', new ClientController().create);
clientRouter.get('/api/v1/clients', new ClientController().listByName);
clientRouter.get('/api/v1/clients/:id', new ClientController().listById);
clientRouter.delete('/api/v1/clients/:id', new ClientController().deleteById);
clientRouter.put('/api/v1/clients/:id', new ClientController().updateName);

export { clientRouter };
