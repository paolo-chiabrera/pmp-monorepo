import {expect} from 'chai';
import sinon from 'sinon';

import needle from 'needle';

import mocks from './mocks';

import PmpSource from '../lib/index';

describe('pmp-source', function () {
  it('should be defined', function () {
    expect(PmpSource).to.be.an('object');
  });

  describe('getSourceById', function () {
    it('should be defined', function () {
      expect(PmpSource.getSourceById).to.be.a('function');
    });

    it('should raise a validation error', sinon.test(function (done) {
      const _args = {
        options: null,
        sourceId: null
      };

      const cb = this.spy((err) => {
        expect(err).to.be.an('error');
        done();
      });

      PmpSource.getSourceById(_args, cb);
    }));

    it('should raise an error from needle.get', sinon.test(function (done) {
      const _args = {
        options: mocks.options,
        sourceId: 'test'
      };

      const fakeError = new Error('error');

      const get = this.stub(needle, 'get', (args, options, done) => {
        done(fakeError);
      });

      const cb = this.spy((err) => {
        expect(err).to.eql(fakeError);

        get.restore();
        done();
      });

      PmpSource.getSourceById(_args, cb);
    }));

    it('should raise a statusCode error from needle.get', sinon.test(function (done) {
      const _args = {
        options: mocks.options,
        sourceId: 'test'
      };

      const statusCode = 401;

      const fakeError = new Error('wrong statusCode ' + statusCode);

      const get = this.stub(needle, 'get', (args, options, done) => {
        done(null, {
          statusCode: statusCode
        });
      });

      const cb = this.spy((err) => {
        expect(err).to.eql(fakeError);

        get.restore();
        done();
      });

      PmpSource.getSourceById(_args, cb);
    }));

    it('should raise an error: source not found', sinon.test(function (done) {
      const _args = {
        options: mocks.options,
        sourceId: 'test'
      };

      const fakeError = new Error('source not found: ' + _args.sourceId);

      const get = this.stub(needle, 'get', (args, options, done) => {
        done(null, {
          statusCode: 200,
          body: null
        });
      });

      const cb = this.spy((err) => {
        expect(err).to.eql(fakeError);

        get.restore();
        done();
      });

      PmpSource.getSourceById(_args, cb);
    }));

    it('should be a success', sinon.test(function (done) {
      const _args = {
        options: mocks.options,
        sourceId: 'test'
      };

      const get = this.stub(needle, 'get', (args, options, done) => {
        done(null, {
          statusCode: 200,
          body: _args
        });
      });

      const cb = this.spy((err, res) => {
        expect(err).to.be.a('null');
        expect(res.source).to.eql(_args);

        get.restore();
        done();
      });

      PmpSource.getSourceById(_args, cb);
    }));
  });
});
