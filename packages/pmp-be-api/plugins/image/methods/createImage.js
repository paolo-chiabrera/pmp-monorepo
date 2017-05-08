'use strict';

const Image = require('pmp-image-model');

module.exports = function createImage(args,done) {
	const { payload } = args;

  const image = new Image(payload);

  return image.save(done);
};
