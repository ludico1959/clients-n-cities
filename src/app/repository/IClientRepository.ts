import { Client } from '../entities/Client';

interface ICreateClientDTO {
  name: string;
  gender: string;
  birthdate: string;
  age: number;
  cityId: string;
}

interface IFindClientDTO {
  page?: number;
  limit?: number;
  name?: string;
  id?: string;
}

interface IClientRepository {
  create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client>;
  findOne(payload: string): Promise<Client>;
  find(payload: IFindClientDTO): Promise<Record<string, unknown>>;
  deleteById(id: string): Promise<null>;
  updateName(id: string, name: string): Promise<Client>;
}

export { IClientRepository, ICreateClientDTO, IFindClientDTO };
