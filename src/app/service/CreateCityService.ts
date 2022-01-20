import { City } from '../entities/City';
import { ICityRepository } from '../repository/ICityRepository';
import { AlreadyExists } from '../errors';

interface IRequest {
  name: string;
  state: string;
}

class CreateCityService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(payload: IRequest): Promise<City> {
    const checkIfCityAlreadyExists = await this.cityRepository.findOne(payload);

    if (checkIfCityAlreadyExists) throw new AlreadyExists('City already exist');

    const result = await this.cityRepository.create(payload);

    return result;
  }
}

export { CreateCityService };
