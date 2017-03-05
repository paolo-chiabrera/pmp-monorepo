'use strict';

const methods = require('../methods');

const INTERVAL = 100;

module.exports = {
	method: 'POST',
	path: '/images/reindex',
	config: {
		handler: (req, reply) => {
			let count = 0;

			function onProgress(args) {
				const { counters, totalImages } = args;

				if (count % INTERVAL === 0) {
					req.server.log(['info', 'reindex-progress'], {
						count,
						counters,
						totalImages,
						percentage: Math.floor((count / totalImages) * 100)
					});
				}
				count++;
			}

			req.server.log(['info', 'reindex-start']);

			const start = Date.now();

			methods.reindexImages({
				onProgress
			}, (err, counters) => {
				if (err) {
					return req.server.log(['error', 'reindex-error'], {
						err
					});
				}

				req.server.log(['info', 'reindex-end'], {
					counters,
					execTime: Math.floor((Date.now() - start) / 1000)
				})
			});

			reply({message: 'reindex started'});
		},
		tags: ['api', 'image'],
		description: 'Reindex all the images with thumbs'
	}
};
