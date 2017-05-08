'use strict';

const Image = require('pmp-image-model');

module.exports = function getImagesWithoutThumbs(args, done) {
  const { limit } = args;

	return Image
	.find({
		$or: [{
			'thumbs': {
				$exists: false
			}
		},{
			'thumbs': {
				$size: 0
			}
		}]
	})
	.limit(limit || 0)
	.exec(done);
};
