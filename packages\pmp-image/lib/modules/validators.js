import Joi from 'joi';

export default {
  link: Joi.string(),
  links: Joi.array().items(Joi.string()).min(1),
  meta: Joi.object().min(1).optional().keys({
    width: Joi.number().optional(),
    height: Joi.number().optional(),
    format: Joi.string().optional(),
    size: Joi.number().optional()
  }),
  options: Joi.object().keys({
    concurrency: Joi.number().min(1).default(1).optional(),
    dimensions: Joi.array().items(Joi.number()).min(1).default([150, 300]).optional(),
    folderPath: Joi.string().default('./images').optional(),
    pmpApiUrl: Joi.string().default('http://api.picmeplease.eu').optional(),
    request: Joi.object().keys({
      json: Joi.boolean().default(true).optional(),
      headers: Joi.object().optional()
    }).optional()
  }).optional(),
  retryInterval: Joi.number().min(1).default(1000).optional(),
  sourceId: Joi.string().required()
};
