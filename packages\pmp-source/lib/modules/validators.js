import Joi from 'joi';

export default {
  sourceId: Joi.string().required(),
  options: Joi.object().required().keys({
    pmpApiUrl: Joi.string().required(),
    request: Joi.object().required().keys({
      json: Joi.boolean().required(),
      timeout: Joi.number().optional(),
      headers: Joi.object().optional(),
      open_timeout: Joi.number().optional().default(0)
    })
  })
};
