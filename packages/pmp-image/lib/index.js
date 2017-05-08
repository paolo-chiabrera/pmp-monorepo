import _ from 'lodash';
import async from 'async';

import main from './modules/main';

function save (args, done = _.noop) {
	const { options, sourceId, url } = args;
	const { folderPath } = options;

	async.auto({
		generateFilename: next => {
			main.generateFilename({
				url,
				sourceId
			}, next);
		},
		saveAsFile: ['generateFilename', (results, next) => {
			const { filename } = results.generateFilename;

			main.saveAsFile({
				url,
				filename,
				folderPath
			}, next);
		}],
		storeOnDB: ['saveAsFile', (results, next) => {
			const { filename } = results.generateFilename;

			main.storeOnDB({
				sourceId,
				filename,
				url,
				options
			}, next);
		}]
	}, (err, results) => {
		if (err) {
			done(err);
			return;
		}

		done(null, results.storeOnDB.image);
	});
}

function saveBatch (args, done = _.noop) {
	const { links, options, sourceId } = args;
	const { concurrency = 2 } = options;

	const out = {
		errors: [],
		images: []
	};

	async.eachLimit(links, concurrency, (url, next) => {
		this.save({
			options,
			sourceId,
			url
		}, (err, image) => {
			if (err) {
				out.errors.push({
					message: err.message,
					url
				});
			} else {
				out.images.push(_.pick(image, ['filename', 'url']));
			}

			next(null);
		});
	}, err => {
		if (err) {
			return done(err);
		}

		done(null, out);
	});
}

export default {
	save,
	saveBatch
};
