'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/id/{id}',
  config: {
    handler: (req, reply) => {
      const { id } = req.params;

      methods.getImageById({
        id
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Get an image',
    notes: 'Returns the image',
    validate: {
      params: {
        id: Joi.string().required().description('id of the image')
      }
    }
  }
};
