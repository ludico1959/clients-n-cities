import { Router } from 'express';
import { ClientController } from '../app/controller/ClientController';
import updateClientValidation from '../app/validation/client/updateClient';
import createClientValidation from '../app/validation/client/createClient';

const clientRouter = Router();

clientRouter.post('/api/v1/clients', createClientValidation, new ClientController().create);
clientRouter.get('/api/v1/clients', new ClientController().listByName);
clientRouter.get('/api/v1/clients/:id', new ClientController().listById);
clientRouter.delete('/api/v1/clients/:id', new ClientController().deleteById);
clientRouter.put('/api/v1/clients/:id', updateClientValidation, new ClientController().updateName);

export { clientRouter };
