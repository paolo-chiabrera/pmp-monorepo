'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => {
      const { filename } = req.params;

      methods.getImageByFilename({
        filename
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Get an image',
    notes: 'Returns the image',
    validate: {
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};
