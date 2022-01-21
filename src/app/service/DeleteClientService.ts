import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { NotFound } from '../errors';

class DeleteClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<Client | Error> {
    const checkIfClientAlreadyExists = await this.clientRepository.findOne({ id });

    if (!checkIfClientAlreadyExists) throw new NotFound('Client not found');

    await this.clientRepository.deleteById(id);

    return null;
  }
}

export { DeleteClientService };
