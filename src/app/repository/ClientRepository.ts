import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';

type RequestClient = {
  name: string;
  gender: string;
  birthdate: Date;
  age: number;
  cityId: string;
};

class ClientRepository {
  async create({ name, gender, birthdate, age, cityId }: RequestClient): Promise<Client | Error> {
    const repo = getRepository(Client);
    const client = repo.create({ name, gender, birthdate, age, cityId });

    await repo.save(client);

    return client;
  }

  async listById(payload: string): Promise<Client | Error> {
    const repo = getRepository(Client);

    const client = repo.findOne(payload);

    return client;
  }

  async listByName(payload: string): Promise<Client | Error> {
    const repo = getRepository(Client);

    const client = repo.findOne(payload);

    return client;
  }

  async deleteById(payload: string): Promise<null | Error> {
    const repo = getRepository(Client);

    repo.delete(payload);

    return null;
  }

  async updateName(id: string, name: string): Promise<Client | Error> {
    const repo = getRepository(Client);

    const client = await repo.findOne(id);

    client.name = name || client.name;

    await repo.save(client);

    return client;
  }
}

export { ClientRepository };
