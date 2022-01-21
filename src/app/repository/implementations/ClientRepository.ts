import { getConnection } from 'typeorm';
import { Client } from '../../entities/Client';
import { IClientRepository, ICreateClientDTO, IFindClientDTO } from '../IClientRepository';

class ClientRepository implements IClientRepository {
  async create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);
    const client = repo.create({ name, gender, birthdate, age, cityId });

    await repo.save(client);

    return client;
  }

  async findOne(payload: any): Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);

    const client = await repo.findOne(payload);

    return client;
  }

  async find(payload: IFindClientDTO): Promise<Record<string, unknown>> {
    const limit = payload.limit ? payload.limit : 4;
    const page = payload.page ? payload.page : 1;
    const skip = (page - 1) * limit;

    const personalInformation = payload;
    delete personalInformation.limit;
    delete personalInformation.page;

    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);

    const [list, count] = await repo.findAndCount({
      where: personalInformation,
      order: {
        name: 'ASC'
      },
      take: limit,
      skip
    });

    return { result: list, totalClients: count, limit, offset: page, offsets: Math.ceil(count / limit) };
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
