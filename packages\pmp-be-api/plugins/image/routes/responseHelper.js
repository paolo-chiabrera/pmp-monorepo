'use strict';

const Boom = require('boom');

module.exports = function responseHelper(err, res, callback) {
  if (err) {
    return callback(Boom.badImplementation(err));
  }

  callback(res);
};
