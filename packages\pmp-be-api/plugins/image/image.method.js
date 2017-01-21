'use strict';

const _ = require('lodash');

const Image = require('pmp-image-model');

/* export */

module.exports = {
  getById,
  deleteById,
  findExisting,
  getByFilename,
  deleteByFilename,
  create,
  putByFilename,
  getImagesByQuery,
  getSources,
  getImagesWithoutThumbs,
  count,
  countBySource,
  getBuckets,
  reindexImages
};

/* methods */
function getById(args) {
  return Image.findById(args.id).exec();
}

function deleteById(args) {
  return Image.findByIdAndRemove(args.id).exec();
}

function findExisting(args) {
  const key = _.keys(args)[0];
  return Image.find().where(key).in(args[key]).exec();
}

function getByFilename(args) {
  return Image.findOne({
    filename: args.filename
  }).exec();
}

function deleteByFilename(args) {
  return Image.findOneAndRemove({
    filename: args.filename
  }).exec();
}

function create(args) {
  const image = new Image(args.data);
  return image.save();
}

function putByFilename(args) {
  return Image.findOne({
    filename: args.filename
  })
  .exec()
  .then(image => {
    if (_.isNull(image)) {
      return new Error('image does not exist: ' + args.filename);
    }

    _.each(args.data, (val, key) => image[key] = val);

    return image.save();
  });
}

function getImagesByQuery(args) {
  const q = Image.find(args.query, {'__v': 0});
  // if not query is provided, limit the results
  if(_.isEmpty(args.query)) q.limit(50);
  return q.exec();
}

function getSources() {
  return Image.find().distinct('source').exec();
}

function getImagesWithoutThumbs() {
  return Image.find({
    $or: [{
      'thumbs': {
        $exists: false
      }
    },{
      'thumbs.300': false
    },{
      'thumbs.160': false
    }]
  }).exec();
}

function count() {
  return Image.count().exec();
}

function countBySource() {
  return Image.aggregate([{
    $match: {
      'thumbs': {
        $exists: true,
        $gt: []
      }
    }
  },{
    $group: {
      _id: '$source',
      count: {
        $sum: 1
      }
    }
  },{
    $project: {
      _id: 0,
      count: 1,
      source: '$_id'
    }
  }, {
    $sort: {
      source: 1
    }
  }]).exec();
}

function getBuckets() {
  const prom = countBySource();

  return prom.then(groups => {
    if (_.isEmpty(groups)) {
      return [];
    }

    const totImages = _.sumBy(groups, 'count');

    let totSize = 0;

    return _.map(groups, group => {
      group.offset = totSize;
      group.size = Math.floor(group.count / totImages * 100);
      totSize += group.size;
      return group;
    });
  });
}

function reindexImages(progress) {
  const prom = getBuckets();

  const trackProgress = _.isFunction(progress) ? progress : function(){};

  return prom.then(groups => {
    const cursor = Image.find({
      'thumbs': {
        $exists: true,
        $gt: []
      }
    }).sort([
      ['source', 1], ['createdAt', -1]
    ]).cursor();

    let config = {};

    // init counters
    const counters = _.chain(groups).map('source').reduce((acc, source) => {
      acc[source] = 0;
      return acc;
    }, {}).value();

    const bucketSize = _.sumBy(groups, 'size');
    const totalImages = _.sumBy(groups, 'count');

    return cursor.eachAsync(image => {
      if (image.source !== config.source) {
        config = _.find(groups, {source: image.source});
      }

      const bucketNumber = Math.floor(counters[image.source] / config.size);

      const position = counters[image.source] % config.size;

      image.sortIndex = config.offset + (bucketNumber * bucketSize) + position;

      counters[image.source]++;

      trackProgress(totalImages, counters);

      return image.save();
    }).then(() => counters);
  });
}
