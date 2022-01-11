import { CityRepository } from "../repository/CityRepository";
import { City } from "../entities/City";

const cityRepository = new CityRepository;

type CityRequest = {
    name: string;
    state: string;
}

export class CityService {
    async create(payload: CityRequest): Promise<City| Error> {
        const result = await cityRepository.create(payload); 
        return result;
    }

    async listAll(payload: CityRequest): Promise<City[] | Error> {
        const result = await cityRepository.listAll(payload);

        return result;
    }
}