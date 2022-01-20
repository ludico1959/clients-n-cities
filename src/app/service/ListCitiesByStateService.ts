import { ICityRepository } from '../repository/ICityRepository';
import { NotFound } from '../errors';

class ListCitiesByStateService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(state: string): Promise<Record<string, unknown>> {
    const result = await this.cityRepository.listByState({ state });

    if (!result) throw new NotFound('Cities not found');

    return result;
  }
}

export { ListCitiesByStateService };
