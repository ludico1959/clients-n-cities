import { City } from '../entities/City';
import { ICityRepository } from '../repository/ICityRepository';

class FindCityByNameService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(name: string): Promise<City> {
    const result = this.cityRepository.findByName(name);

    return result;
  }
}

export { FindCityByNameService };
