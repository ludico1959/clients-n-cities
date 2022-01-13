import { getRepository } from 'typeorm';
import { City } from '../entities/City';

type CityRequest = {
  name: string;
  state: string;
  page: number;
  limit: number;
};

class CityRepository {
  async create({ name, state }: CityRequest): Promise<City | Error> {
    const repo = getRepository(City);
    const city = repo.create({ name, state });

    await repo.save(city);

    return city;
  }

  async list({ page = 1, limit = 2, ...query }): Promise<{} | Error> {
    const repo = getRepository(City);

    const [list, count] = await repo.findAndCount({
      where: query,
      order: {
        name: 'ASC'
      },
      take: limit
    });

    return { list, totalCities: count, limit, offset: page, offsets: Math.ceil(count / limit) };
  }
}

export { CityRepository };
