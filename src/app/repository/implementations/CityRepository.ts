import { getConnection } from 'typeorm';
import { City } from '../../entities/City';
import { ICityRepository, ICreateCityDTO, IListCityByStateDTO } from '../ICityRepository';

class CityRepository implements ICityRepository {
  async create({ name, state }: ICreateCityDTO): Promise<City> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);
    const city = repo.create({ name, state });

    await repo.save(city);

    return city;
  }

  async listByState({ page = 1, limit = 2, state }: IListCityByStateDTO): Promise<Record<string, unknown>> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);

    const [list, count] = await repo.findAndCount({
      where: {
        state
      },
      order: {
        name: 'ASC'
      },
      take: limit
    });

    return { list, totalCities: count, limit, offset: page, offsets: Math.ceil(count / limit) };
  }

  async findByName(name: string): Promise<City> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);

    const city = await repo.findOne({ name });

    return city;
  }
}

export { CityRepository };
