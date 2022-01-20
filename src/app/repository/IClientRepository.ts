import { Client } from '../entities/Client';

interface ICreateClientDTO {
  name: string;
  gender: string;
  birthdate: string;
  age: number;
  cityId: string;
}

interface IClientRepository {
  create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client>;
  find(payload: string): Promise<Client[]>;
  deleteById(id: string): Promise<null>;
  updateName(id: string, name: string): Promise<Client>;
}

export { IClientRepository, ICreateClientDTO };
