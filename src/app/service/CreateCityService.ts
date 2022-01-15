import { City } from '../entities/City';
import { ICityRepository } from '../repository/ICityRepository';

interface IRequest {
  name: string;
  state: string;
}

class CreateCityService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute({ name, state }: IRequest): Promise<City> {
    const result = this.cityRepository.create({ name, state });

    return result;
  }
}

export { CreateCityService };
