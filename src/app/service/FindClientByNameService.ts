import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { ClientNameNotFound } from '../errors/client/ClientNameNotfound';

class FindClientByNameService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(name: string): Promise<Client | Error> {
    const result = await this.clientRepository.findByName(name);

    if (!result) throw new ClientNameNotFound(name);

    return result;
  }
}

export { FindClientByNameService };
