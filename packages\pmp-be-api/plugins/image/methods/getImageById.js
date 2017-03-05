'use strict';

const Image = require('pmp-image-model');

module.exports = function getImageById(args, done) {
  return Image
		.findById(args.id)
		.exec(done);
};
