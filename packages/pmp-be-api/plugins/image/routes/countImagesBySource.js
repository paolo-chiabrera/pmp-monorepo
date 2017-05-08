'use strict';

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/countBySource',
  config: {
    handler: (req, reply) => {
      methods.countImagesBySource((err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Returns the number of images grouped by source',
    notes: 'Returns the counts'
  }
};
