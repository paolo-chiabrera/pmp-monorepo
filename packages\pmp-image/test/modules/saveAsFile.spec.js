import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';  // eslint-disable-line no-unused-vars

import needle from 'needle';
import fs from 'fs';

import saveAsFile from '../../lib/modules/saveAsFile';

import mocks from '../mocks';

describe('saveAsFile', function () {
  before(function () {
    sinon.config = {
      useFakeTimers: false
    };
  });

  it('should be defined', function () {
    expect(saveAsFile).to.be.a('function');
  });

  it('should return an error: validation', sinon.test(function (done) {
    const cb = this.spy(err => {
      expect(err).to.be.an('error');
      done();
    });

    saveAsFile({}, cb);
  }));

  it('should return an error: needle.get', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const get = this.stub(needle, 'get', (url, options, callback) => {
      callback(fakeError);
    });
    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(get).to.have.been.calledThrice;

      get.restore();
      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath,
      retryInterval: 1
    }, cb);
  }));

  it('should return an error: statusCode', sinon.test(function (done) {
    const statusCode = 401;
    const statusError = new Error('wrong statusCode ' + statusCode);
    const get = this.stub(needle, 'get', (url, options, callback) => {
      callback(null, {
        statusCode: statusCode,
        body: statusError
      });
    });

    const cb = this.spy(err => {
      expect(get).to.have.been.calledThrice;
      expect(err).to.eql(statusError);

      get.restore();
      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath,
      retryInterval: 1
    }, cb);
  }));

  it('should return an error: fs.unlink', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const unlink = this.stub(fs, 'unlink', (path, callback) => {
      callback(fakeError);
    });
    const get = this.stub(needle, 'get', (url, options, callback) => {
      callback(null, {
        statusCode: 200,
        bytes: 0
      });
    });
    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(get).to.have.been.calledThrice;
      expect(unlink).to.have.been.calledThrice;

      get.restore();
      unlink.restore();
      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath,
      retryInterval: 1
    }, cb);
  }));

  it('should return an error: bytes', sinon.test(function (done) {
    const bytesError = new Error('response bytes 0');
    const unlink = this.stub(fs, 'unlink', (path, callback) => {
      callback(null);
    });
    const get = this.stub(needle, 'get', (url, options, callback) => {
      callback(null, {
        statusCode: 200,
        bytes: 0
      });
    });
    const cb = this.spy(err => {
      expect(err).to.eql(bytesError);
      expect(get).to.have.been.calledThrice;
      expect(unlink).to.have.been.calledThrice;

      get.restore();
      unlink.restore();
      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath,
      retryInterval: 1
    }, cb);
  }));

  it('should return a filePath', sinon.test(function (done) {
    const get = this.stub(needle, 'get', (url, options, callback) => {
      callback(null, {
        statusCode: 200,
        bytes: 100
      });
    });
    const cb = this.spy((err, res) => {
      expect(err).to.be.a('null');
      expect(res).to.be.an('object');
      expect(res.filePath).to.be.a('string');
      expect(get).to.have.been.calledOnce;

      get.restore();
      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath,
      retryInterval: 1
    }, cb);
  }));
});
