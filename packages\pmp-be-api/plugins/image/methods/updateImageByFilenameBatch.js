'use strict';

const { eachLimit } = require('async');
const updateImageByFilename = require('./updateImageByFilename');

const CONCURRENCY = 2;

module.exports = function updateImageByFilenameBatch(args, done) {
	const { payload } = args;

	const results = {
		fail: [],
		success: []
	};

	eachLimit(payload, CONCURRENCY, (imagePayload, next) => {
		const { filename } = imagePayload;

		updateImageByFilename(imagePayload, err => {
			if (err) {
				results.fail.push(filename);
				return next(err);
			}

			results.success.push(filename);

			next(null);
		});
	}, err => {
		if (err) {
			return done(err);
		}

		done(null, results);
	});
}
