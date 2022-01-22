import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      cityId: Joi.string().uuid(),
      name: Joi.string().trim(),
      gender: Joi.string().trim(),
      birthdate: Joi.string().trim
    });

    const { error } = entity.validate(req.query, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
