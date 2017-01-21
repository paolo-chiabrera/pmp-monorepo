'user strict';

const Lab = require('lab');
const expect = require('code').expect;

const lab = exports.lab = Lab.script();

const methods = require('../../../plugins/image/image.method');

lab.experiment('image.method', () => {

  lab.test('it should be an obejct', (done) => {
    expect(methods).to.be.an.object();
    done();
  });

  lab.experiment('getById', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getById).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getById({
        id: null
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('deleteById', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.deleteById).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.deleteById({
        id: null
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('findExisting', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.findExisting).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.findExisting({
        filename: ['abc']
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getByFilename', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getByFilename).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getByFilename({
        filename: ['abc']
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('deleteByFilename', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.deleteByFilename).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.deleteByFilename({
        filename: ['abc']
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('create', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.create).to.be.a.function();
      done();
    });
  });

  lab.experiment('putByFilename', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.putByFilename).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.putByFilename({
        filename: null,
        data: {}
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getImagesByQuery', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getImagesByQuery).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getImagesByQuery({
        filename: ['abc']
      });

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getSources', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getSources).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getSources();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getImagesWithoutThumbs', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getImagesWithoutThumbs).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getImagesWithoutThumbs();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('count', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.count).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.count();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('countBySource', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.countBySource).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.countBySource();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getBuckets', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getBuckets).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getBuckets();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('reindexImages', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.reindexImages).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.reindexImages();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });
});
