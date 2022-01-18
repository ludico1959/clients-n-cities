import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { ClientIdNotFound } from '../errors/client/ClientIdNotfound';

class FindClientByIdService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<Client | Error> {
    const result = await this.clientRepository.findById(id);

    if (!result) throw new ClientIdNotFound(id);

    return result;
  }
}

export { FindClientByIdService };
