import { Client } from '../entities/Client';

interface ICreateClientDTO {
  name: string;
  gender: string;
  birthdate: Date;
  age: number;
  cityId: string;
}

interface IClientRepository {
  create({ name, gender, birthdate, age, cityId }: ICreateClientDTO): Promise<Client>;
  findById(id: string): Promise<Client>;
  findByName(name: string): Promise<Client>;
  deleteById(id: string): Promise<null>;
  updateName(id: string, name: string): Promise<Client>;
}

export { IClientRepository, ICreateClientDTO };
