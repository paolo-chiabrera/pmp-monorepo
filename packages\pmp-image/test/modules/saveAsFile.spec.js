import {expect} from 'chai';
import sinon from 'sinon';

import needle from 'needle';
import fs from 'fs';
import {EventEmitter} from 'events';

import saveAsFile from '../../lib/modules/saveAsFile';

import mocks from '../mocks';

describe('saveAsFile', function () {

  let createWriteStream;

  before(function () {
    sinon.config = {
      useFakeTimers: false
    };
  });

  beforeEach(function () {
    createWriteStream = sinon.stub(fs, 'createWriteStream', () => {
      return 'fakeStream';
    });
  });

  afterEach(function () {
    createWriteStream.restore();
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

  it('should return an error: event', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const needleGet = this.stub(needle, 'get', () => {
      return {
        pipe: () => {
          const emitter = new EventEmitter;

          setTimeout(function () {
            emitter.emit('error', fakeError);
          }, 10);

          return emitter;
        }
      };
    });

    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      sinon.assert.calledOnce(needleGet);
      sinon.assert.calledOnce(createWriteStream);

      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath
    }, cb);
  }));

  it('should return a filePath', sinon.test(function (done) {
    const needleGet = this.stub(needle, 'get', () => {
      return {
        pipe: (stream) => {

          expect(stream).to.equal('fakeStream');

          const emitter = new EventEmitter;

          setTimeout(function () {
            emitter.emit('close');
          }, 10);

          return emitter;
        }
      };
    });

    const cb = this.spy((err, res) => {
      expect(err).to.be.a('null');
      sinon.assert.calledOnce(needleGet);
      sinon.assert.calledOnce(createWriteStream);
      expect(res).to.be.an('object');
      expect(res.filePath).to.be.a('string');

      done();
    });

    saveAsFile({
      url: mocks.url,
      filename: mocks.filename,
      folderPath: mocks.options.folderPath
    }, cb);
  }));
});
