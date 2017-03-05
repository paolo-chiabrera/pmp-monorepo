'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'DELETE',
  path: '/images/id/{id}',
  config: {
    handler: (req, reply) => {
      const { id } = req.params;

      methods.deleteImageById({
        id
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Delete an image by id',
    notes: 'Returns the deleted image',
    validate: {
      params: {
        id: Joi.string().required().description('id of the image')
      }
    }
  }
};
