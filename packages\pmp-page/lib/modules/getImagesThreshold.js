import _ from 'lodash';

export default function getImagesThreshold(args, done = _.noop) {
	const { scrapedImages, validImages } = args;

	done(null, {
		threshold: validImages.length / scrapedImages.length
	});
}
