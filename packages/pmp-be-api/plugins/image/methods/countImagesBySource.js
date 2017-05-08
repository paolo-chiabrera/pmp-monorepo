'use strict';

const Image = require('pmp-image-model');

module.exports = function countImagesBySource(done) {
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
  }]).exec(done);
};
