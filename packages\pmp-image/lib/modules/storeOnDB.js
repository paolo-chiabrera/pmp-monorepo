import needle from 'needle';

export default function storeOnDB(args, done) {
	const { filename, options, sourceId, url } = args;
	const { pmpApiUrl, request } = options;

	const payload = {
		filename,
		url,
		source: sourceId
	};

	needle.post(`${ pmpApiUrl }/images`, payload, request, (err, res) => {
		if (err) {
			done(err);
			return;
		}

		if (res.statusCode !== 200) {
			done(new Error('wrong statusCode ' + res.statusCode + ' ' + JSON.stringify(res.body)));
			return;
		}

		done(null, {
			image: res.body
		});
	});
}
