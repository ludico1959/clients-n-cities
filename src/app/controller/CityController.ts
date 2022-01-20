import { Request, Response } from 'express';
import { CityRepository } from '../repository/implementations/CityRepository';
import { CreateCityService } from '../service/CreateCityService';
import { FindCityService } from '../service/FindCityService';

const cityRepository = new CityRepository();
const createCityService = new CreateCityService(cityRepository);
const findCityService = new FindCityService(cityRepository);

class CityController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await createCityService.execute(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const result = await findCityService.execute(req.query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}

export { CityController };
