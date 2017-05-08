'use strict';

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/buckets',
  config: {
    handler: (req, reply) => {
      methods.getImagesBuckets((err, res) => responseHelper(err, res, reply));
    },
    tags: ['api', 'image'],
    description: 'Get all the images buckets'
  }
};
