'use strict';

const bcrypt = require('bcryptjs');

exports.register = function (server, options, next) {

  server.auth.strategy('bearer', 'bearer-access-token', {
    allowQueryToken: false,
    allowMultipleHeaders: false,
    validateFunc: (token, callback) => {
      bcrypt.compare(options.bearer.token, token, (err, isValid) => {
        if (err || !isValid) {
          server.log(['error', 'auth', 'bearer'], err, isValid);
        }

        callback(err, isValid, {token: token});
      });
    }
  });

  const users = {};

  users[options.basic.username] = options.basic.pwd;

  server.auth.strategy('basic', 'basic', {
    validateFunc: (request, username, password, callback) => {
      bcrypt.compare(users[username], password, (err, isValid) => {
        if (err || !isValid) {
          server.log(['error', 'auth', 'basic'], err, isValid);
        }

        callback(err, isValid, {username: username});
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'pmp-auth'
};
