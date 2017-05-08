'use strict';

const _ = require('lodash');

const routes = require('./source.route');

exports.register = function (server, options, next) {

  // add all the routes exposed by the plugin
  _.each(routes, route => server.route(route));

  next();
};

exports.register.attributes = {
  name: 'pmp-source-api'
};
