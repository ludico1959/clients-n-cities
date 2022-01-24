import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { brazilianUF } from '../../utils/enumStates';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      name: Joi.string().trim().optional(),
      state: Joi.string()
        .trim()
        .optional()
        .valid(...Object.values(brazilianUF))
    });

    const { error } = entity.validate(req.query, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
