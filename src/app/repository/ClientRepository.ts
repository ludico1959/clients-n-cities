import { getRepository } from "typeorm";
import { Client } from "../entities/Client";

type ClientRequest = {
    name: string;
    sex: string;
    birthdate: Date;
    age: number;
    city_id: string;
}

class ClientRepository {
    async create({ name, sex, birthdate, age, city_id }: ClientRequest): Promise<Client | Error> {
        const repo = getRepository(Client);
        const client = repo.create({ name, sex, birthdate, age, city_id });

        await repo.save(client); 

        return client;
    }

    async listById(payload: string): Promise<Client | Error> {
        const repo = getRepository(Client);

        const client = repo.findOne(payload);

        return client;
    }

    async listByName(payload: Object): Promise<Client | Error> {
        const repo = getRepository(Client);

        const client = repo.findOne(payload);

        return client;
    }

    async deleteById(payload: string): Promise<Client | Error> {
        const repo = getRepository(Client);

        repo.delete(payload);

        return null;
    }
}

export { ClientRepository };