import { Client } from '../entities/Client';
import { GetAge } from '../utils/calculateAge';
import { IClientRepository } from '../repository/IClientRepository';
import { AlreadyExists } from '../errors';

const getAge = new GetAge();

// DTO - Data Transfer Object
interface IRequest {
  name: string;
  gender: string;
  birthdate: string;
  age: number;
  cityId: string;
}

class CreateClientService {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute({ name, gender, birthdate, cityId }: IRequest): Promise<Client> {
    const checkIfClientAlreadyExists = await this.clientRepository.findOne({ name });

    if (checkIfClientAlreadyExists) throw new AlreadyExists('Clients already exist');

    const result = await this.clientRepository.create({ name, gender, birthdate, cityId });

    result.age = getAge.calculateAge(birthdate);

    return result;
  }
}

export { CreateClientService };
