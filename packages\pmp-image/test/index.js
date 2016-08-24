import {expect} from 'chai';
import sinon from 'sinon';

import async from 'async';

import mocks from './mocks';

import PMPImage from '../lib/index';

import main from '../lib/modules/main';

describe('pmp-image', function () {
  let pmpImage;

  beforeEach(function () {
    pmpImage = new PMPImage(mocks.sourceId, mocks.options);
  });

  afterEach(function () {
    pmpImage = null;
  });

  it('should be defined', function () {
    expect(pmpImage).to.be.an('object');
  });

  describe('constructor', function () {
    it('should set all the properties', function () {
      expect(pmpImage.source).to.eql(mocks.source);
      expect(pmpImage.options).to.be.an('object');
      expect(pmpImage.options.pmpApiUrl).to.be.a('string');
      expect(pmpImage.options.folderPath).to.be.a('string');
      expect(pmpImage.options.dimensions).to.be.an('array');
      expect(pmpImage.options.request).to.be.an('object');
      expect(pmpImage.options.request.json).to.be.a('boolean');
    });
  });

  describe('save', function () {
    it('should be defined', function () {
      expect(pmpImage.save).to.be.a('function');
    });

    it('should return an error: validation', sinon.test(function (done) {
      const cb = this.spy(err => {
        expect(err).to.be.an('error');
        done();
      });

      pmpImage.save({}, cb);
    }));

    it('should return an error: async.auto', sinon.test(function (done) {
      const fakeError = new Error('fakeError');
      const asyncAuto = this.stub(async, 'auto', (args, callback) => {
        callback(fakeError);
      });
      const cb = this.spy(err => {
        sinon.assert.calledOnce(asyncAuto);
        expect(err).to.eql(fakeError);

        asyncAuto.restore();
        done();
      });

      pmpImage.save({
        url: mocks.image.url
      }, cb);
    }));

    it('should return an image', sinon.test(function (done) {
      const generateFilename = this.stub(main, 'generateFilename', (args, callback) => {
        callback(null, {
          filename: mocks.image.filename
        });
      });
      const saveAsFile = this.stub(main, 'saveAsFile', (args, callback) => {
        callback(null, {
          filePath: mocks.options.folderPath + '/' + mocks.image.filename
        });
      });
      const getFileStats = this.stub(main, 'getFileStats', (args, callback) => {
        callback(null, {
          stats: {}
        });
      });
      const generateThumbs = this.stub(main, 'generateThumbs', (args, callback) => {
        callback(null, {
          thumbs: mocks.dimensions,
          metadata: mocks.metadata
        });
      });
      const storeOnDB = this.stub(main, 'storeOnDB', (args, callback) => {
        callback(null, {
          image: mocks.image
        });
      });

      const cb = this.spy((err, res) => {
        expect(err).to.be.a('null');
        sinon.assert.calledOnce(generateFilename);
        sinon.assert.calledOnce(saveAsFile);
        sinon.assert.calledOnce(getFileStats);
        sinon.assert.calledOnce(generateThumbs);
        sinon.assert.calledOnce(storeOnDB);
        expect(res).to.be.an('object');

        generateFilename.restore();
        saveAsFile.restore();
        getFileStats.restore();
        generateThumbs.restore();
        storeOnDB.restore();
        done();
      });

      pmpImage.save({
        url: mocks.image.url
      }, cb);
    }));
  });
});
