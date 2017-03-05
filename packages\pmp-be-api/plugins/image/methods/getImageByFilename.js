'use strict';

const Image = require('pmp-image-model');

module.exports = function getImageByFilename(args, done) {
  return Image.findOne({
    filename: args.filename
  }).exec(done);
};
