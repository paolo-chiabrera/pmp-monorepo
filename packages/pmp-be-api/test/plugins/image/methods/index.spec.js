'user strict';

const Lab = require('lab');
const expect = require('code').expect;

const lab = exports.lab = Lab.script();

const methods = require('../../../../plugins/image/methods');

lab.experiment('image methods', () => {

  lab.test('it should be an obejct', (done) => {
    expect(methods).to.be.an.object();
    done();
  });

  lab.experiment('should export all the methods', () => {
    lab.test('countImages', (done) => {
      expect(methods.countImages).to.be.a.function();
      done();
    });
    lab.test('countImagesBySource', (done) => {
      expect(methods.countImagesBySource).to.be.a.function();
      done();
    });
    lab.test('createImage', (done) => {
      expect(methods.createImage).to.be.a.function();
      done();
    });
    lab.test('deleteImageByFilename', (done) => {
      expect(methods.deleteImageByFilename).to.be.a.function();
      done();
    });
    lab.test('deleteImageById', (done) => {
      expect(methods.deleteImageById).to.be.a.function();
      done();
    });
    lab.test('findExistingImages', (done) => {
      expect(methods.findExistingImages).to.be.a.function();
      done();
    });
    lab.test('getImageByFilename', (done) => {
      expect(methods.getImageByFilename).to.be.a.function();
      done();
    });
    lab.test('getImageById', (done) => {
      expect(methods.getImageById).to.be.a.function();
      done();
    });
    lab.test('getImagesBuckets', (done) => {
      expect(methods.getImagesBuckets).to.be.a.function();
      done();
    });
    lab.test('getImagesWithoutPalette', (done) => {
      expect(methods.getImagesWithoutPalette).to.be.a.function();
      done();
    });
    lab.test('getImagesWithoutThumbs', (done) => {
      expect(methods.getImagesWithoutThumbs).to.be.a.function();
      done();
    });
    lab.test('reindexImages', (done) => {
      expect(methods.reindexImages).to.be.a.function();
      done();
    });
    lab.test('updateImageByFilename', (done) => {
      expect(methods.updateImageByFilename).to.be.a.function();
      done();
    });
    lab.test('updateImageByFilenameBatch', (done) => {
      expect(methods.updateImageByFilenameBatch).to.be.a.function();
      done();
    });
  });
});
