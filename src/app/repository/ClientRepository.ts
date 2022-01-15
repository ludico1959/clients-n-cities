import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import { IClientRepository, ICreateClientDTO } from './IClientRepository';

class ClientRepository implements IClientRepository {
  async create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client> {
    const repo = getRepository(Client);
    const client = repo.create({ name, gender, birthdate, age, cityId });

    await repo.save(client);

    return client;
  }

  async findById(id: string): Promise<Client> {
    const repo = getRepository(Client);

    const client = await repo.findOne({ id });

    return client;
  }

  async findByName(name: string): Promise<Client> {
    const repo = getRepository(Client);

    const client = await repo.findOne({ name });

    return client;
  }

  async deleteById(id: string): Promise<null> {
    const repo = getRepository(Client);

    await repo.delete(id);

    return null;
  }

  async updateName(id: string, name: string): Promise<Client> {
    const repo = getRepository(Client);

    const client = await repo.findOne({ id });

    client.name = name;

    await repo.save(client);

    return client;
  }
}

export { ClientRepository };
