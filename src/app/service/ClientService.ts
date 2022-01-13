import { ClientRepository } from '../repository/ClientRepository';
import { Client } from '../entities/Client';

const clientRepository = new ClientRepository();

type RequestClient = {
  name: string;
  gender: string;
  birthdate: Date;
  age: number;
  cityId: string;
};

class ClientService {
  async create(payload: RequestClient): Promise<Client | Error> {
    const result = await clientRepository.create(payload);

    return result;
  }

  async listById(payload: string): Promise<Client | Error> {
    const result = await clientRepository.listById(payload);

    return result;
  }

  async listByName(payload: string): Promise<Client | Error> {
    const result = await clientRepository.listByName(payload);

    return result;
  }

  async deleteById(payload: string): Promise<Client | Error> {
    await clientRepository.deleteById(payload);

    return null;
  }

  async updateName(id: string, name: string): Promise<Client | Error> {
    const result = await clientRepository.updateName(id, name);

    return result;
  }
}

export { ClientService };
