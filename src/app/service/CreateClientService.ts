import { Client } from '../entities/Client';
import { Age } from '../middleware/calculateAge';
import { IClientRepository } from '../repository/IClientRepository';

const calcage = new Age();

// DTO - Data Transfer Object
interface IRequest {
  name: string;
  gender: string;
  birthdate: Date;
  age: number;
  cityId: string;
}

class CreateClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute({ name, gender, birthdate, cityId }: IRequest): Promise<Client | Error> {
    const age = calcage.calculateAge(birthdate);

    const result = await this.clientRepository.create({ name, gender, birthdate, age, cityId });

    return result;
  }
}

export { CreateClientService };
