'use strict';

const ENVS = {
  PROD: 'production',
  DEV: 'development',
  TEST: 'test',
  LOCAL: 'local'
};

/*
* force exit
*/
process.on('SIGINT', function() {
  process.exit();
});

/*
* load config
*/
const config = require('./config/config.js').get();

/*
* define app
*/
if (config.trace === true) {
	require('@risingstack/trace');
}

const Hapi = require('hapi');
const Good = require('good');
const Pack = require('./package');

/*
* define logger
*/
const winston = require('winston');
const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true
    })
  ]
});

if (config.env !== ENVS.TEST) {
  logger.add(winston.transports.File, {
    filename: config.winston.file.filename,
    logstash: true,
    maxFiles: 10,
    maxsize: 2 * 1024 * 1024,
    tailable: true,
    zippedArchive: false
  });
}

const server = new Hapi.Server({
  connections: {
    routes: {
      security: true,
      cors: true
    }
  }
});

server.connection({
  port: config.port
});

/*
* routes
*/
server.route({
  method: 'GET',
  path: '/',
	config: {
		handler: (request, reply) => {
      reply({
				name: Pack.name,
				version: Pack.version
			});
		}
	}
});

/*
* register plugins
*/
const reporters = {
  winston: [
    {
      module: 'good-squeeze',
      name: 'Squeeze',
      args: config.squeeze.args
    }, {
      module: 'good-winston-object',
      args: [logger]
    }]
  };

  server.register([{
    register: Good,
    options: {
      ops: {
        interval: 5 * 60000 // 5 mins
      },
      reporters: reporters
    }
  }, {
    register: require('blipp'),
    options: {
      showAuth: true,
      showStart: config.bleep.showStart
    }
  }, {
    register: require('hapi-auth-basic')
  }, {
    register: require('hapi-auth-bearer-token')
  }, {
    register: require('./plugins/mongoose/mongoose.plugin'),
    options: config.mongoose
  }, {
    register: require('./plugins/auth/auth.plugin'),
    options: config.auth

  }, {
    register: require('./plugins/source/source.plugin')
  }, {
    register: require('./plugins/image/image.plugin')
  }, {
    register: require('inert')
  }, {
    register: require('vision')
  }, {
    register: require('hapi-swagger'),
    options: {
      schemes: ['http'],
      auth: config.auth.basic.active ? 'basic' : false,
      host: config.host + (config.env !== ENVS.LOCAL ? '' : ':' + config.port), // fix swagger issue with port and urls
      documentationPage: true,
      swaggerUI: true,
      documentationPath: '/docs',
      securityDefinitions: {
        apiKey: {
          'type': 'apiKey',
          'description': 'desc',
          'name': 'Authorization',
          'in': 'header'
        }
      },
      tags: [{
        name: 'image'
      }, {
        name: 'source'
      }],
      info: {
        title: 'PMP-BE API Documentation',
        version: Pack.version
      }
    }
  }], (err) => {

    server.log(['info', 'reporters'], {
      reporters: Object.keys(reporters)
    });

    server.log(['info', 'config'], config);

    if (err) {
      throw err; // something bad happened loading the plugin
    }

    if (config.auth.bearer.active) {
      server.auth.default('bearer');
    }

    server.start((err) => {
      if (err) {
        throw err;
      }

      server.log('info', 'Server running at: ' + server.info.uri);
    });
  });

  module.exports = server;
