import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { NotFound } from '../errors';

class UpdateClientName {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string, name: string): Promise<Client | Error> {
    const result = await this.clientRepository.updateName(id, name);

    if (!result) throw new NotFound('Client not found');

    return result;
  }
}

export { UpdateClientName };
