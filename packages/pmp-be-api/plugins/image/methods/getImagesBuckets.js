'use strict';

const _ = require('lodash');

const countImagesBySource = require('./countImagesBySource');

module.exports = function getImagesBuckets(done) {
  countImagesBySource((err, groups) => {
		if (err) {
			return done(err);
		}

		if (_.isEmpty(groups)) {
      return done(null, []);
    }

    const totImages = _.sumBy(groups, 'count');

    let totSize = 0;

    const result = _.map(groups, group => {
      group.offset = totSize;
      group.size = Math.floor(group.count / totImages * 100);
      totSize += group.size;
      return group;
    });

		done(null, result);
	});
};
