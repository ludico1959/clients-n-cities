import { Request, Response } from 'express';
import { ClientRepository } from '../repository/implementations/ClientRepository';
import { CreateClientService } from '../service/CreateClientService';
import { FindClientService } from '../service/FindClientService';
import { DeleteClientService } from '../service/DeleteClientService';
import { UpdateClientName } from '../service/UpdateClientNameService';

const clientRepository = new ClientRepository();
const createClientService = new CreateClientService(clientRepository);
const findClientService = new FindClientService(clientRepository);
const deleteClientService = new DeleteClientService(clientRepository);
const updateClientName = new UpdateClientName(clientRepository);

class ClientController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await createClientService.execute(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const result = await findClientService.execute(req.query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      await deleteClientService.execute(req.params.id);

      return res.status(204).json(null);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async updateName(req: Request, res: Response): Promise<Response> {
    try {
      const result = await updateClientName.execute(req.params.id, req.body.name);

      return res.status(204).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { ClientController };
