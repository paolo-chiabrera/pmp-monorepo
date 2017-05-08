'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/without/thumbs/{limit?}',
  config: {
    handler: (req, reply) => {
      const { limit } = req.params;

      methods.getImagesWithoutThumbs({
        limit
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image', 'thumbs'],
    description: 'Get all the images without thumbs',
    notes: 'Returns an array of images',
    validate: {
      params: {
        limit: Joi.number().default(0).min(0).optional().description('limit results')
      }
    }
  }
};
