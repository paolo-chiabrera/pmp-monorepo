'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/without/palette/{limit?}',
  config: {
    handler: (req, reply) => {
      const { limit } = req.params;

      methods.getImagesWithoutPalette({
        limit
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image', 'palette'],
    description: 'Get all images without palette',
    notes: 'Returns an array of filenames',
    validate: {
      params: {
        limit: Joi.number().default(0).min(0).optional().description('limit results')
      }
    }
  }
};
