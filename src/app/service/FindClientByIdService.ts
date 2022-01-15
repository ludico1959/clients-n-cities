import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { FormatDate } from '../middleware/formatDate';
import { ClientIdNotFound } from '../errors/client/ClientIdNotfound';

const formatDate = new FormatDate();

class FindClientByIdService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string): Promise<Client | Error> {
    const result = await this.clientRepository.findByName(id);

    if (!result) throw new ClientIdNotFound(id);

    Object.assign(result, {
      birthdate: formatDate.formatDateToRequest(result.birthdate)
    });

    return result;
  }
}

export { FindClientByIdService };
