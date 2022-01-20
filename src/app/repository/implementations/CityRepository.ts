import { getConnection } from 'typeorm';
import { City } from '../../entities/City';
import { ICityRepository, ICreateCityDTO, IFindCityDTO } from '../ICityRepository';

class CityRepository implements ICityRepository {
  async create({ name, state }: ICreateCityDTO): Promise<City> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);
    const city = repo.create({ name, state });

    await repo.save(city);

    return city;
  }

  async findOne({ name, state }: ICreateCityDTO): Promise<City> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);

    const city = await repo.findOne({ name, state });

    return city;
  }

  async find(payload: IFindCityDTO): Promise<Record<string, unknown>> {
    const limit = payload.limit ? payload.limit : 4;
    const page = payload.page ? payload.page : 1;
    const skip = (page - 1) * limit;

    const location = payload;
    delete location.limit;
    delete location.page;

    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);

    const [list, count] = await repo.findAndCount({
      where: location,
      order: {
        name: 'ASC'
      },
      take: limit,
      skip
    });

    return { result: list, totalCities: count, limit, offset: page, offsets: Math.ceil(count / limit) };
  }
}

export { CityRepository };
