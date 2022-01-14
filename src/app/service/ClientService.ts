import { ClientRepository } from '../repository/ClientRepository';
import { Client } from '../entities/Client';
import { Age } from '../middleware/calculateAge';
import { FormatDate } from '../middleware/formatDate';
import { ClientIdNotFound } from '../errors/client/ClientIdNotfound';
import { ClientNameNotFound } from '../errors/client/ClientNameNotfound';

const clientRepository = new ClientRepository();
const age = new Age();
const formatDate = new FormatDate();

type RequestClient = {
  name: string;
  gender: string;
  birthdate: Date;
  age: number;
  cityId: string;
};

class ClientService {
  async create(payload: RequestClient): Promise<Client | Error> {
    const payloadWithAge = payload;

    payloadWithAge.age = age.calculateAge(payload.birthdate);

    const result = await clientRepository.create(payloadWithAge);

    return result;
  }

  async listById(payload: string): Promise<Client | Error> {
    const result = await clientRepository.listById(payload);

    if (!result) throw new ClientIdNotFound(payload);

    result.birthdate = formatDate.formatDateToRequest(result.birthdate);

    return result;
  }

  async listByName(payload: string): Promise<Client | Error> {
    const result = await clientRepository.listByName(payload);

    if (!result) throw new ClientNameNotFound(payload.name);

    result.birthdate = formatDate.formatDateToRequest(result.birthdate);

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
