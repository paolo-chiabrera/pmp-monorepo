import {expect} from 'chai';
import sinon from 'sinon';

import needle from 'needle';

import storeOnDB from '../../lib/modules/storeOnDB';

import mocks from '../mocks';

describe('storeOnDB', function () {
  it('should be defined', function () {
    expect(storeOnDB).to.be.a('function');
  });

  it('should return an error: validation', sinon.test(function (done) {
    const cb = this.spy(err => {
      expect(err).to.be.an('error');
      done();
    });

    storeOnDB({}, cb);
  }));

  it('should return an error: needle.post', sinon.test(function (done) {
    const fakeError = new Error('fakeError');
    const needlePost = this.stub(needle, 'post', (url, payload, options, callback) => {
      callback(fakeError);
    });
    const cb = this.spy(err => {
      sinon.assert.calledOnce(needlePost);
      expect(err).to.eql(fakeError);

      done();
    });

    storeOnDB({
      source: mocks.source,
      filename: mocks.filename,
      url: mocks.url,
      options: mocks.options
    }, cb);
  }));

  it('should return an error: statusCode', sinon.test(function (done) {
    const statusCode = 401;
    const statusError = new Error('wrong statusCode ' + statusCode);
    const needlePost = this.stub(needle, 'post', (url, payload, options, callback) => {
      callback(null, {
        statusCode: statusCode
      });
    });

    const cb = this.spy(err => {
      sinon.assert.calledOnce(needlePost);
      expect(err).to.eql(statusError);

      done();
    });

    storeOnDB({
      source: mocks.source,
      filename: mocks.filename,
      url: mocks.url,
      options: mocks.options
    }, cb);
  }));

  it('should return an image', sinon.test(function (done) {
    const needlePost = this.stub(needle, 'post', (url, payload, options, callback) => {
      callback(null, {
        statusCode: 200,
        body: payload
      });
    });

    const cb = this.spy((err, res) => {
      sinon.assert.calledOnce(needlePost);
      expect(err).to.be.a('null');
      expect(res).to.be.an('object');
      expect(res.image).to.be.an('object');

      done();
    });

    storeOnDB({
      source: mocks.source,
      filename: mocks.filename,
      url: mocks.url,
      options: mocks.options
    }, cb);
  }));
});
