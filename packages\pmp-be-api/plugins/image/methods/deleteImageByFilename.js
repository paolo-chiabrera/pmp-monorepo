'use strict';

const Image = require('pmp-image-model');

module.exports = function deleteImageByFilename(args, done) {
  return Image.findOneAndRemove({
    filename: args.filename
  }).exec(done);
};
