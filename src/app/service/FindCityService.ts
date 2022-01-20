import { ICityRepository, IFindCityDTO } from '../repository/ICityRepository';
import { NotFound } from '../errors';

class FindCityService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(payload: IFindCityDTO): Promise<Record<string, unknown>> {
    const result = await this.cityRepository.find(payload);

    if (result.totalCities === 0) throw new NotFound('City not found');

    return result;
  }
}

export { FindCityService };
