'use strict';

const _ = require('lodash');

const routes = require('./image.route');

exports.register = function (server, options, next) {
  // add all the routes exposed by the plugin
  _.each(routes, route => server.route(route));

  next();
};

exports.register.attributes = {
  name: 'pmp-image-api'
};
