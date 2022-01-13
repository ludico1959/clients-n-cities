import { getRepository } from 'typeorm';
import { City } from '../entities/City';

type CityRequest = {
  name: string;
  state: string;
};

class CityRepository {
  async create({ name, state }: CityRequest): Promise<City | Error> {
    const repo = getRepository(City);
    const city = repo.create({ name, state });

    await repo.save(city);

    return city;
  }

  async list(payload: CityRequest): Promise<City[] | Error> {
    const repo = getRepository(City);

    const cities = repo.find(payload);

    return cities;
  }
}

export { CityRepository };
