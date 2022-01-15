import { IClientRepository } from '../repository/IClientRepository';
import { Client } from '../entities/Client';
import { FormatDate } from '../middleware/formatDate';
import { ClientNameNotFound } from '../errors/client/ClientNameNotfound';

const formatDate = new FormatDate();

class FindClientByNameService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(name: string): Promise<Client | Error> {
    const result = await this.clientRepository.findByName(name);

    if (!result) throw new ClientNameNotFound(name);

    Object.assign(result, {
      birthdate: formatDate.formatDateToRequest(result.birthdate)
    });

    return result;
  }
}

export { FindClientByNameService };
