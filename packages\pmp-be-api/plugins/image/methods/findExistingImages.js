'use strict';

const _ = require('lodash');

const Image = require('pmp-image-model');

module.exports = function findExistingImages(args, done) {
	const { payload } = args;

  const key = _.keys(payload)[0];

  return Image
		.find()
		.where(key)
		.in(payload[key])
		.exec(done);
};
