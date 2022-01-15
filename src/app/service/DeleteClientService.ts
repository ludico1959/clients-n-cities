import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';

class DeleteClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<Client | Error> {
    await this.clientRepository.deleteById(id);

    return null;
  }
}

export { DeleteClientService };
