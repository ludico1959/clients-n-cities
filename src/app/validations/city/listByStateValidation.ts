import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      state: Joi.string()
        .required()
        .valid(
          'AC',
          'AL',
          'AP',
          'AM',
          'BA',
          'CE',
          'DF',
          'ES',
          'GO',
          'MA',
          'MT',
          'MS',
          'MG',
          'PA',
          'PB',
          'PR',
          'PE',
          'PI',
          'RJ',
          'RN',
          'RS',
          'RO',
          'RR',
          'SC',
          'SP',
          'SE',
          'TO'
        )
    });

    const { error } = entity.validate(req.param, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(404).json(error);
  }
};
