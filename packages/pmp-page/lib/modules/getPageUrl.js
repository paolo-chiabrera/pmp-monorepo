import _ from 'lodash';

export default function getPageUrl(args, done = _.noop) {
	const { pageNumber, source } = args;
	const { offset, startingOffset, url } = source;

	const _offset = startingOffset + offset * pageNumber;

	done(null, {
		url: url.replace('{{offset}}', _offset)
	});
}
