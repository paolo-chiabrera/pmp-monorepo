import _ from 'lodash';
import needle from 'needle';

function getSourceById(args, done = _.noop) {
	const { options, sourceId } = args;
	const { pmpApiUrl, request } = options;

	const url = `${ pmpApiUrl }/sources/${ sourceId }`;

	needle.get(url, request, (err, res) => {
		if (err) {
			done(err);
			return;
		}

		if (res.statusCode !== 200) {
			done(new Error('wrong statusCode ' + res.statusCode));
			return;
		}

		if (!_.isObject(res.body) || _.isEmpty(res.body)) {
			done(new Error(`source not found: ${ sourceId }`));
			return;
		}

		done(null, {
			source: res.body
		});
	});
}

export default {
	getSourceById
}
