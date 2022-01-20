import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { NotFound } from '../errors';

class DeleteClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<Client | Error> {
    const result = await this.clientRepository.deleteById(id);

    if (!result) throw new NotFound('Client not found');

    return null;
  }
}

export { DeleteClientService };
