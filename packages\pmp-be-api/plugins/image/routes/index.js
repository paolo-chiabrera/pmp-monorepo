module.exports = {
  countImages: require('./countImages'),
  countImagesBySource: require('./countImagesBySource'),
  deleteImageByFilename: require('./deleteImageByFilename'),
  deleteImageById: require('./deleteImageById'),
  findExistingImages: require('./findExistingImages'),
  getImageByFilename: require('./getImageByFilename'),
  getImageById: require('./getImageById'),
  getImagesBuckets: require('./getImagesBuckets'),
  getImagesWithoutPalette: require('./getImagesWithoutPalette'),
  getImagesWithoutThumbs: require('./getImagesWithoutThumbs'),
  postImage: require('./postImage'),
  putImageByFilename: require('./putImageByFilename'),
  putBatchImagesByFilename: require('./putBatchImagesByFilename'),
  reindexImages: require('./reindexImages')
};
