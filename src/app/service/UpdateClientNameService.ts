import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { NotFound } from '../errors';

class UpdateClientNameService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string, name: string): Promise<Client | Error> {
    const checkIfClientAlreadyExists = await this.clientRepository.findOne(id);

    if (!checkIfClientAlreadyExists) throw new NotFound('Client not found');

    const result = await this.clientRepository.updateName(id, name);

    return result;
  }
}

export { UpdateClientNameService };
