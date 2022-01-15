import CityRepository from '../repository/CityRepository';
import { City } from '../entities/City';
import { InvalidQuery } from '../errors/city/InvalidQuery';

interface CityRequest {
  name: string;
  state: string;
  page: number;
  limit: number;
}

class CityService {
  async create(payload: CityRequest): Promise<City | Error> {
    const result = await CityRepository.create(payload);
    return result;
  }

  async list(payload: CityRequest): Promise<{} | Error> {
    if (!(payload.name || payload.state)) throw new InvalidQuery();

    const result = await CityRepository.list(payload);

    return result;
  }
}

export { CityService };
