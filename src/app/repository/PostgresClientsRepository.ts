import { Client } from '../entities/Client';
import { IClientRepository, ICreateClientDTO } from './IClientRepository';

class PostgresClientsRepository implements IClientRepository {
  create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client> {
    console.log(name, gender, birthdate, age, cityId);

    return null;
  }

  findById(id: string): Promise<Client> {
    console.log(id);

    return null;
  }

  findByName(name: string): Promise<Client> {
    console.log(name);

    return null;
  }

  deleteById(id: string): null {
    console.log(id);

    return null;
  }

  updateName(id: string, name: string): Promise<Client> {
    console.log(id, name);

    return null;
  }
}

export { PostgresClientsRepository };
