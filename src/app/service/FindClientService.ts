import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { NotFound } from '../errors';

class FindClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(payload: Record<string, unknown>): Promise<Client[] | Error> {
    const result = await this.clientRepository.find(payload);

    if (!result.length) throw new NotFound('Client not found');

    return result;
  }
}

export { FindClientService };
