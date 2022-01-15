import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';

class UpdateClientName {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string, name: string): Promise<Client | Error> {
    const result = await this.clientRepository.updateName(id, name);

    return result;
  }
}

export { UpdateClientName };
