'use strict';

const Joi = require('joi');

/* routes */
module.exports.getPage = {
  method: 'GET',
  path: '/images/page/{pageNum}/{pageSize?}',
  config: {
    handler: (req, reply) => {
      req.server.methods.getPage({
        pageNum: req.params.pageNum,
        pageSize: req.params.pageSize
      }, (err, result) => reply(err || result));
    },
    cache: {
      expiresIn: 60 * 60 * 1000,
      privacy: 'public'
    },
    auth: false,
    tags: ['api', 'page'],
    description: 'Get a page',
    notes: 'Returns the page',
    validate: {
      params: {
        pageNum: Joi.number().integer().min(0).default(0).required().description('page number'),
        pageSize: Joi.number().integer().min(10).default(20).optional().description('page size')
      }
    }
  }
};
