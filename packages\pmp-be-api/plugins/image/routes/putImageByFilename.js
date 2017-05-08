'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'PUT',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => {
      const { payload, params } = req;
      const { filename } = params;

      methods.updateImageByFilename({
        filename,
        data: payload
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Updates an image',
    notes: 'Returns the image',
    validate: {
      payload: Joi.object().min(1).required().keys({
        filename: Joi.string().optional(),
        url: Joi.string().optional(),
        source: Joi.string().optional(),
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
      }),
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};
