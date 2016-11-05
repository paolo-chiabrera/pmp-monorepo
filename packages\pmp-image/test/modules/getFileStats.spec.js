import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';  // eslint-disable-line no-unused-vars

import fs from 'fs';

import getFileStats from '../../lib/modules/getFileStats';

import mocks from '../mocks';

describe('getFileStats', function () {
  it('should be defined', function () {
    expect(getFileStats).to.be.a('function');
  });

  it('should return an error: validation', sinon.test(function (done) {
    const cb = this.spy(err => {
      expect(err).to.be.an('error');
      done();
    });

    getFileStats({}, cb);
  }));

  it('should return an error: fs.stat', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const fsStat = this.stub(fs, 'stat', (path, callback) => {
      callback(fakeError);
    });
    const cb = this.spy(err => {
      expect(err).to.eql(fakeError);
      expect(fsStat).to.have.been.calledOnce;

      fsStat.restore();
      done();
    });

    getFileStats({
      filePath: mocks.filePath
    }, cb);
  }));

  it('should return the image filename', sinon.test(function (done) {
    const fsStat = this.stub(fs, 'stat', (path, callback) => {
      expect(path).to.eql(mocks.filePath);
      callback(null, {});
    });
    const cb = this.spy((err, res) => {
      expect(err).to.be.a('null');
      expect(fsStat).to.have.been.calledOnce;
      expect(res).to.eql({
        stats: {}
      });

      fsStat.restore();
      done();
    });

    getFileStats({
      filePath: mocks.filePath
    }, cb);
  }));
});
