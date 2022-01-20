import { IClientRepository, IFindClientDTO } from '../repository/IClientRepository';
import { NotFound } from '../errors';

class FindClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(payload: IFindClientDTO): Promise<Record<string, unknown>> {
    const result = await this.clientRepository.find(payload);

    if (result.totalClients === 0) throw new NotFound('Client not found');

    return result;
  }
}

export { FindClientService };
