'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'POST',
  path: '/images',
  config: {
    handler: (req, reply) => {
      const { payload } = req;

      methods.createImage({
        payload
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Creates an image',
    notes: 'Returns the image',
    validate: {
      payload: Joi.object().keys({
        filename: Joi.string().required(),
        url: Joi.string().required(),
        source: Joi.string().required(),
        index: Joi.number().optional(),
        thumbs: Joi.array().items(Joi.number()).optional(),
        meta: Joi.object().optional().keys({
          width: Joi.number().optional(),
          height: Joi.number().optional(),
          size: Joi.number().optional(),
          format: Joi.string().optional()
        }),
				palette: Joi.object().optional().keys({
          darkMuted: Joi.object().optional(),
          darkVibrant: Joi.object().optional(),
          lightMuted: Joi.object().optional(),
          lightVibrant: Joi.object().optional(),
          muted: Joi.object().optional(),
          vibrant: Joi.object().optional()
        })
      }).required().description('image data')
    }
  }
};
