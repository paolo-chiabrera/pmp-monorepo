import _ from 'lodash';
import needle from 'needle';
import async from 'async';

export default function scrapeUrl(args, done = _.noop) {
	const { options, retryInterval, source, targetUrl } = args;
	const { request, scraperApiUrl } = options;
	const { mainPageSelector, mainPageAttribute, imagePageSelector, imagePageAttribute } = source;

	const payload = {
		url: targetUrl,
		selectors: {
			page: `${ mainPageSelector }@${ mainPageAttribute }`,
			image: `${ imagePageSelector }@${ imagePageAttribute }`
		}
	};

	async.retry({
		times: 3,
		interval: retryInterval
	}, next => {
		needle.post(`${ scraperApiUrl }/scrape`, payload, request, (err, res) => {
			if (err) {
				next(err);
				return;
			}

			if (res.statusCode !== 200) {
				next(new Error(`wrong statusCode ${ res.statusCode } ${ res.statusMessage }`));
				return;
			}

			if (!_.isObject(res.body) || _.isEmpty(res.body)) {
				next(new Error('res.body is not valid'));
				return;
			}

			if (!_.isArray(res.body.results)) {
				next(new Error('res.body.results is not an array'));
				return;
			}

			next(null, {
				links: res.body.results
			});
		});
	}, done);
}
