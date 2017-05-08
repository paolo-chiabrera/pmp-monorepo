import _ from 'lodash';
import async from 'async';

import main from './modules/main';

function scrape (args, done = _.noop) {
	const { options, pageNumber, source } = args;

	async.auto({
		getPageUrl: (next) => {
			main.getPageUrl({
				pageNumber,
				source
			}, next);
		},
		scrapeUrl: ['getPageUrl', (results, next) => {
			const { url } = results.getPageUrl;

			main.scrapeUrl({
				options,
				source,
				targetUrl: url
			}, next);
		}],
		filterLinks: ['scrapeUrl', (results, next) => {
			const { links } = results.scrapeUrl;

			main.filterLinks({
				links
			}, next);
		}],
		filterDuplicates: ['filterLinks', (results, next) => {
			const { links } = results.filterLinks;

			main.filterDuplicates({
				links,
				options
			}, next);
		}],
		getImagesThreshold: ['filterDuplicates', (results, next) => {
			const { filterDuplicates, scrapeUrl } = results;

			main.getImagesThreshold({
				scrapedImages: scrapeUrl.links,
				validImages: filterDuplicates.links
			}, next);
		}]
	}, (err, results) => {
		if (err) {
			done(err);
			return;
		}

		done(null, {
			links: results.filterDuplicates.links,
			pageUrl: results.getPageUrl.url,
			threshold: results.getImagesThreshold.threshold
		});
	});
}

export default {
  scrape
}
