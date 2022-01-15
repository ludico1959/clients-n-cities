import { Request, Response } from 'express';
import { CityRepository } from '../repository/CityRepository';
import { CreateCityService } from '../service/CreateCityService';
import { ListCitiesByStateService } from '../service/ListCitiesByStateService';
import { FindCityByNameService } from '../service/FindCityByNameService';

const cityRepository = new CityRepository();
const createCityService = new CreateCityService(cityRepository);
const listCitiesByStateService = new ListCitiesByStateService(cityRepository);
const findCityByNameService = new FindCityByNameService(cityRepository);

class CityController {
  async create(req: Request, res: Response) {
    try {
      const result = await createCityService.execute(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          createdCity: result
        }
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async listByState(req: Request, res: Response) {
    try {
      const result = await listCitiesByStateService.execute(req.params.state);

      return res.status(200).json({
        status: 'success',
        data: {
          cities: result
        }
      });
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async findByName(req: Request, res: Response) {
    try {
      const result = await findCityByNameService.execute(req.params.name);

      return res.status(200).json({
        status: 'success',
        data: {
          cities: result
        }
      });
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}

export { CityController };
