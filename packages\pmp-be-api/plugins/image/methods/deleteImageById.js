'use strict';

const Image = require('pmp-image-model');

module.exports = function deleteImageById(args, done) {
  return Image.findByIdAndRemove(args.id).exec(done);
};
