'user strict';

const Lab = require('lab');
const expect = require('code').expect;

const lab = exports.lab = Lab.script();

const methods = require('../../../plugins/source/source.method');

lab.experiment('source.method', () => {

  lab.test('it should be an obejct', (done) => {
    expect(methods).to.be.an.object();
    done();
  });

  lab.experiment('getAll', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getAll).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getAll();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getAllActive', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getAllActive).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getAllActive();

      expect(prom).to.be.an.object();
      expect(prom.then).to.be.a.function();
      done();
    });
  });

  lab.experiment('getById', () => {
    lab.test('it should be defined', (done) => {
      expect(methods.getById).to.be.a.function();
      done();
    });

    lab.test('it should return a promise', (done) => {
      const prom = methods.getById({
        id: 1
      });

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
});
