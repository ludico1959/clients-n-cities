import { Router } from 'express';
import { ClientController } from '../app/controller/ClientController';
import updateClientValidation from '../app/validations/client/updateClientValidation';
import createClientValidation from '../app/validations/client/createClientValidation';
import getCityValidation from '../app/validations/city/getCityValidation';
import deleteClientValidation from '../app/validations/client/deleteClientValidation';

const clientRouter = Router();

clientRouter.post('/api/v1/clients', createClientValidation, new ClientController().create);
clientRouter.get('/api/v1/clients', getCityValidation, new ClientController().find);
clientRouter.delete('/api/v1/clients/:id', deleteClientValidation, new ClientController().deleteById);
clientRouter.put('/api/v1/clients/:id', updateClientValidation, new ClientController().updateName);

export { clientRouter };
