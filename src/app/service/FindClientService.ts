import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { ClientNameNotFound } from '../errors/client/ClientNameNotfound';

class FindClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(payload: string): Promise<Client[] | Error> {
    const result = await this.clientRepository.find(payload);

    if (!result) throw new ClientNameNotFound(payload);

    return result;
  }
}

export { FindClientService };
