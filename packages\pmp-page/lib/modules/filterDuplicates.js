import needle from 'needle';
import _ from 'lodash';
import async from 'async';

export default function filterDuplicates(args, done = _.noop) {
	const { links, options, retryInterval = 500 } = args;
	const { pmpApiUrl, request } = options;

	const payload = {
		imageUrl: links
	};

	async.retry({
		times: 3,
		interval: retryInterval
	}, next => {
		needle.post(`${ pmpApiUrl }/images/existing`, payload, request, (err, res) => {
			if (err) {
				next(err);
				return;
			}

			if (res.statusCode !== 200) {
				next(new Error(`wrong statusCode ${ res.statusCode } ${ res.statusMessage }`));
				return;
			}

			next(null, {
				links: _.difference(links, _.map(res.body, 'imageUrl'))
			});
		});
	}, done);
}
