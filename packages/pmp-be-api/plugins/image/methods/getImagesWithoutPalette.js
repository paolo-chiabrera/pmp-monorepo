'use strict';

const Image = require('pmp-image-model');

module.exports = function getImagesWithoutPalette(args, done) {
	const { limit } = args;

	return Image
	.find({
		$or: [{
			'palette': {
				$exists: false
			}
		},{
			$and: [{
				'palette.vibrant.population': -1
			},{
				'palette.muted.population': -1
			},{
				'palette.lightVibrant.population': -1
			},{
				'palette.lightMuted.population': -1
			},{
				'palette.darkVibrant.population': -1
			},{
				'palette.darkMuted.population': -1
			}]
		}]
	}, {
		'filename': 1
	})
	.limit(limit || 0)
	.exec(done);
};
