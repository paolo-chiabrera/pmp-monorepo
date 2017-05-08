'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'POST',
  path: '/images/existing',
  config: {
    handler: (req, reply) => {
      const { payload } = req;

      methods.findExistingImages({
        payload
      }, (err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Get all the duplicates',
    notes: 'Returns the duplicates',
    validate: {
      payload: Joi.object().length(1).required()
    }
  }
};
