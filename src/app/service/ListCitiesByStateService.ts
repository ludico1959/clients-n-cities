import { ICityRepository } from '../repository/ICityRepository';

class ListCitiesByStateService {
  constructor(private cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(state: string): Promise<{}> {
    const result = await this.cityRepository.listByState({ state });

    return result;
  }
}

export { ListCitiesByStateService };
