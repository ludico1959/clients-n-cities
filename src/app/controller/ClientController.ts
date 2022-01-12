import { Request, Response } from "express";
import { ClientService } from "../service/ClientService";

const clientService = new ClientService();

class ClientController {
    async create(req: Request, res: Response) {
        try {
            const result = await clientService.create(req.body);

            return res.status(201).json({
                status: "success",
                data: {
                    createdClient: result
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: `${error}`
            });
        }
    }

    async listById(req: Request, res: Response) {
        try {
            const result = await clientService.listById(req.params.id);

            return res.status(200).json({
                status: "success",
                data: {
                    client: result
                }
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: `${error}`
            });
        }
    }

    async listByName(req: Request, res: Response) {
        try {
            const result = await clientService.listByName(req.query);

            return res.status(200).json({
                status: "success",
                data: {
                    client: result
                }
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: `${error}`
            });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            await clientService.deleteById(req.params.id);

            return res.status(204).json({
                status: "success",
                data: null
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: `${error}`
            });
        }
    }

    async updateName(req: Request, res: Response) {
        try {
            const result = await clientService.updateName(req.params.id, req.body.name);

            return res.status(204).json({
                status: "success",
                data: {
                    updatedClient: result
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: `${error}`
            });
        }
    }
}

export { ClientController };