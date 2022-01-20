import { getConnection } from 'typeorm';
import { Client } from '../../entities/Client';
import { IClientRepository, ICreateClientDTO } from '../IClientRepository';

class ClientRepository implements IClientRepository {
  async create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);
    const client = repo.create({ name, gender, birthdate, age, cityId });

    await repo.save(client);

    return client;
  }

  async find(payload: Record<string, unknown>): Promise<Client[]> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);

    const client = await repo.find(payload);

    return client;
  }

  async deleteById(id: string): Promise<null> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);

    await repo.delete(id);

    return null;
  }

  async updateName(id: string, name: string): Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);

    const client = await repo.findOne({ id });

    client.name = name;

    await repo.save(client);

    return client;
  }
}

export { ClientRepository };
