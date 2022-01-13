import { CityRepository } from '../repository/CityRepository';
import { City } from '../entities/City';

const cityRepository = new CityRepository();

type CityRequest = {
  name: string;
  state: string;
  page: number;
  limit: number;
};

export class CityService {
  async create(payload: CityRequest): Promise<City | Error> {
    const result = await cityRepository.create(payload);
    return result;
  }

  async list(payload: CityRequest): Promise<{} | Error> {
    const result = await cityRepository.list(payload);

    return result;
  }
}
