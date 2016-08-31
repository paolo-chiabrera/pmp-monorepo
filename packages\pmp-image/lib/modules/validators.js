import Joi from 'joi';

export default {
  sourceId: Joi.string().required(),
  options: Joi.object().required().keys({
    pmpApiUrl: Joi.string().required(),
    folderPath: Joi.string().required(),
    dimensions: Joi.array().items(Joi.number()).min(1).required(),
    request: Joi.object().required().keys({
      json: Joi.boolean().required(),
      headers: Joi.object().optional()
    })
  }),
  meta: Joi.object().min(1).optional().keys({
    width: Joi.number().optional(),
    height: Joi.number().optional(),
    format: Joi.string().optional(),
    size: Joi.number().optional()
  }),
  retryInterval: Joi.number().min(1).default(1000).optional()
};
