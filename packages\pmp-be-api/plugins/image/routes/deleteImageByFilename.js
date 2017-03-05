'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'DELETE',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => {
      const { filename } = req.params;

      methods.deleteImageByFilename({
        filename
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Delete an image',
    notes: 'Returns the deleted image',
    validate: {
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};
