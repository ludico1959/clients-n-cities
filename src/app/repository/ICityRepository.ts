import { City } from '../entities/City';

interface ICreateCityDTO {
  name: string;
  state: string;
}

interface IListCityByStateDTO {
  page?: number;
  limit?: number;
  state: string;
}

interface ICityRepository {
  create({ name, state }: ICreateCityDTO): Promise<City>;
  listByState({ page, limit, state }: IListCityByStateDTO): Promise<Record<string, unknown>>;
  findByName(name: string): Promise<City>;
}

export { ICityRepository, ICreateCityDTO, IListCityByStateDTO };
