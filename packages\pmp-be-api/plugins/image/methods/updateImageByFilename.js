'use strict';

const _ = require('lodash');

const Image = require('pmp-image-model');

module.exports = function updateImageByFilename(args, done) {
  const { data, filename } = args;

  Image
  .findOne({
    filename
  })
  .exec((err, image) => {
    if (err) {
      return done(err);
    }

    if (_.isNull(image)) {
      return done(new Error('image does not exist: ' + filename));
    }

    _.each(data, (val, key) => image[key] = val);

    image.save(done);
  });
};
