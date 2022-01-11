import { Request, Response } from "express";
import { CityService } from "../service/CityService";

const cityService = new CityService();

class CityController {
    async create(req: Request, res: Response) {
        try {
            const result = await cityService.create(req.body);

            return res.status(201).json({
                status: "success",
                data: {
                    createdCity: result
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: `${error}`
            });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const result = await cityService.list(req.body);

            return res.status(200).json({
                status: "success",
                data: {
                    cities: result
                }
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: `${error}`
            });
        }
    }
}

export { CityController };