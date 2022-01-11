import { ClientRepository } from "../repository/ClientRepository";
import { Client } from "../entities/Client";

const clientRepository = new ClientRepository();

type ClientRequest = {
    name: string;
    sex: string;
    birthdate: Date;
    age: number;
    city_id: string;
}

class ClientService {
    async create(payload: ClientRequest): Promise<Client | Error> {
        const result = await clientRepository.create(payload);

        return result
    }

    async listById(payload: string): Promise<Client | Error> {
        const result = await clientRepository.listById(payload);

        return result
    }
    
    async listByName(payload: Object): Promise<Client | Error> {
        const result = await clientRepository.listByName(payload);

        return result
    }
    
    async deleteById(payload: string): Promise<Client | Error> {
        await clientRepository.deleteById(payload);

        return null;
    }
}

export { ClientService };