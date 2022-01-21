import { Router } from 'express';
import { ClientController } from '../app/controller/ClientController';
import updateClientValidation from '../app/validations/client/updateClient';
import createClientValidation from '../app/validations/client/createClient';

const clientRouter = Router();

clientRouter.post('/api/v1/clients', createClientValidation, new ClientController().create);
clientRouter.get('/api/v1/clients', new ClientController().find);
clientRouter.delete('/api/v1/clients/:id', new ClientController().deleteById);
clientRouter.put('/api/v1/clients/:id', updateClientValidation, new ClientController().updateName);

export { clientRouter };
