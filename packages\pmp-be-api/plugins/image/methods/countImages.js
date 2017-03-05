'use strict';

const Image = require('pmp-image-model');

module.exports = function countImages(done) {
  return Image
	.count()
	.exec(done);
};
