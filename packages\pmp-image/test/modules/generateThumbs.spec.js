import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';  // eslint-disable-line no-unused-vars

import sharp from 'sharp';
import async from 'async';

import generateThumbs from '../../lib/modules/generateThumbs';

import mocks from '../mocks';

describe('generateThumbs', function () {
  it('should be defined', function () {
    expect(generateThumbs).to.be.a('function');
  });

  it('should return an error: validation', sinon.test(function (done) {
    const cb = this.spy(err => {
      expect(err).to.be.an('error');
      done();
    });

    generateThumbs({}, cb);
  }));

  it('should return an error: sharp.metadata', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const metadata = this.stub(sharp.prototype, 'metadata', (callback) => {
      callback(fakeError);
    });
    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(metadata).to.have.been.calledOnce;

      metadata.restore();
      done();
    });

    generateThumbs({
      filePath: mocks.filePath,
      destFolderPath: mocks.filePath,
      dimensions: mocks.dimensions
    }, cb);
  }));

  it('should return an error: async.eachSeries', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const metadata = this.stub(sharp.prototype, 'metadata', (callback) => {
      callback(null, mocks.metadata);
    });
    const eachSeries = this.stub(async, 'eachSeries', (list, worker, callback) => {
      callback(fakeError);
    });
    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(metadata).to.have.been.calledOnce;
      expect(eachSeries).to.have.been.calledOnce;

      metadata.restore();
      eachSeries.restore();
      done();
    });

    generateThumbs({
      filePath: mocks.filePath,
      destFolderPath: mocks.filePath,
      dimensions: mocks.dimensions
    }, cb);
  }));

  it('should return an error: sharp.toFile', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const metadata = this.stub(sharp.prototype, 'metadata', (callback) => {
      callback(null, mocks.metadata);
    });
    const resize = this.stub(sharp.prototype, 'resize', (dim) => {
      expect(dim).to.equal(mocks.dimensions[0]);
      return sharp(mocks.filePath);
    });
    const toFile = this.stub(sharp.prototype, 'toFile', (path, callback) => {
      callback(fakeError);
    });

    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(metadata).to.have.been.calledOnce;
      expect(resize).to.have.been.calledOnce;
      expect(toFile).to.have.been.calledOnce;

      metadata.restore();
      resize.restore();
      toFile.restore();

      done();
    });

    generateThumbs({
      filePath: mocks.filePath,
      destFolderPath: mocks.filePath,
      dimensions: mocks.dimensions
    }, cb);
  }));

  it('should return the metadata and dimensions', sinon.test(function (done) {
    const metadata = this.stub(sharp.prototype, 'metadata', (callback) => {
      callback(null, mocks.metadata);
    });
    const eachSeries = this.stub(async, 'eachSeries', (list, worker, callback) => {
      callback(null);
    });
    const cb = this.spy((err, res) => {
      expect(err).to.be.a('null');
      expect(metadata).to.have.been.calledOnce;
      expect(eachSeries).to.have.been.calledOnce;
      expect(res).to.eql({
        metadata: mocks.metadata,
        thumbs: mocks.dimensions
      });

      metadata.restore();
      eachSeries.restore();
      done();
    });

    generateThumbs({
      filePath: mocks.filePath,
      destFolderPath: mocks.filePath,
      dimensions: mocks.dimensions
    }, cb);
  }));
});
