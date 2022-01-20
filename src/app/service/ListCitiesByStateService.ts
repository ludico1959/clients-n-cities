import { ICityRepository } from '../repository/ICityRepository';

class ListCitiesByStateService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(state: string): Promise<Record<string, unknown>> {
    const result = await this.cityRepository.listByState({ state });

    return result;
  }
}

export { ListCitiesByStateService };
