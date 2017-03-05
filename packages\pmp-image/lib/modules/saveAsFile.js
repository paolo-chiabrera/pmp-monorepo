import path from 'path';
import needle from 'needle';
import fs from 'fs';
import async from 'async';

export default function saveAsFile(args, done) {
	const { folderPath, filename, retryInterval, url } = args;

	const filePath = path.resolve(folderPath, filename);

	async.retry({
		times: 3,
		interval: retryInterval
	}, next => {
		needle.get(url, {
			output: filePath
		}, (err, res) => {
			if (err) {
				next(err);
				return;
			}

			if (res.statusCode !== 200) {
				next(res.body);
				return;
			}

			if (parseInt(res.bytes) <= 0) {
				fs.unlink(filePath, err => {
					if (err) {
						next(err);
						return;
					}

					next(new Error('response bytes ' + res.bytes));
				});
				return;
			}

			next(null, {
				filePath: filePath
			});
		});
	}, done);
}
