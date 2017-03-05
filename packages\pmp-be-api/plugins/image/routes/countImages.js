'use strict';

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
  method: 'GET',
  path: '/images/count',
  config: {
    handler: (req, reply) => {
      methods.countImages((err, res) => responseHelper(err, res, reply));
		},
    tags: ['api', 'image'],
    description: 'Count all the images',
    notes: 'Returns the count'
  }
};
