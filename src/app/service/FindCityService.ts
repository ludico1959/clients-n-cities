import { ICityRepository, IFindCityDTO } from '../repository/ICityRepository';
import { NotFound } from '../errors';

class FindCityService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(payload: IFindCityDTO): Promise<Record<string, unknown>> {
    const result = await this.cityRepository.find(payload);

    if (!result) throw new NotFound('Cities not found');

    return result;
  }
}

export { FindCityService };
