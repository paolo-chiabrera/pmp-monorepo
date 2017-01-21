'use strict';

const Joi = require('joi');

const methods = require('./source.method');

/* routes */

module.exports.getAll = {
  method: 'GET',
  path: '/sources',
  config: {
    handler: (req, reply) => reply(methods.getAll()),
    tags: ['api', 'source'],
    description: 'Get all the sources',
    notes: 'Returns the sources'
  }
};

module.exports.getAllActive = {
  method: 'GET',
  path: '/sources/active',
  config: {
    handler: (req, reply) => reply(methods.getAllActive()),
    tags: ['api', 'source'],
    description: 'Get all the active sources',
    notes: 'Returns the sources'
  }
};

module.exports.getById = {
  method: 'GET',
  path: '/sources/{id}',
  config: {
    handler: (req, reply) => reply(methods.getById({
      id: req.params.id
    })),
    tags: ['api', 'source'],
    description: 'Get the source',
    notes: 'Returns the source',
    validate: {
      params: {
        id: Joi
        .string()
        .required()
        .description('id of the source')
      }
    }
  }
};

module.exports.count = {
  method: 'GET',
  path: '/sources/count',
  config: {
    handler: (req, reply) => reply(methods.count()),
    tags: ['api', 'source'],
    description: 'Count all the sources',
    notes: 'Returns the count'
  }
};
