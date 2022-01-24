import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
// eslint-disable-next-line import/no-extraneous-dependencies
import Extension from '@joi/date';

const JoiDate = Joi.extend(Extension);

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      name: Joi.string().trim().required(),

      gender: Joi.string().trim().required().valid('M', 'F', 'X'),

      birthdate: JoiDate.date().format('DD/MM/YYYY').required().less(Date.now()),

      cityId: Joi.string().uuid().required()
    });

    const { error } = entity.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
