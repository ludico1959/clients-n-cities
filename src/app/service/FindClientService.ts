import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';

class FindClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(payload: Record<string, unknown>): Promise<Client[] | Error> {
    const result = await this.clientRepository.find(payload);

    return result;
  }
}

export { FindClientService };
