import async from 'async';
import Joi from 'joi';

import main from './modules/main';
import validators from './modules/validators';

function scrape (args, done) {
  const schema = Joi.object().required().keys({
    pageNumber: validators.pageNumber,
    options: validators.options,
    source: validators.source
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    async.auto({
      getPageUrl: (next) => {
        main.getPageUrl({
          pageNumber: val.pageNumber,
          source: val.source
        }, next);
      },
      scrapeUrl: ['getPageUrl', (results, next) => {
        main.scrapeUrl({
          options: val.options,
          source: val.source,
          targetUrl: results.getPageUrl.url
        }, next);
      }],
      filterLinks: ['scrapeUrl', (results, next) => {
        main.filterLinks({
          links: results.scrapeUrl.results
        }, next);
      }],
      filterDuplicates: ['filterLinks', (results, next) => {
        main.filterDuplicates({
          links: results.filterLinks.links,
          options: val.options
        }, next);
      }],
      getImagesThreshold: ['filterDuplicates', (results, next) => {
        main.getImagesThreshold({
          scrapedImages: results.scrapeUrl.results,
          validImages: results.filterDuplicates.links
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
  });
}

export default {
  scrape
}
