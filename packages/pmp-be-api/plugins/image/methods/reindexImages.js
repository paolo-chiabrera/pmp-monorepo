'use strict';

const { chain, find, noop, sumBy } = require('lodash');

const Image = require('pmp-image-model');

const getImagesBuckets = require('./getImagesBuckets');

module.exports = function reindexImages(args, done) {
  const { onProgress = noop } = args;

  getImagesBuckets((err, groups) => {
    let config = {};
    const cursor = Image
    .find({
      'thumbs': {
        $exists: true,
        $gt: []
      }
    })
    .sort([
      ['source', 1], ['createdAt', -1]
    ])
    .cursor();

    // init counters
    const counters = chain(groups)
    .map('source')
    .reduce((acc, source) => {
      acc[source] = 0;
      return acc;
    }, {})
    .value();

    const bucketSize = sumBy(groups, 'size');
    const totalImages = sumBy(groups, 'count');

    cursor.eachAsync(image => {
      if (image.source !== config.source) {
        config = find(groups, {source: image.source});
      }

      const bucketNumber = Math.floor(counters[image.source] / config.size);

      const position = counters[image.source] % config.size;

      image.sortIndex = config.offset + (bucketNumber * bucketSize) + position;

      counters[image.source]++;

      onProgress({
        counters,
        totalImages
      });

      return image.save();
    }).then(() => done(null, counters), done);
  });
};
