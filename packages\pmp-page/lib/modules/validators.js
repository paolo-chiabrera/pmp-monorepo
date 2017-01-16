import Joi from 'joi';

export default {
  links: Joi.array().min(1).required(),
  options: Joi.object().required().keys({
    pmpApiUrl: Joi.string().required(),
    scraperApiUrl: Joi.string().required(),
    request: Joi.object().required().keys({
      json: Joi.boolean().required(),
      timeout: Joi.number().optional(),
      headers: Joi.object().optional(),
      open_timeout: Joi.number().optional().default(0)
    })
  }),
  pageNumber: Joi.number().required(),
  retryInterval: Joi.number().optional().default(500),
  source: Joi.object().required().keys({
    _id: Joi.string().optional(),
    id: Joi.string().required(),
    url: Joi.string().required(),
    offset: Joi.number().required(),
    startingOffset: Joi.number().required(),
    mainPageSelector: Joi.string().required(),
    mainPageAttribute: Joi.string().required(),
    imagePageSelector: Joi.string().required(),
    imagePageAttribute: Joi.string().required(),
    threshold: Joi.number().min(0).max(1).default(0.75).required(),
    schedule: Joi.string().required(),
    active: Joi.boolean().required()
  }),
  sourceId: Joi.string().required()
};
