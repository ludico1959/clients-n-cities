import { CityRepository } from "../repository/CityRepository";
import { City } from "../entities/City";

const cityRepository = new CityRepository;

export class CityService {
    async create(payload): Promise< City| Error> {
        const result = await cityRepository.create(payload); 
        return result;
    }
}