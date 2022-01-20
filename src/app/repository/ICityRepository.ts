import { City } from '../entities/City';

interface ICreateCityDTO {
  name: string;
  state: string;
}

interface IFindCityDTO {
  page?: number;
  limit?: number;
  name?: string;
  state?: string;
}

interface ICityRepository {
  create({ name, state }: ICreateCityDTO): Promise<City>;
  find({ page, limit, name, state }: IFindCityDTO): Promise<Record<string, unknown>>;
}

export { ICityRepository, ICreateCityDTO, IFindCityDTO };
